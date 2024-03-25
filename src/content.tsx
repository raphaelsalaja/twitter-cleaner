import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoMountShadowHost } from "plasmo"

import SupportCard from "~components/support-card"

import "~base.css"

import { ExplicitFilter } from "~utilities/explicit-filter"
import { waitFor } from "~utilities/wait-for"

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

export const getShadowHostId = () => "plasmo-inline-example-unique-id"

export const config: PlasmoCSConfig = {
    all_frames: true,
    matches: ["https://twitter.com/*"]
}

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

    if (!window.location.pathname.includes("/status")) {
        return
    }

    anchor?.element.parentElement?.insertBefore(shadowHost, anchor.element.parentElement?.children[3])
}

export type PlasmoCSUIAnchor = {
    type: "inline"
}

const PlasmoInline = () => {
    return <SupportCard />
}

ExplicitFilter()

export default PlasmoInline
