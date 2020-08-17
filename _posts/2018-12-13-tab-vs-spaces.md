---
layout: post
title: "Tabs vs Spaces"
excerpt: "The many reasons why tabs are better than spaces"
image: "images/space-3197611.webp"
imageattribution: "Dorothe"
imageattributionlink: https://pixabay.com/en/space-empty-wood-floor-plant-3197611/
tags:
  - rant
---

# White Space is Important

As human we innately utilise a number of visual perceptual principles to understand the world around us. Of these, location of objects are key to creating groups in our mind.

[Gestalt laws of grouping][0] states a number of key elements which are deeply related to white space.

In the end, I'll deal with either white space approach - tabs, spaces, combination - so long as it is consistent. Don't mix indentation and don't use something stupid like Fibonacci Indentation.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Personally, I prefer to increase the spacing for each successive indent according to the Fibbonaci sequence: <a href="https://t.co/x5lPd4M5Mk">pic.twitter.com/x5lPd4M5Mk</a></p>&mdash; Richard J. Westenra (@RichardWestenra) <a href="https://twitter.com/RichardWestenra/status/765488378951376896?ref_src=twsrc%5Etfw">August 16, 2016</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

But that being said...

## The Argument

Here's a list of the arguments in either direction.

### Developing in Fields

When developing in a user input field (like in a browser), the tab key will often navigate the user to the next field instead of inserting the character.

Spaces don't have this issue.

### Standardised Spacing

When indenting with a tab, you are always using a single tab.

When indenting with spaces you still have to decide whether to indent with 2 or 4 or some other amount of spaces.

### File Size

A tab is a single character per indentation level. When using tabs you are reducing the size of your files.

Space indentation would use multiple characters to represent the same change in indentation.

### Typing Speed

A tab is a single key stroke.

Indenting with spaces requires multiple key strokes. Modern IDEs allow you configure the tab key to insert the correct indentation of spaces instead of a tab. But at that point... Just insert a tab.

### Navigating Indentation

Similar argument to the above. Navigating indentation levels via keyboard is easier when there are fewer characters to navigate through.

### User Preference

Modern IDEs have configurable tab display sizes. I'm very sensitive to white space (as you could probably guess from this post) and so I'm fine with a tab being represented by as little as 2 spaces. My colleagues prefer them to be 4 and older IDEs deafult to 8. Using tabs supports user preference.

A space is a space is a space. If someone on your team likes  really  wide  spacing, you're stuck with it.

### Salary

Developer who use spaces [earn more money][1] than those who use tabs.

This is because space developers that are paid hourly spend twice as long typing their indentation.

This one is a joke...

## Results

It's pretty clear.

[0]: https://en.wikipedia.org/wiki/Principles_of_grouping
[1]: https://stackoverflow.blog/2017/06/15/developers-use-spaces-make-money-use-tabs/
[2]: https://github.com/jklmnn/fibonacci-indentation
