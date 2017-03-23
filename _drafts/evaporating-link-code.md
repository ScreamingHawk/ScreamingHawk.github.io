---
layout: post
title: "Evaporating.Link Code"
excerpt: "Code walkthrough for the temporary file sharing service."
image: "images/dave-michuda-54058.jpg"
imageattribution: "Dave Michuda"
imageattributionlink: https://unsplash.com/@dmichuda
tags:
  - project
  - code
---

# Evaporating.Link

[Evaporating.Link][1] is a simple file sharing service hosted in the cloud.

If you missed the first post about Evaporating.Link, you can [read the summary here]({{ site.url }}/2017/03/08/evaporating-link.html).

## Code Overview

This project is visually, architecturally and programmatically minimal.

The technology stack uses a fully automated (near) zero code server side architecture, and a pure HTML, CSS and Javascript client side.
You can [read the architecture details here][2].

The full and current source code is available in the [Github repository](https://github.com/ScreamingHawk/evaporating-link) so you can follow along.

## HTML

The HTML is incredibly simple.

At the top there is a fixed header containing a single link to the about page.

Then each page element is contained within a wrapping div.
The elements are shown and hidden dynamically as required.

`<p id="instructions">` initially contains the text `Enable Javascript`.
This is programmically changed once the Javascript is loaded, and so users with Javascript disabled will continue to see the message until they do so.

The `gSignIn` div is automatically styled and turned into a button when the Google oAuth Javascript is loaded.

For file uploading, the `label for` trick is used to create a stylised upload button.
The label is styled like a button and the `for` attribute causes a click event to be passed to the real, hidden file upload `input` field.

## CSS

The CSS is all in a single unminified 1.5Kb file (at the time of writing).

### Layout

`Flex box` is the fancy new way to lay out content.

```
.fixed {
	margin: 0 auto;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
```

All elements are stacked vertically, aligned center top.
As the vertical size of each element is consistent, but the number of elements changes, a top alignment prevents vertical shuffling as the items change visibility.

### Font Scaling and Positioning

In order to be responsive it was important that everything, including the text, scales with screen size.
The text spans horizontally and so uses `vw` to determine it's size.
Meanwhile, the margins above and below are vertically constrained, and so use `vh` for scaling.

```
h1 {
	font-size: 10vw;
	margin-top: 5vh;
}
h2 {
	font-size: 8vw;
	margin-top: 5vh;
}
```

### Scaling Circled Text

The about page uses the `information` class to create a styled question mark in a circle.
Rather than using the [Font Awesome icon](http://fontawesome.io/icon/question-circle-o/) <i class="fa fa-question-circle-o" aria-hidden="true"></i>, I wanted to try a pure CSS solution of my own.
Correctly size and evenly round (not an oval) the border of the text, which scales dynamically, is a difficult prospect.
However, there is an old CSS unit `ex` which is *relative to the x-height of the current font*.
Using the height only of the scaled font size creates a scaled circle.

```
.info {
	display: inline-block;
	float: right;
	text-align: center;
	width: 1.8ex;
	height: 1.8ex;
	font-size: 0.8ex;
	font-weight: bold;
	border-radius: 50%;
	padding: 1ex;
	border: 1px solid;
	text-decoration: none;
	margin: 1vw;
}
```

The margin uses `vw` as position should be relative to the width of the page, but squarely away from the top of the page as well.

As an aside, there are [lots of different CSS units](https://www.w3schools.com/cssref/css_units.asp) that see little use, but may be perfect for situations where responsiveness is important.

### Styled File Input

File input fields are netorious for being impossible to style correctly.

The easiest way to do this is to hide it and style a label, which passes on the click event.
Hiding the file input with `visibility: none` will remove it from the page, and some browsers do not pass a click through as a security precaution.
The correct way to hide it is as below.

```
input[type="file"] {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
```

Then the label is styled as a button.

```
#fileup {
	cursor: pointer;
	color: #FFF;
	background-color: #0288D1;
	padding: 0.8em 1.2em;
	border: none;
	font-family: 'Shadows Into Light Two', cursive, sans-serif;
	font-size: 0.8em;
	border-radius: 8px;
	max-width: 70%;
	overflow: hidden;
}
```

## Javascript

Evaporating.Link leverages Google oAuth and AWS Javascript frameworks.

On load the instructions are updated to prompt the user to log in.

```
function onLoad(){
	updateInstructions("Sign in");
}
onLoad();
```

This removes the `Enable Javascript` instruction, as obviously Javascript is enabled.

Once the user authenticates using Google oAuth a number of things happen.
1. The log in button is removed.
2. The file upload buttons are made visible.
3. The instructions updated with the users name and directions to upload the file.
4. The Google oAuth token is passed to AWS Cognito and an authorisation token is received for further requests.

```
function onGSuccess(googleUser) {
	// Hide the sign in button
	document.getElementById('gSignIn').className += ' hidden';
	// Show the upload box
	document.getElementById('fileup').className = '';

	// Update instructions
	var gName = googleUser.getBasicProfile().getGivenName();
	console.log('Logged in as: ' + gName);
	updateInstructions('Hi ' + gName);

	// Add the Google access token to the Cognito credentials login map.
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: 'ap-southeast-2:ef05d571-a436-44e6-9aa2-5c968a3be9e4',
		Logins: {
			'accounts.google.com': googleUser.getAuthResponse().id_token
		}
	});
	AWS.config.region = 'ap-southeast-2';
}
```

The nice part about Google oAuth, is that if a user has already authenticated previous, this method is called automatically.
This is great from a usability perspective and really speeds up usage of the site.

When a file is selected for update, the next stage is triggered.
The filename is obtained, truncated to ensure the text will not wrap for a long filename.
The upload confirmation button is displayed.
If the file selection is cancelled, the file upload section is reset.

```
function fileSelected(obj){
	var fileup = document.getElementById('fileup');
	if (obj.target.value) {
		fname = obj.target.value.split("\\").pop();
		if (fname.length > 20){
			fileup.textContent = fname.substr(0, 19) + '...';
		} else {
			fileup.textContent = fname;
		}
		fileup.className = 'label';
		document.getElementById('upload').className = '';
		updateInstructions("Send it up");
	} else {
		// Or not
		fname = null;
		fileup.textContent = 'Choose a file';
		fileup.className = '';
		document.getElementById('upload').className = 'hidden';
		updateInstructions("Select a file");
	}
}
```

Once the file upload confirmation button has been clicked, the magic happens.
After validation, the file is uploaded to S3 with a `reduced redundancy` storage class (to server costs).
The instructions are then updated with a direct link to the S3 bucket.

```
function uploadFile(){
	var files = document.getElementById('file').files;
	if (!files.length) {
		updateInstructions('Select a file');
		return;
	}
	// Unset the button
	updateInstructions('Please wait...');
	document.getElementById('upload').className = 'hidden';
	// Obtain AWS credentials
	AWS.config.credentials.get(function(){
		// Create S3
		var key = 'evaporating/'+fname;
		console.log(key);
		new AWS.S3().upload({
			Bucket: 'evaporating.link',
			Key: key,
			Body: files[0],
			ACL: 'public-read-write',
			StorageClass: 'REDUCED_REDUNDANCY'
		}, function(err, data){
			if (err){
				updateInstructions('Sorry! Error uploading');
				console.log(err.message);
			} else {
				instructions.innerHTML = '<a href="' + data.Location + '">Linky</a>';
			}
		});
	});
}
```

There are a number of architectural decisions in this upload which are detailed in my [post about the architecture][2].
You should have a read of that if you haven't already.

[1]: http://evaporating.link
[2]: {{ site.url }}/2017/03/15/evaporating-link-architecture.html
