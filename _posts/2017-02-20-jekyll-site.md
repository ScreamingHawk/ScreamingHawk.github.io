---
layout: post
title:  "Jekyll Site"
excerpt: "A simple blog hosted in the cloud."
image: "images/patrick-b-113211.webp"
imageattribution: "Patrick B."
imageattributionlink: https://unsplash.com/@patin617
tags:
  - jekyll
  - project
  - architecture
---

## Overview

This site is a simple static website hosted in the cloud.
There were a number of considerations I made when designing this site and a number of tiny challenges to overcome.


## Decisions

The driving factor for the change in website was the desire for change.
I've had a busy year personally and professionally and felt like a change was overdue.

I treated this website like a [greenfield project](https://en.wikipedia.org/wiki/Greenfield_project).


### Infrastructure Requirements

Requirements for infrastructure were as follows:

* Cheap - I'm not made of money
* Secure - support HTTPS at least
* Allow Custom Domains - vanity domains are great
* Scalable - in case I get really big. #dreaming
* Highly Available - so I don't have to monitor the site
* Compatable - with the Software solution and others in case I decide to change it

There are a number of great cloud provides and services out there that fit all these requirements but there was another criteria that's often left out when considering which tools to use.
So I added another requirement.

* Utilises Existing Skill Set

This isn't the case of everything looking like a nail, this was leveraging existing knowledge sets so that development will be quicker, easier, robust and performant.
>Sometimes it's better to give a hammer to the hammer professional when he can do a better job than a beginner with a nail gun.

All my projects are hosted on AWS, and as a certified [AWS Developer Associate](https://aws.amazon.com/certification/certified-developer-associate/) and [AWS Solutions Architect Associate](https://aws.amazon.com/certification/certified-solutions-architect-associate/), it was a no brainer to use these services.


### Software Requirements

Requirements for software were as follows:

* Cheap - I'm still not made of money
* Fully Configurable / Flexible - future requirements are unknown
* Maintainable - any time spent maintaining the system is time not spent adding value elsewhere
* Open Source - sharing promotes growth
* Utilises Templating or Content Generation - as per maintainence, working in pure HTML, CSS, JS is nice, but it takes time that is better spent elsewhere
* Supplied Designs / Themes - visual design is hard, time consuming and I'm not a professional. Someone else can do it for me

As with the Infrastructure Requirements, I also considered my existing tool set.
However, I am mostly familiar with pure HTML, CSS and JS (negating maintainability and templating) or tools which require the website be dynamically hosted (negating cost).

As a [GitHub User](https://github.com/{{ site.github }}) I'm familiar with [MarkDown](https://en.wikipedia.org/wiki/Markdown) and recently had a friend recommend [Jekyll](https://jekyllrb.com/) as a static website generator.
It ticks all the boxes, and I enjoy learning new technologies so decided I would give it a go.


### Architecture Solution

The end result of the architecture is basic while still fitting all the criteria layed out previously.

<figure>
	<img src="/images/cloudcraft-michael.standen.link.webp">
	<figcaption>michael.standen.link architecture created on <a href="https://cloudcraft.co/" title="Cloudcraft">Cloudcraft</a>.</figcaption>
</figure>

I would recommend this architecture for any static website development, green fields or otherwise.
However I would also advise that the configuration mentioned below be analysed separately as it will not fit every businesses' use cases.


#### Storage - S3

The website has to be stored somewhere. Amazon's [Simple Storage Service (S3)](https://aws.amazon.com/s3/) is an object store that is capable of hosting static websites.
S3 has 99.999999999% durability and 99.99% availability.
It automatically scales on demand and most importantly is cheap.

In order to reduce costs further, I decided to sacrifice some durability (do I really need my website's destruction to be less like than the next mass existinction event?), by using the Reduced Redundancy Storage option.
This reduces the durability to 99.99% and further cuts some costs.

Unfortunately S3 does not allow HTTPS and custom domains for static websites natively.
For SSL termination against a custom certificate a reverse proxy is required.
CloudFront, the CDN mentioned below, is capable of handling this and more.


#### CDN - CloudFront

[CloudFront](https://aws.amazon.com/cloudfront/) is Amazon's Content Delivery Network (CDN) service that enables low latency delivery of static resources.
As the entire website is static, the entire website is delivered over CloudFront.

The cost of CloudFront is cheap compared to other CDNs and worry free when situated in front of AWS services.
The main reason for using a CDN for this low traffic website was because it offers SSL termination against custom certificates.

One thing to consider when using a CDN is the Time To Live (TTL) of your resources.
Typically websites will only host their static assets over the CDN and use tricks such as adding a digest to the filenames to bypass caching when desired.
As all the resources of this website are served through the CDN and I did not want to heavily modify the build process, a TTL of 1 day was decided upon.
This means users may not see changes for up to 1 day after they have been made.
Due to the low traffic and expected audience of the site, this is a non issue for this site.


#### DNS - Route 53

[Route 53](https://aws.amazon.com/route53/) is Amazon's Domain Name System (DNS). There's nothing too special here.

The DNS record points to the CloudFront distribution, so that I can use my vanity address.

There are cheaper alternatives to Route 53 however the convinience of having everything in one place was worth the extra couple of dollars a years.

Interesting note: Amazon's DNS service is the only service for which Amazon guarantees 100% availability.


### Software Solution

The entire codebase for this website is available on my [GitHub](https://github.com/{{ site.github }}/{{ site.github }}.github.io).
This includes all image resources the build, deploy and testing scripts, as well as draft posts.

The website is statically generated HTML, CSS and Javascript using the Jekyll framework.
Build and deploy scripts are shell scripts that automate command line processes.


#### Jekyll

>[Jekyll](https://jekyllrb.com/) is a simple, blog-aware, static site generator perfect for personal, project, or organization sites. Think of it like a file-based CMS, without all the complexity.

The theme of this website is based on the [Halve Jekyll Theme](https://github.com/TaylanTatli/Halve).
Some minor changes were applied to ensure that the website worked when placed in S3.

The theme is designed to be used with a smart hosting service and often leaves off the `.html` from the end of URLs.
For most hosting services this is not a problem, however, this leads to problems with S3 as it does not assume file extensions when the path is not found, it simply returns a 404.

The Jekyll theme also originally contained a *Projects* page, which I found didn't suit my needs.
It was easy to remove the feature.


#### Build

Jekyll is configured to compile sass into CSS automatically.
It uses [kramdown](https://kramdown.gettalong.org/) to convert the markdown posts located in `_posts/` to HTML pages.

The Halve theme contains page layout information for the generation of each page including the home page and a tags page.
These layouts, located in `_layouts/`, are picked up by Jekyll and processed into HTML.

Jekyll has an `incremental build` option, which unfortunately doesn't consider changes to `_config.yml` and other configuration files.
The build scripts first delete the compiled directory before requesting a new build.


#### Deploy

The deployment script takes the files located in the compiled directory and syncs them with the selected S3 bucket.
These changes are immediately live (pending cache expiration from the CDN).
This is accomplished with a call to the AWS CLI tool and passing in some stored security tokens.


#### Testing

Prior to the build for testing, `sed` is called to replace the site url with localhost.
This ensures that links point to localhost rather than the production environment.

Testing utilises the Jekyll built in server which can be run by calling `jekyll serve`.
When running testing an additional flag `--drafts` is used to include drafts posts as if they have been plublished.
This is convient for checking a post part way through the writing process, without having to move it to a published state.

At this point, all testing is manual.
While automated testing would be nice, the visual nature of this project can make that difficult.
There are visual tools out there that can detect and display differences, however set up time and other factors make them excessive for this website.
Were this a customers production website, they would be included.


### Final Thoughts

If I were to do it over again, there is not much I would change.
For a corporate environment things would be different.

The final cost of this hosting solution will depend on the traffic received, but it is ready to cope with any volume at a low cost.

Amazon offers a DDoS mitigation service called [AWS Shield Advanced](https://aws.amazon.com/shield/) for corporate customers.
It is an expensive service but worth considering for high traffic websites.

The deployment process is easy, however it is still open to user error due to the need to call scripts manually.
A git hook would be an appropriate way to remove this.

Enabling [CloudTrail](https://aws.amazon.com/cloudtrail/) would add accountability to the deployment process were this a corporate site.

Additionally, a staging environment would be recommended for corporate use.
This need only be another S3 bucket, unless the domain is requried.

There were some configuration calls made regarding CloudFront caching in particular that are suboptimal and would be reconsidered if they cause issues further down the line.

Anyway, I hope you took away something from this.
