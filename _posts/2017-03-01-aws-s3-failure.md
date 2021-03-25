---
layout: post
title: "AWS S3 Failure"
excerpt: "Why not to put all your eggs in one bucket."
image: "images/lukas-budimaier-131299.webp"
imageattribution: "Lukas Budimaier"
imageattributionlink: https://unsplash.com/@lukasbudimaier
tags:
  - service
  - blog
  - rant
---

# AWS S3 is down!

You might have noticed that the internet was struggling today. This was due to a problem with Amazon's Simple Storage Service (S3).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">When Amazon S3 is down. <a href="https://twitter.com/hashtag/awscloud?src=hash">#awscloud</a> <a href="https://twitter.com/hashtag/awss3?src=hash">#awss3</a> <a href="https://t.co/KQo4sVvkAl">pic.twitter.com/KQo4sVvkAl</a></p>&mdash; Fernando (@fmc_sea) <a href="https://twitter.com/fmc_sea/status/836643409775497218">February 28, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The above is pretty much the use case for the majority of those using S3 as a backend.
S3 offers durable, available, automatically scalable storage for minimal cost.

It's a great service I rave about in most posts on this blog.

## S3 Availability

The key point of note here is availability.

S3 guarantees 99.99% availability of all objects stored in S3, regardless of the storage type (Standard, Reduced Redundancy etc).

This translates to a downtime of just less than 53 minutes per year.

`0.01% of 1 year = 52.59 minutes`

According to [Tarsnap](http://www.tarsnap.com/) the actual downtime was roughly 3 hours and 20 minutes (when looking at GETs).

The break down was as follows:

```
    17:37:29 UTC: First InternalError response from S3
    17:37:32 UTC: Last successful request
    17:37:56 UTC: S3 switches from 100% InternalError responses to 503 responses
    19:37 UTC: AWS notified of 'high error rates'
    20:34:36 UTC: S3 switches from 503 responses back to InternalError responses
    20:35:50 UTC: First successful request
    20:54: AWS notified of GET requests partially suceeding
    ~21:03 UTC: Most GET requests succeeding
    21:13 UTC: AWS notifies of GET requests fully restored
    ~21:52 UTC: Most PUT requests succeeding
    22:11 UTC: AWS notifies of PUT requests fully restored
```

The disconnect between the problem being seen by it's customers, acknowledging the issue and notifying the community is terribly large.
As a company that prides itself on reliability, this was a scary thing to witness.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Hey <a href="https://twitter.com/awsstatus">@awsstatus</a> how long will <a href="https://twitter.com/hashtag/s3?src=hash">#s3</a> be down? Are you going to reduce the 99.99% available rating after this? <a href="https://twitter.com/hashtag/ouch?src=hash">#ouch</a></p>&mdash; Michael Standen (@_MichaelStanden) <a href="https://twitter.com/_MichaelStanden/status/836655786101125120">February 28, 2017</a></blockquote>

I'm not expecting a response.

## AWS Status

One of the most interesting take aways was that the [AWS Status](https://status.aws.amazon.com/) page wasn't showing any error.
This was due to the status page using S3 as part of it's backend.

Wow!

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/awscloud">@awscloud</a> please don&#39;t host your status service on the service it&#39;s reporting a status of...</p>&mdash; Michael Standen (@_MichaelStanden) <a href="https://twitter.com/_MichaelStanden/status/836663463535521792">February 28, 2017</a></blockquote>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Amazon admits the status page can’t be updated because the images are in S3: <a href="https://t.co/gTtWajirSh">pic.twitter.com/gTtWajirSh</a></p>&mdash; MikeTalonNYC (@MikeTalonNYC) <a href="https://twitter.com/MikeTalonNYC/status/836662758808645633">February 28, 2017</a></blockquote>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Amazon <a href="https://twitter.com/hashtag/s3?src=hash">#s3</a> Outage <a href="https://t.co/h4xYZKkoHe">pic.twitter.com/h4xYZKkoHe</a></p>&mdash; Andrew J Oldaker (@weatherdrew) <a href="https://twitter.com/weatherdrew/status/836654075282403328">February 28, 2017</a></blockquote>

The status page has since been updated to reflect the real state without relying on the service it was reporting about.

Interestingly, I never once saw an issue listed on the status page for regions outside North America, but definately could not access a bucket in Sydney, Asia Pacific.
Maybe this was a partial fix?
Stay tuned I guess.

## Redundancy is the key to survival

Did you notice this website go down? No?

Because I have [AWS Cloudfront](https://aws.amazon.com/cloudfront/) in front of S3, caching responses.
As a static website, this is a simple solution and also offers a number of other benefits.

Some of my other services would have gone down ([Cat Facts](/catfacts.html)), if they were being utilised during this time.
Luckily for me, at the time of writing, all the services I host on AWS are low traffic.

The correct way to get around a problem like this, where a 3rd party service goes down is to not keep all your eggs in one bucket.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">This <a href="https://twitter.com/hashtag/aws?src=hash">#aws</a> <a href="https://twitter.com/hashtag/s3?src=hash">#s3</a> <a href="https://twitter.com/hashtag/outage?src=hash">#outage</a> is a good reminder not to keep all your eggs in one bucket</p>&mdash; Michael Standen (@_MichaelStanden) <a href="https://twitter.com/_MichaelStanden/status/836701764095090688">February 28, 2017</a></blockquote>

Google Cloud Services offers direct support for the S3 XML API, and has multi-regional support at a fraction of the cost of S3.
[Find out how to port S3 to GCS here](https://cloud.google.com/storage/docs/interoperability)

But why stop there?

You can also use [Azure](https://azure.microsoft.com/en-us/services/storage/) or the lesser known [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html).

I prefer to **trust no one**, and look after the data myself and you should too.
