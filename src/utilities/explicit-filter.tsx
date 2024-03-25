import * as faceapi from "@vladmandic/face-api"
import * as nsfwjs from "nsfwjs"

import { hide } from "./anime-animations"

export const ExplicitFilter = async () => {
    const model = await nsfwjs.load(chrome.runtime.getURL("./models/"))

    const observerConfig = { rootMargin: "0px", threshold: 0.1 }

    const handleIntersection = async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target)
                await processImage(entry.target as HTMLImageElement)
            }
        }
    }

    const observeNewImages = (observer: IntersectionObserver) => {
        const tweetPhotos = document.querySelectorAll('div[data-testid="tweetPhoto"] img')
        tweetPhotos.forEach((img) => observer.observe(img))
    }

    const handleMutations = (mutations: MutationRecord[]) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node instanceof HTMLImageElement) {
                    const imageObserver = new IntersectionObserver(handleIntersection, observerConfig)
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
                    hide(article)
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

            let porn = predictions.find((p) => p.className === "Porn")
            let sexy = predictions.find((p) => p.className === "Sexy")
            let hentai = predictions.find((p) => p.className === "Hentai")
            let drawing = predictions.find((p) => p.className === "Drawing")
            let neutral = predictions.find((p) => p.className === "Neutral")

            let nsfw = porn.probability + sexy.probability + hentai.probability
            let sfw = drawing.probability + neutral.probability

            console.log("NSFW:", nsfw)
            console.log("SFW:", sfw)

            return nsfw > sfw
        } catch (error) {
            console.error("Error classifying image:", error)
            return false
        }
    }

    const imageObserver = new IntersectionObserver(handleIntersection, observerConfig)
    observeNewImages(imageObserver)

    const mutationObserver = new MutationObserver(handleMutations)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
}
