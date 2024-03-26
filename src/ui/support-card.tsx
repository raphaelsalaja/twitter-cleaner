import { useEffect, useState } from "react"

import { Statistics } from "~classes/statistics"
import { Card, CardDescription, CardHeader, CardTitle } from "~components/card"
import { statistics } from "~content"
import { junk, nsfw } from "~utilities/anime-animations"

export const SupportCard = () => {
    const [trashedPosts, setTrashedPosts] = useState(statistics)
    const [percentage, setPercentage] = useState(0)

    const handleClick = () => {
        window.open("https://twitter.com/raphaelsalaja")
        window.open("https://github.com/rafunderscore/twitter-replies-cleaner")
    }

    useEffect(() => {
        const updateTrashedPosts = () => {
            setTrashedPosts(new Statistics(statistics.likes, statistics.retweets, statistics.comments, statistics.bookmarks, nsfw, junk))
        }
        const updatePercentage = () => {
            setPercentage(((nsfw + junk) / (statistics.comments + statistics.retweets + statistics.likes + statistics.bookmarks)) * 100)
        }
        const counterChangeHandler = () => {
            updateTrashedPosts()
            updatePercentage()
        }
        document.addEventListener("counterValueChanged", counterChangeHandler)

        return () => {
            document.removeEventListener("counterValueChanged", counterChangeHandler)
        }
    }, [])

    return (
        <button onClick={handleClick}>
            <Card className="flex items-start space-x-4 text-left transition-all hover:opacity-50">
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center space-x-1">
                            <span className="italic">twitter-cleaner</span>
                        </div>
                    </CardTitle>
                    <CardDescription className="opacity-30">
                        Gets rid of unwanted replies on Twitter. Say goodbye to onlyfans links, engagement bait, and more. If you find this useful, give it a
                        star on GitHub!
                    </CardDescription>
                    <div className="border-t border-gray-200 my-4" />
                    <CardDescription className="opacity-30">
                        <div className="columns-2">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                <span>{trashedPosts.nsfw} NSFW</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                <span>{trashedPosts.junk} Junk</span>
                            </div>
                        </div>
                    </CardDescription>
                </CardHeader>
            </Card>
        </button>
    )
}
