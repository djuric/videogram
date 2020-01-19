import React from "react"
import Layout from "../components/layout"
import Hero from "../components/videos/hero"
import VideosLatest from "../components/videos/latest"
import SEO from "../components/SEO"

export default () => (
  <Layout>
    <SEO />
    <Hero />
    <VideosLatest />
  </Layout>
)
