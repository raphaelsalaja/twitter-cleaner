import { junk_accounts, junk_phrases } from "~data/junk"
import { nsfw_accounts } from "~data/nsfw"

import { hide, hide_junk } from "../utilities/anime-animations"

let quote =
    '<div tabindex="0" class="css-175oi2r r-adacv r-1udh08x r-1ets6dv r-1867qdf r-rs99b7 r-o7ynqc r-6416eg r-1ny4l3l r-1loqt21" role="link"><div class="css-175oi2r">'

export let stats = {
    likes: 0,
    retweets: 0,
    comments: 0,
    bookmarks: 0
}

export const JunkFilter = async () => {
    const observerConfig = { rootMargin: "0px", threshold: 0.1 }

    const handleIntersection = async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target)
                await processTweet(entry.target as HTMLDivElement)
            }
        }
    }

    const observeNewTweets = (observer: IntersectionObserver) => {
        const tweets = document.querySelectorAll('article div[data-testid="tweet"]')
        tweets.forEach((tweet) => observer.observe(tweet))
    }

    const handleMutations = (mutations: MutationRecord[]) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node instanceof HTMLDivElement) {
                    const tweetObserver = new IntersectionObserver(handleIntersection, observerConfig)
                    tweetObserver.observe(node)
                }
            }
        }
    }

    const processTweet = async (div: HTMLDivElement) => {
        const children = div.children

        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            const birdwatchPivot = child.querySelector('div[data-testid="birdwatch-pivot"]')
            if (birdwatchPivot) {
                hide(birdwatchPivot as HTMLDivElement)
                break
            }
        }

        // IGNORE NON TWEETS
        if (div.getAttribute("data-testid") !== "cellInnerDiv") {
            return
        }
        // IGNORE AUTHOR POST
        else if (div.innerHTML.includes("tabindex=1") || div.innerHTML.includes("Views")) {
            return
        }
        // REMOVE SELF PROMOTION
        else if (div.innerHTML.includes(quote)) {
            const spans = div.querySelectorAll("span")
            const atSpans = Array.from(spans).filter((span) => span.innerHTML.includes("@"))
            if (atSpans.length > 1) {
                hide_junk(div)
            }
        }
        // REMOVE TWEETS WITH SPECIFIC PHRASES
        else if (junk_phrases.some((phrase) => div.innerHTML.includes(phrase))) {
            hide_junk(div)
        }
        // REMOVE TWEETS WITH SPECIFIC ACCOUNTS | JUNK
        else if (junk_accounts.some((account) => div.innerHTML.includes(account))) {
            hide_junk(div)
        }
        // REMOVE TWEETS WITH SPECIFIC ACCOUNTS | NSFW
        else if (nsfw_accounts.some((account) => div.innerHTML.includes(account))) {
            hide_junk(div)
        }
    }

    const tweetObserver = new IntersectionObserver(handleIntersection, observerConfig)
    observeNewTweets(tweetObserver)

    const mutationObserver = new MutationObserver(handleMutations)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
}
