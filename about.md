---
title: About
layout: layout.njk
---

# About this site

This is a small, personal **Taylor Swift songs collection** built with **Eleventy**. 
It’s a simple archive where I add song notes over time and keep everything consistent with templates.

[← Back to Home](/)

---

## How to browse
- The **Home** page shows cards for every post. Use the **search box** and the **filters** at the top.
- Filter logic: **OR** inside a group (e.g. mood), **AND** across groups (e.g. mood + era).
- Click a card to open the post. Each post page has **Prev / Next** and a **Copy Link** button.

## What’s inside each post
Each post is a Markdown file with a small data block (front matter). The main fields are:
- `title`, `date`
- `cover`, `thumb` (images)
- `era`, `album`, `mood`, `themes`
- `tags` (used by filters)

### Allowed categories
- **mood**: `energetic`, `calm`, `dark`, `other`
- **theme**: `love`, `breakup`, `self`, `memory`, `escape`, `other`

> In `tags`, I use prefixed values so filters work, for example: 
`type:song`, `era:folklore`, `album:1989`, `mood:calm`, `theme:love`.

## Add a new song (quick template)
Copy this into a new file in `posts/` and edit the values:

```md
---
title: "Song Title"
date: 2025-10-01
type: song
album: 1989
era: 1989
mood: calm # energetic | calm | dark | other
themes: [love] # choose from: love | breakup | self | memory | escape | other
cover: /assets/images/1989.svg
thumb: /assets/images/1989.svg
tags: [type:song, era:1989, album:1989, mood:calm, theme:love]
layout: post.njk
---

A short note about why I like this track and when I listen to it.
```

## Tech & design
- Built with **Eleventy (11ty)**, **Nunjucks** templates, and **CSS**.
- Global data is in `_data/site.json`.
- Static files are in `assets/` and `styles/`.

## Credits & disclaimer
This is a **fan/education project**. No audio or lyrics are hosted here. Images are simple placeholders for study use.

If you have feedback, talk to me in class or message me on Canvas. 😊