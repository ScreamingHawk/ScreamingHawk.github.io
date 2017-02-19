---
layout: post
title:  "Jekyll Site"
date:   2017-02-19
excerpt: "A simple blog hosted in the cloud."
tag:
- jekyll
- blog
- project
- architecture
---

## Overview

This site is a simple static website hosted in the cloud.
There were a number of considerations I made when designing this site and a number of tiny challenges to overcome.

## Decisions

The driving factor for the change in website was the desire for change.
I've had a busy year personally and professionally and felt like a change was overdue.

### Amazon Web Services
Rather than handling a hundred different platforms it's easier to use a platform that I fully understand.
This is something that is a key consideration point for all development projects.
While it's important to use the right tool for the job, the skill sets of the team should be taken into account.

There is currently a big push by the leading browsers to rub out websites that do not support HTTPS, regardless of the content they serve.
While I approve of this in principal, it does harm to website such as this that do not contain form for user input.

All my projects are hosted on AWS, and as a certified [AWS Developer Associate](https://aws.amazon.com/certification/certified-developer-associate/) and [AWS Solutions Architect Associate](https://aws.amazon.com/certification/certified-solutions-architect-associate/), it was a no brainer to use these services.

### Jekyll
My old blog is hosted on [blogger](https://milkprojects.blogspot.co.nz/), and while this fulfilled all my needs, it was externally hosted and well out of date.
I decided the new website needed blogging capability to replace it.

The old website was a static website with groups of pages in seperate repositories and no automation around deployment and updates.
Each page was hard HTML, CSS and Javascript. There was no generation, no minification and no optimisation of any kind.
It was difficult if I ever wanted to make a global change and I often found myself not bothering as even a trivial change would take some time.
A framework that used a templating technology is key to allevate this.
A simple build and deploy strategy, without heavy configuration, is also important.


