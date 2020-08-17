---
layout: post
title: "Android App Translations"
excerpt: "How I got my app translated for free."
image: "images/andre-benz-256762.webp"
imageattribution: "Andre Benz"
imageattributionlink: https://unsplash.com/@trapnation
tags:
  - project
  - android
  - blog
---

## Preface

At the time of writing I have 3 Android Apps available on the [Play Store][0] and [F-Droid][1]. 
These apps are all [MIT licensed][2] and available at my [GitHub][3]. 
The apps were originally for my own use, but out of interest in the platform, I release it for anyone to use. 

Since then, each app has had a surprising amount of installs across a range of countries. 

<figure>
  <img src="/images/app-install-map.webp">
  <figcaption>Install locations for <a href="https://play.google.com/store/apps/details?id=link.standen.michael.phonesaver" title="Phone Saver">Phone Saver</a>.</figcaption>
</figure>

Thinking about marketing (even though all of these applications are available for free through F-Droid), I decided to have a look into translations. 
I don't know any other languages でも日本語が少し分かります so the only option (machine translations are still terrible) was to request someone else to do the translations. 


## Requesting

### Luck

The first translation I received happened through GitHub completely organically. 
To this day, I'll not know what possessed someone to submit a pull request with a Lithuanian translation. 

> Sometimes, you just get lucky. 

### GitHub Labels

About the time I was considering adding translations, a new website appeared on [Hacker News][4] that was promoting a new website to help beginners with Git. 
This was the perfect opportunity to help those looking to give back to the open source community by providing some of their skills for free. 

The website is [https://open-source.now.sh/][5]. 
The site scanned issues in GitHub for `first-timers-only` labels and adds them to the site. 
While the site was trending on Hacker News I got a huge number of pull requests, since then I've still had some trickle through so would recommend adding the label. 

Here's the [GitHub ticket][6].

At the time of writing, the app supports 13 different languages. 
And it didn't cost a cent. 

The problem associated with this, is that the contributors are beginners. 
As such, quality is questionable and conventions need to be spoon feed. 
This problem was actually a feature for me because it forced me to see the process from another angle. 
And training the next generation of contributors is something I'm more than happy to do. 


## Maintenance

This is a lot trickier. 

**Most** translators, have not responded to requests to update the translations. 
A few have even **dissappeared from GitHub** entirely! 
Even when the update requests are just to add their own name into the credits of the app. 

Since I have no fall back plan, this means some translations are now incomplete. 

My take away from this has been the following:

> Only request translations when you no longer expect updates

Or, get someone *internal* to the project to do the translations. 
I'm hardly a dev shop on my own, so this wasn't something I considered. 

## Non Free Solutions

### fivrr

[fivrr][7] is another solution. 
Submit a request for an app translation and it only costs $5. 

Simple and easy. 
You can submit multiple job requests to filter out machine translators. 

### Machinical Turk

[Mechanical Turk][8] is similar to fivrr with a few differences. 

* You have the ability to set your own pricing, which can be considerably lower. 
* Quality of responders is generally lower. 

I wouldn't really consider this a good solution given the poor quality I've seen come out of this service. 

## Take Away

If I were to do this again for another free project, I'd wait until the project is *finished* and then do it exactly the same way. 

For a professional project, I'd stick a request on [fivrr][7]. 

[0]: https://play.google.com/store/apps/developer?id=Michael%20Standen
[1]: https://f-droid.org/packages/
[2]: https://tldrlegal.com/license/mit-license
[3]: https://github.com/ScreamingHawk
[4]: https://news.ycombinator.com/
[5]: https://open-source.now.sh/
[6]: https://github.com/ScreamingHawk/android-slideshow/issues/26
[7]: https://www.fiverr.com/
[8]: https://www.mturk.com/mturk/welcome