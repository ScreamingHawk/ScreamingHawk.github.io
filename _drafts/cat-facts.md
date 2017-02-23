---
layout: post
title: "Cat Facts"
excerpt: "Subscribe to weekly cat facts."
image: "images/erik-jan-leusink-144775.jpg"
tags:
  - cats
  - project
  - architecture
---

## Overview

I like cats.

Wait. I don't think you understand. I really like cats.

You remember that joke [eHarmony video](https://www.youtube.com/watch?v=mTTwcCVajAc) about the lady who loves cats.

I'm that person.

A while back there was this [cat facts text conversation](https://i.imgur.com/rsQ93.png).
I really liked the idea of subscribing to something like this and was also looking for an excuse to try another AWS service.
So I made it.

I've ported the page from my [old website](http://old.standen.link) and you can now [find it here]({{ site.url }}/catfacts.html).


## Implemented Architecture

Like many of the projects you will see on here, the architectural decisions behind Cat Facts were heavily weighted in terms of a low cost solution.
This means that the actual implemented architecture is different from what I would propose for a corporate environment.

>The total cost of this solution is *$0.00*.

That's right.
It costs me absolutely nothing to run this service.
And that's due a carefully selection of AWS services and trade offs which I'll detail below.

It's also due to some rounding.
AWS charges per Gb of hosted content in S3.
My entire costs of S3 is currently $0.01 per month.
I think it's unfair to charge this cent to Cat Facts.
This would be covered under the free tier if the account was under a year old.

The current implemented architecture looks like this:

<figure>
  <img src="/images/cloudcraft-catfacts-actual.jpg">
  <figcaption>Cat Facts architecture created on <a href="https://cloudcraft.co/" title="Cloudcraft">Cloudcraft</a>.</figcaption>
</figure>

### S3 - Static Webpage

[I've already talked about S3]({{ site.url }}/2017/02/20/jekyll-site.html#storage---s3).
It's great for hosting static content.
It's basically free cost wise and basically worry free as well.
I use it and recommend it for serving any static content.

The web page that runs Cat Facts contains a Javascript asset which calls the other AWS services mentioned below.
Doing these calls client side removes costs but can impact security.
Security will be addressed in more detail below.

As an aside, missing from this diagram is CloudFront.
Prior to migrating Cat Facts to this blog, there was no CDN in between the S3 bucket and the end user.
In order to maintain simplicity, I've kept it out of this diagram.


### S3 - Facts List

Huh? S3 back again?

That's right!

S3 is an object store and can be used for storing more than static websites.
Instead of storing all the facts in a database that charges hourly, I put all the facts into a text file and dropped them in S3 as well.

These facts are stored in a seperate S3 bucket to the webpage that is not publicly accessible.
Although, all the facts are available in the [GitHub repository]({{https://github.com/ScreamingHawk/milk-server-cat/blob/master/catfacts.txt}}).
This was not entirely necessary as access control can be configured on a per object basis.
I opted for a bucketwise solution out of convenience.


### Cognito - Authorisation

[Cognito](https://aws.amazon.com/cognito/) is Amazon's authentication and authorisation service.
It's touted as a mobile service, but it's applicable use extended far beyond this.

Cognito is used to provide access to AWS resources and services to logged in users.
Authentication can be handled by Cognito or via configured 3rd party services such as [Facebook](https://www.facebook.com/) or [Google](https://www.google.com).
Once authenticated, Cognito talks to [AWS Identity and Access Management](https://aws.amazon.com/iam/) to provide a role which enables access to configured services.
Unauthenticated users may also receive a role if this has been configured.

As Cat Facts is intended to be publicly available, there is no authentication, only authorisation.
The unauthenticated Cognito role for Cat Facts allows access to the make subscription requests to the Cat Facts SNS topic.
The role does not allow access to anything else and so is secure for the purposes layed out.

Due to the lack of authentication, it is possible for any user to sign up any email address.
This could be considered a security flaw, however as this is intended to be a mock spam service it's considered a feature here.


### SNS - Mailing List

Those familiar with AWS services might notice this choice of service is quite strange.

The obvious service of choice here would be the [Simple Email Service (SES)](https://aws.amazon.com/ses/).
SES offers rich formatting, monitoring, email receiving, authentication and much more.
All of which is unnecessary for Cat Facts.

The [Simple Notification Service (SNS)](https://aws.amazon.com/sns/) on the other hand offers more useful features. 
SNS offers automated subscription management, SMS (txt messaging) and lots of other stuff that's irrelevent to Cat Facts.
But the automated scubscription management was the key selling point of this service.

If Cat Facts was using SES instead of SNS it would have to manage subscriptions itself.
This would mean a lot of extra work:
* Subscription confirmation email
* Database to store emails and state of confirmation
* Endpoint to unsubscribe

The downside is that Cat Facts looks even more like spam, as it cannot embed images, or links or anything pretty.
It's also forced to come from no-reply@sns.amazonaws.com and has an ugly footer that includes a link to Amazon support.

As with most projects you'll see here, cost and convenience wins out.


### Lambda - Weekly Cron Task

Serverless is great.
[AWS Lambda](https://aws.amazon.com/lambda/) is great.
It ticks all the boxes, it really does.

* Automatic Scaling
* Automatic Monitoring
* No Maintenance
* Fast
* Cheap

The only downside is that it's stateless, but that's easily solvable in conjunction with other services.

The Lambda function for Cat Facts runs weekly and follows this process:

1. Pick up facts list from S3 bucket
2. Randomly select a line from file
3. Remove the line from the file
4. Write the file back to S3
5. Append `:3` to the line. #That's a cats face
6. Send a notification with the line to the Cat Facts SNS topic

This process takes less than 5 second, uses hardly any memory and costs nothing, as it's under the free usage of AWS.
This free usage is for *all* accounts and not just new ones.
Bonus.

This Lambda function requires permission only to access the specific facts file and publish to the Cat Facts SNS topic.
It is not publicly accessible and is completely secure.


## Recommended Architecture

Server side handling of roles and subscription.

Authentication and authorisation for cognito.

SES not SNS. Database/S3 requirements for subscription management.

## Final Thoughts

When I originally developed Cat Facts SMS via SNS was only available to American phone numbers so I did not implement it.
Now it is supported so this is something I will likely add in the future.
