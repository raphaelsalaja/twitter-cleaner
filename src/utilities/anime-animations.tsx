import anime from "animejs/lib/anime.es.js"

export let nsfw = 0
export let junk = 0

export const hide = (element: HTMLElement) => {
    if (window.location.href.includes("status")) {
        anime({
            targets: element,
            opacity: 0,
            height: 0,
            scale: 0,
            duration: 250,
            easing: "easeInOutExpo",
            update: function (anim) {
                element.style.filter = "blur(" + (anim.progress / 100) * 100 + "px)"
            }
        })
    }
}

export const hide_nsfw = (element: HTMLElement) => {
    if (window.location.href.includes("status")) {
        anime({
            targets: element,
            opacity: 0,
            height: 0,
            scale: 0,
            duration: 250,
            easing: "easeInOutExpo",
            update: function (anim) {
                element.style.filter = "blur(" + (anim.progress / 100) * 100 + "px)"
            },
            complete: () => {
                nsfw++
                document.dispatchEvent(new Event("counterValueChanged"))
            }
        })
    }
}

export const hide_junk = (element: HTMLElement) => {
    if (window.location.href.includes("status")) {
        anime({
            targets: element,
            opacity: 0,
            height: 0,
            scale: 0,
            duration: 250,
            easing: "easeInOutExpo",
            update: function (anim) {
                element.style.filter = "blur(" + (anim.progress / 100) * 100 + "px)"
            },
            complete: () => {
                junk++
                document.dispatchEvent(new Event("counterValueChanged"))
            }
        })
    }
}
