export default function YouTubePlayer() {
    return (
        <div className="p-4 w-full">
            <iframe
                className="rounded-lg w-full aspect-video"
                src="https://www.youtube-nocookie.com/embed/https://youtube.com/playlist?list=PL1XhtN2kr2HJD_isybU8K5TsiZSnWNy7a&si=UOKqlS1dqLiNGJm9?autoplay=1&loop=1&rel=0&fs=0&controls=0&disablekb=1&playlist=vcw-dq4O6YY"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    )
}
