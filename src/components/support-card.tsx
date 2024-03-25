import cssText from "data-text:~style.css"
import React from "react"

import "~base.css"
import "~style.css"

import { Card, CardDescription, CardHeader, CardTitle } from "~components/card"

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

const SupportCard = () => {
    return (
        <button
            onClick={() => {
                window.open("https://twitter.com/raphaelsalaja")
                window.open("https://github.com/rafunderscore/twitter-replies-cleaner")
            }}>
            <Card className="flex items-start space-x-4 text-left transition-all hover:opacity-50">
                <CardHeader>
                    <CardDescription className="opacity-30">@raphaelsalaja</CardDescription>
                    <CardTitle>twitter-replies-cleaner</CardTitle>
                    <CardDescription className="opacity-30">
                        Gets rid of unwanted replies on Twitter. Say goodbye to onlyfans links, engagement bait, and more. If you find this useful, give it a
                        star on GitHub!
                    </CardDescription>
                </CardHeader>
            </Card>
        </button>
    )
}

export default SupportCard
