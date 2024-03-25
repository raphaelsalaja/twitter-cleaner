import anime from "animejs/lib/anime.es.js"

export const hide = (element: HTMLElement) => {
    anime({
        targets: element,
        opacity: 0,
        height: 0,
        scale: 0,
        duration: 250,
        translateY: 100,
        easing: "easeInOutExpo",
        update: function (anim) {
            element.style.filter = "blur(" + (anim.progress / 100) * 100 + "px)"
        },
        complete: function () {
            element.remove()
        }
    })
}
