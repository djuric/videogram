<h1 align="center"><img src="https://videogram.zarko.dev/wp-content/uploads/2020/01/favicon.png" alt="Videogram" width="28" /> Videogram</h1>

<p align="center">
  <a href="https://github.com/djuric/videogram/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Released under the MIT license" />
  </a>
  <a href="https://app.netlify.com/sites/videogram/deploys">
    <img src="https://api.netlify.com/api/v1/badges/5b2e13ea-2f0c-44f8-bea4-82e8afaacf3a/deploy-status" alt="Netlify deploy status" />
  </a>
</p>

## Overview

Videogram is a static website for serving video content. It's built with Gatsby as a SSG and WordPress as a CMS. Structure of the website is currently quite simple. There is a video page for each video, video categories for easy navigation, homepage which is showing latest videos with featured video hero (optional) and quick search in header.

## Server side setup

To store and manage content you will need a WordPress installation. Local installation is fine for development but a public install is recommended for production. Reason for this is quick search which is currently made for live querying GraphQL API.

After WordPress is installed, following steps are required to complete the setup:

- Permalinks should be set to Post name
- Install and activate [WPGraphQL](https://github.com/wp-graphql/wp-graphql) to enable GraphQL API
- Install and activate [Videogram WP](https://github.com/djuric/videogram-plugin) for managing video content

Optional steps:

- Install [Video Importer](https://wordpress.org/plugins/meks-video-importer/) to quickly import videos in bulk from YouTube and Vimeo
- Create video categories and manually add new videos
- Create navigation menu and assign it to "Videogram Header Primary" display location. It's your responsibility to make sure you only put links to pages that are actually generated by Gatsby
- Choose a video to be featured that will be shown on homepage hero

## Development setup

Clone this repo:

```
git clone https://github.com/djuric/videogram
cd videogram
```

Install dependencies:

```
npm install
```

Create `.env.development` and `.env.production` files with each having its own environment variables. Development variables can be different from production if you are going to have two different WordPress installations:

```
GATSBY_WORDPRESS_URL=https://your-wp-site-url.com
GATSBY_WORDPRESS_GRAPHQL=https://your-wp-site-url.com/graphql
```

Start development server:

```
gatsby develop
```

## Proof of concept

Following techniques are used in the project:

- Programmatically create pages for videos and categories
- Cursor pagination for category pages using recursive calls to GraphQL API
- Feeding remote images from WordPress into Gatsby
- Apollo client to query WPGraphQL server for live search
- React Helmet for SEO ready pages

## Deploy

Netlify makes it easy to build and deploy websites. To deploy the project you should have `gatsby build` as a build command and `public/` as publish directory.

In Advanced build settings you can define following environment variables to deploy from your own WordPress installation:

| Key                      | Value                                  |
| ------------------------ | -------------------------------------- |
| GATSBY_WORDPRESS_URL     | `https://your-wp-site-url.com`         |
| GATSBY_WORDPRESS_GRAPHQL | `https://your-wp-site-url.com/graphql` |

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/djuric/videogram)

## Acknowledgments

- [Gatsby](https://github.com/gatsbyjs/gatsby) for being an awesome static site generator
- [Jason Bahl](https://twitter.com/jasonbahl) for creating fantastic [WPGraphQL](https://github.com/wp-graphql/wp-graphql) plugin
- [Henrik Wirth](https://github.com/henrikwirth) for suggestion regarding import of [WordPress images into Gatsby](https://dev.to/nevernull/gatsby-with-wpgraphql-acf-and-gatbsy-image-72m)
- [Apollo client](https://github.com/apollographql) as an excellent GraphQL client library
