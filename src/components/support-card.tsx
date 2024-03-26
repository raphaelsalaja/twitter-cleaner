import cssText from "data-text:~style.css"
import React from "react"

import "~base.css"
import "~style.css"

import { TwitterLogoIcon } from "@radix-ui/react-icons"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~components/card"

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

const SupportCard = () => {
    return (
        <div className="r-x572qd r-14lw9ot r-1peqgm7 r-x572qd">
            <button
                onClick={() => {
                    window.open("https://twitter.com/raphaelsalaja")
                    window.open("https://github.com/rafunderscore/twitter-replies-cleaner")
                }}>
                <Card className="flex items-start space-x-4 text-left transition-all hover:opacity-50 r-x572qd">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center space-x-1">
                                <span className="italic">twitter-cleaner</span>
                            </div>
                        </CardTitle>
                        <CardDescription className="opacity-30">
                            Gets rid of unwanted replies on Twitter. Say goodbye to onlyfans links, engagement bait, and more. If you find this useful, give it
                            a star on GitHub!
                        </CardDescription>
                        <div className="border-t border-gray-200 my-4" />
                        <CardDescription className="opacity-30">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <TwitterLogoIcon className="w-4 h-4" />
                                    <span>raphaelsalaja</span>
                                </div>
                            </div>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </button>
        </div>
    )
}

export default SupportCard
