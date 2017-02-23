---
layout: page
title: Cat Facts
description: "Subscribe to weekly cat facts."
image: "images/erik-jan-leusink-144775.jpg"
permalink: /catfacts.html
tags:
  - cats
script: "cat.js"
externalscript: "https://sdk.amazonaws.com/js/aws-sdk-2.2.19.min.js"
---

<h1>Cat Facts</h1>
<h3>Get spam about cats :3 (weekly)</h3>
<form id="catForm">
  <input id="email" required="true" placeholder="ilovecats@myhouse.com">
  <button id="catButton">Send Me Cats!</button>
</form>
<p id="note" class="hidden"></p>

<p><a href="{{ site.url }}/2017/02/23/cat-facts.html">Find out more</a> about Cat Facts.</p>

<a href="http://thecatapi.com"><img src="http://thecatapi.com/api/images/get?format=src"></a>

<p><a href="">Refresh the page</a> for a new cat! :3</p>
