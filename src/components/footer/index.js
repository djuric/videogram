import React from "react"
import { say } from "cowsay-browser"

console.log(
  say({
    text:
      "Hey, howdy, hi! If you find any problems with the website let me know https://github.com/djuric/videogram-gatsby",
  })
)

export default () => (
  <div className="footer bg-primary text-white text-right py-2">
    <div className="container">
      <span>Copyright &copy; 2019</span>
    </div>
  </div>
)
