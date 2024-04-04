import { hide } from "~utilities/anime-animations"

let quote =
    '<div tabindex="0" class="css-175oi2r r-adacv r-1udh08x r-1ets6dv r-1867qdf r-rs99b7 r-o7ynqc r-6416eg r-1ny4l3l r-1loqt21" role="link"><div class="css-175oi2r">'

export let stats = {
    likes: 0,
    retweets: 0,
    comments: 0,
    bookmarks: 0
}

export const DopamineFilter = async () => {
    const observerConfig = { rootMargin: "0px", threshold: 0.1 }

    const handleIntersection = async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target)
                await processTimeline(entry.target as HTMLDivElement)
            }
        }
    }

    const observeNewTweets = (observer: IntersectionObserver) => {
        const timeline = document.querySelectorAll('div[aria-label="Timeline: Trending now"]')
        timeline.forEach((tweet) => observer.observe(tweet))
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

    const processTimeline = async (div: HTMLDivElement) => {
        const children = div.children
        // hide all the elements in the timeline
        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            hide(child as HTMLDivElement)
        }
    }

    const tweetObserver = new IntersectionObserver(handleIntersection, observerConfig)
    observeNewTweets(tweetObserver)

    const mutationObserver = new MutationObserver(handleMutations)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
}
