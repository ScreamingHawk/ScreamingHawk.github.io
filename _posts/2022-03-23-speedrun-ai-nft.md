---
layout: post
title: "Speedrun AI NFT"
excerpt: "How I created and sold out an NFT project from Zero in 20 hours"
image: "images/porcelain.png"
imageattribution: "AI via Michael Standen"
imageattributionlink: https://michael.standen.link
tags:
  - crypto
  - project
---

# Speedrun AI

<figure>
  <img src="/images/speedrun_idea.jpg">
  <figcaption>It all started with an idea.</figcaption>
</figure>

As a developer familiar with AI and NFTs I was curious how long it would take me to create an NFT project and sell out from absolutely zero.

Here's a documentation of my journey.

## Start the Clock

I created a channel in a non-crypto related Discord server that I frequent to serve as my dairy.
In here I would record updates, thoughts and progress.

When recording time I was recording my real world actual time spent, not the wall time.
I knew I was going to run an AI to generate art, I would be away from the computer for a lot of the time while it did all the hard work.

## Word Collection

Knowing that there is a large set of AI image generation tools that rely on inputs I decided to enlist some help from my friends.

I created another channel in the Discord for them to post words. The channel was called *#word-collection*.
I gave a brief summary of the purpose and then openned it up for people to submit words that are meaningful to them.

It went about as well as you can imagine.

<figure>
  <img src="/images/speedrun_first.jpg">
  <figcaption>First words.</figcaption>
</figure>

I left the chat to see what would happen.

## Research

There are hundreds of AI image generators online.
[Art Flow](https://www.artflow.ai/) was one that was quite promising.
I tested out a couple but quickly decided the quality was not that good and the time taken to produce an image was too slow.

I did a quick cost analysis.
0.2 ETH for contract deployment.
IPFS price is trivial.
So is website domain.
Heroku free tier would work for hosting the front end.

I decided on a stealth launch and free mint because I knew that would sell out quickly.
I estimated that at a 5% royalty on secondary sales, I would be able to make back the initial investment in no time.

**Total time spent so far: 30 mins**

## Contract Development

I've played with NFT contracts before so a lot of this was copy/paste from other projects.
I added in a *Series* feature, planning that if this launch was successful I could further enhance the collection by releasing additional Series of content.

*That never happened.*

Not a lot else to say here.
Including unit tests and deployment to Rinkeby, I spent about **1 hour** at this point.

## Image Generation

I stumbled across [Text2Art](https://github.com/mfrashad/text2art), an open source (MIT licensed) text to image tool that I could download and run locally.
I set it up to run for 100 iterations and then went to sleep.

When I woke up, it didn't stop. 9.5 hours of generating later and I get the first image I would include in the collection. The "Smooth Shark".

<figure>
  <img src="/images/speedrun_shark.png">
  <figcaption>Smooth Shark.</figcaption>
</figure>

*You can now find the [shark on Opensea](https://opensea.io/assets/0x90e55d9fb927af203e90d8b4b5c0557c77614b31/97)*.
It is one of my favourites.

The generator also output a video of the generation process, which I have included in the NFT.

After testing a couple more prompts like *Orange* and *Perspicacity*, I figured this was the best way to go for images.

<figure>
  <img src="/images/speedrun_orange.png">
  <figcaption>Orange.</figcaption>
</figure>

I spent a long time playing with the image generator, altering the code to collect only the correctly spelt nouns from the Discord channel.

*I have now opened the [generator repository](https://github.com/ScreamingHawk/speedrun-generator) for anyone to use. Please respect the associated licenses.*

## Metadata

I uploaded some of the metadata to IPFS to make sure it worked in Opensea.

One thing I learnt here was that Opensea support markdown in the description. With this I was able to create links to both the video and the images in the descriptions. It's really nice.

Not much else to say here. I did some updates to the contract as well to support a "placeholder" URL before reveal.

**Total time spent up to this point: 8 hours**

## Website Domain

My first real spend on the project was a $20USD domain. `http://speedrunai.nft`
I bought this from Unstoppable Domains.
What I didn't realise is that the `.nft` TLD isn't supported in all browsers. Only Opera...

So I bought another from Namecheap.

[https://speedrunai.art](https://speedrunai.art)

This is in use today.

## Refining the Word List

Coming back to the images and word list, certain words like *dust* and *erosion* didn't work to create interesting images. They are too abstract of plain. Also some prompts just plain sucked. Lol

<figure>
  <img src="/images/speedrun_shorts.png">
  <figcaption>Why shorts...</figcaption>
</figure>

In the end I discarded over 90% of the submitted words. Sorry guys.

I also spent a bit of time here chatting about the project. Including telling other mods to shush in the diary channel.

<figure>
  <img src="/images/speedrun_quiet.png">
  <figcaption>Quiet you.</figcaption>
</figure>

## Marketing

After another sleep I had a bunch of images and decided to use some for marketing purposes.

A logo and some sample images.

<figure>
  <img src="/images/speedrun_logo.png">
  <figcaption>Speedrun AI Logo.</figcaption>
</figure>

<figure>
  <img src="/images/speedrun_promo.png">
  <figcaption>Speedrun AI promo image.</figcaption>
</figure>

*In hindsight, this should have been a larger focus of mine. The project was ultimately doomed because I didn't do any marketing beyond this and shilling a bit on launch day.*

**Time spent so far: 9 hours**

I've now spent as long in actual time as it took for the shark to generate.

## Ramping Up

At this point I'm pretty much done with items that need to be done manually. I didn't want to wait for literally weeks for the image generation to run on my PC.

I rented a server from AWS that had a massive GPU and CUDA support. This reduced the generation time from hours to minutes.

<figure>
  <img src="/images/speedrun_vampire.png">
  <figcaption>Vampire generated in 20 minutes.</figcaption>
</figure>

**Total spend on server: $37USD**

## Giveaways

I didn't want to do any giveaways, but I did want to say thank you to everyone who submitted word prompts.
Everyone who submitted was able to drop their ETH address and get a free NFT sent to them.

As the word collection was from a non-crypto server, this was a new experience for a lot of people, and a novelty more than actually valuable.

## Launch

I set up the Discord. **~1 hour**

Created the website. **~1 hour**

Deployed the contract. **~1 hour**. Twice (FML).

Switch on the sale for Series 1 and shilled in the shill channels of a few servers.

The collection was sold out in **under 10 minutes**.

**Total time spent: ~20 hours**

**Total cost: ~0.45 ETH**

## Post Launch

Immediately after sell out there was a few sales on secondary, but then everything ground to a halt.

I tried my best to engage in the Discord but there was not a lot of engagement.
People liked the art, but that's all there was to it.

I offered 50% of all royalties and future collection sales to anyone who would come on as a marketing partner, but had no bites.

**The project died without making back the initial investment.**

## Closing

I am sorry to everyone who bought in to the project expecting a profit.
That was never what this was about to me and I didn't communicate that well.

I have learnt so much since releasing this collection.
These learnings will be carried into other projects that I work on.
In fact, I already have.

You can still find the entire [collection available on Opensea](https://opensea.io/collection/speedrunai).
Enjoy!
