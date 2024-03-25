import * as faceapi from "@vladmandic/face-api"
import anime from "animejs/lib/anime.es.js"
import cssText from "data-text:~style.css"
import * as nsfwjs from "nsfwjs"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"

import "~base.css"

import SupportCard from "~components/support-card"
import { waitFor } from "~utils/waitFor"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*/status/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  await waitFor(
    () =>
      document.querySelector('[data-testid="tweet"]') &&
      document.querySelector('[aria-label="Footer"]'),
    {
      count: 10,
      delay: 200
    }
  )

  return (
    document.querySelector('[aria-label="Timeline: Trending now"]')
      ?.parentElement || document.body
  )
}

export const onInit = async () => {
  const model = await nsfwjs.load(chrome.runtime.getURL("./models/"))
  const observerConfig = {
    rootMargin: "0px",
    threshold: 0.1
  }

  const handleIntersection = async (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
        await processImage(entry.target as HTMLImageElement) // Cast entry.target to HTMLImageElement
      }
    }
  }

  const observeNewImages = (observer: IntersectionObserver) => {
    const tweetPhotos = document.querySelectorAll(
      'div[data-testid="tweetPhoto"] img'
    )
    tweetPhotos.forEach((img) => observer.observe(img))
  }

  const handleMutations = (mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLImageElement) {
          const imageObserver = new IntersectionObserver(
            handleIntersection,
            observerConfig
          )
          imageObserver.observe(node)
        }
      }
    }
  }

  const processImage = async (img: HTMLImageElement) => {
    if (img.src.includes("profile_images")) {
      return
    }

    try {
      const targetDetected = await isTarget(img.src)
      if (targetDetected) {
        const article = img.closest("article")
        if (article) {
          fadeOutAndRemove(article)
        } else {
          console.warn("Parent article not found for the image:", img)
        }
      }
    } catch (error) {
      console.error("Error processing image:", error)
    }
  }

  const isTarget = async (src: string) => {
    try {
      const img = await faceapi.fetchImage(src)
      const predictions = await model.classify(img)
      return (
        predictions[0].className !== "Neutral" &&
        predictions[0].className !== "Drawing"
      )
    } catch (error) {
      console.error("Error classifying image:", error)
      return false
    }
  }

  const fadeOutAndRemove = (element: HTMLElement) => {
    anime({
      targets: element,
      opacity: 0,
      height: 0,
      duration: 350,
      easing: "easeOutExpo",
      update: function (anim) {
        element.style.filter = "blur(" + (anim.progress / 100) * 10 + "px)"
      },
      complete: () => {
        element.remove()
      }
    })
  }

  const imageObserver = new IntersectionObserver(
    handleIntersection,
    observerConfig
  )
  observeNewImages(imageObserver)

  const mutationObserver = new MutationObserver(handleMutations)
  mutationObserver.observe(document.body, { childList: true, subtree: true })
}

const PlasmoOverlay = () => {
  return <SupportCard />
}

export default PlasmoOverlay
