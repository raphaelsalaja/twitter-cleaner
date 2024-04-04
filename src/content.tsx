import cssText from "data-text:~styles/style.css"
import type { PlasmoGetInlineAnchor, PlasmoMountShadowHost } from "plasmo"

import { Statistics } from "~classes/statistics"
import { ExplicitFilter } from "~filters/explicit-filter"
import { JunkFilter } from "~filters/junk-filter"
import { waitFor } from "~utilities/wait-for"

import "~styles/base.css"

import YouTubePlayer from "~ui/tik-tok-card"

export let statistics = new Statistics(0, 0, 0, 0, 0, 0)

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

export const getShadowHostId = () => "plasmo-inline-example-unique-id"

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
    await waitFor(() => document.querySelector('[data-testid="tweet"]') && document.querySelector('[aria-label="Footer"]'), {
        count: 10,
        delay: 200
    })
    return document.querySelector('[aria-label="Timeline: Trending now"]')?.parentElement || document.body
}

export const mountShadowHost: PlasmoMountShadowHost = ({ shadowHost, anchor }) => {
    if (anchor?.element === document.body) {
        return
    }

    anchor?.element.parentElement?.insertBefore(shadowHost, anchor.element.parentElement?.children[0])
}

export type PlasmoCSUIAnchor = {
    type: "inline"
}

const PlasmoInline = () => {
    return <YouTubePlayer />
}

export const GetStats = async () => {
    await new Promise((resolve) => {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    const replies = Array.from(document.querySelectorAll('div[aria-label*="replies"]'))
                    if (replies.length) {
                        observer.disconnect()
                        resolve(Statistics.parse(replies[0].getAttribute("aria-label") || ""))
                        statistics = Statistics.parse(replies[0].getAttribute("aria-label") || "")
                    }
                }
            }
        })
        observer.observe(document.body, { childList: true, subtree: true })
    })
}

export const ReplaceTrends = async () => {
    await new Promise((resolve) => {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    document.querySelector('div[aria-label="Timeline: Trending now"]').replaceChildren()
                }
            }
        })
        observer.observe(document.body, { childList: true, subtree: true })
    })
}

ReplaceTrends()
ExplicitFilter()
JunkFilter()
GetStats()

export default PlasmoInline
