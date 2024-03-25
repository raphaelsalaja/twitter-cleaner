import cssText from "data-text:~style.css"
import React from "react"

import "~base.css"
import "~style.css"

import { Card, CardHeader } from "~components/card"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const SupportCard = () => {
  return (
    <button
      className="flex items-start space-x-4 text-left"
      onClick={() => {
        window.open("https://twitter.com/raphaelsalaja")
        window.open("https://github.com/rafunderscore/twitter-junk-remover")
      }}>
      <Card className="transition-all">
        <CardHeader>
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">twitter-replies-cleaner</h4>
              <p className="text-sm">
                Gets rid of unwanted replies on Twitter. Say goodbye to onlyfans
                links, engagement bait, and more. If you find this useful, give
                it a star on GitHub!
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </button>
  )
}

export default SupportCard
