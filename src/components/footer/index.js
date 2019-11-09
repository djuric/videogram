import React from "react"
import { say } from "cowsay-browser"

console.log(
  say({
    text:
      "Hey, howdy, hi! If you find any problem with the website let me know https://github.com/djuric/videogram-gatsby",
  })
)

export default () => (
  <div className="footer">
    <p>Copyright 2019</p>
  </div>
)
