---
layout: post
title: "AI Health Analysis"
excerpt: "Using AI to analyse a decade of personal health data."
image: "images/joshua-chehov-ZSo4axN3ZXI-unsplash.webp"
imageattribution: "Joshua Chehov"
imageattributionlink: https://unsplash.com/photos/a-close-up-of-a-computer-screen-with-a-line-of-ecg-ZSo4axN3ZXI
tags:
  - ai
  - blog
---

# Using AI to Analyse My Health Data

A few months back, I started wondering: what if AI could look at my health data the same way I do when I'm feeling particularly introspective... only better? Less bias. More context. Maybe even some insight. I wanted a bird's eye view of how I'm really doing, not just how I feel in the moment.

That idea turned into a weekend project (that only took a few hours TBH). I ended up feeding years of data through an AI pipeline I cobbled together from scratch. The result? A clean, searchable health journal powered by AI, available here: [health.michael.standen.link](https://health.michael.standen.link).

## Data Collection

The first step was getting my hands on all my data. Luckily, I've always been somewhat of a data hoarder.

Google Takeout was the best starting point for this. It gives you access to a full archive of data from Google Fit and related services. Which collected my data while I had a Pebble smart watch. I selected only the Fit-related data (steps, weight, activity sessions, heart rate, sleep, etc.), and requested the export. The zip file they send you contains a pile of JSON files. But under the surface, it's gold.

I also pulled in data from Samsung Health (from my S9 days), and Garmin (Forerunner 45). These each have their own quirks. Garmin in particular buries your exports behind multiple account settings pages, and doesn't include treadmill walking unless you manually start the activity.  

For a couple months earlier this year I even had a scale that spits out body fat %, muscle mass, and water weight, which I was manually recording in a spreadsheet. Just in case the data came in handy later.

## Data Cleaning

Feeding the raw data to GPT didn’t work well. I had to clean it first, give it labels and structure. I had AI agent (thanks Cursor) write a Python script that parses and flattens the data into standardised CSVs and JSON files.

I haven't published the code or the raw data for privacy reasons, but it's something I'm seriously considering. The private repository is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) in anticipation.

## Analysis With AI

Once I did that, I used GPT-4 to generate the report. The actual prompt I used was:

> Analyze this data and generate a summary report in markdown

Like, bro, no context and this thing generates the most comprehensive summary of my health data I've ever seen. My doctor should be ashamed. Although I have been using ChatGPT for a while now and it's persistent memory has a lot of personal details that help give context.

Again, check it out here: [health.michael.standen.link](https://health.michael.standen.link)

## Why Publish It?

This part gave me pause. Making your health data public is not a decision to take lightly. We’re heading into a world where AI models will increasingly be trained to evaluate individuals based on publicly available data. That could be useful (personalised wellness services) or dangerous (denied insurance or employment because of inferred health risks).

For now, I've only released the summary report. I'm an open source guy at heart and I was tempted to publish the raw data, but I'm not sure I'm ready to do that yet. But the core trends remain, and that's the part I want to explore. What can I learn about myself if I give AI the full picture? What happens when you make that picture available to others?

## Thoughts Going Forward

Next step, exporting all my medical records and doing the same thing with them. I'm not sure what I'll find, but I'm sure it'll be interesting.

This is an experiment. I'm not trying to optimise everything. I'm trying to observe. I want to see if consistent, low-effort data collection can produce long-term insights. If you've got questions, want to do something similar, or just want to geek out about CSV and JSON parsers and body metrics, feel free to reach out.

You can explore the health journal here: [health.michael.standen.link](https://health.michael.standen.link)

---

*PS: If you're an insurance company or recruiter reading this and planning to feed my metrics into a risk model... good luck. There's a lot more to health than numbers.*
