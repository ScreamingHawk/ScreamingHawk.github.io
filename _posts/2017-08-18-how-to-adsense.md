---
layout: post
title: "How to Google AdSense"
excerpt: "Walkthrough for adding AdSense ads to a website."
image: "images/mike-petrucci-131817.jpg"
imageattribution: "Mike Petrucci"
imageattributionlink: https://unsplash.com/@mikepetrucci
tags:
  - guide
---

## About Google Ads

Putting ads on your website is a quick (but typically poor) way to monetize it.

It doesn't cost users many money, doesn't require additional user steps, and users can opt out by installing an ad blocker such as [uBlock Origin][0].
(Some people may not agree with my use of *opt out* here, but that's my opinion on another discussion)

Google AdSense is a popular provider for Ads, and my choice.

### Prerequisite

Create a Google AdSense account

#### [https://www.google.com/adsense/](https://www.google.com/adsense/)

You can link your existing Google account if you have one.

**Disable your ad blocker**

### Link your Site

1. Click `My Sites`
2. Click the `+` button on the top right
3. Enter your website URL
4. Click `Add Site`

At this point you may be requried to prove you own the website.
This is usually done by adding a page provided by google to ensure you can load content to the site. How tou do this will depend on your hosting solution.

### Create an Ad Unit

1. Click `My ads` on the left panel
2. Select the type of ad you would like displayed

<figure>
  <img src="/images/google-options.png">
  <figcaption>Variety of Google Ad options.</figcaption>
</figure>

3. Fill in the details:
  * Name - I use the name of the website
  * Size - recommend `Responsive`
  * Type - recommend `Text & Display`
  * Style - select a style that fits your website
4. Click `Save & Get Code`
5. Copy and paste the code provided into your website HTML where you would like the ad to appear

**That's it!**

### Additional Note

Make sure the `ins` block you add to your HTML has an associated width. It's also good practice to define a `max-width` and `max-height` when using the `responsive` ad block, to ensure the ad doesn't cover the whole page, unless that's what you want.

[0]: https://github.com/gorhill/uBlock
