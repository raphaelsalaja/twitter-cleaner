export class Statistics {
    likes: number
    retweets: number
    comments: number
    bookmarks: number
    nsfw: number
    junk: number

    constructor(likes: number, retweets: number, comments: number, bookmarks: number, nsfw: number, junk: number) {
        this.likes = likes
        this.retweets = retweets
        this.comments = comments
        this.bookmarks = bookmarks
        this.nsfw = nsfw
        this.junk = junk
    }

    static parse(text: string): Statistics {
        const [comments, retweets, likes, bookmarks] = text.split(", ").map((s) => parseInt(s.match(/\d+/)[0]))
        return new Statistics(likes, retweets, comments, bookmarks, 0, 0)
    }
}
