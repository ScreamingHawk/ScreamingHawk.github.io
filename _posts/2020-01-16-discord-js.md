---
layout: post
title: "Discord Bot"
excerpt: "Writing a Discord bot with Discord JS."
image: "images/franck-v-zbLW0FG8XU8-unsplash.jpg"
imageattribution: "Franck V."
imageattributionlink: https://unsplash.com/@franckinjapan
tags:
- guide
---

# Discord JS

Discord has a very rich and easy to understand API for creating a bot.

Here are a couple extra helper methods that you can use to get the most out of your bot.

## Login

The following is how to log in with the bot.
Discord JS uses promises, which is nice but sometimes you just want something synchronous.
This pattern will let you turn an async function into a synchronous one.

It is good practice to store the token outside of your source code.
In this example I am storing it in an environment variable named `discordToken`.

```javascript
const discordjs = require('discord.js')
const discord = new discordjs.Client()
(async () => await discord.login(process.env.discordToken))()
```

Note: This will store the discord client as `discord`, which I will use later in the post.
The examples use `client`, however I find that ambiguous when combined with other libraries.

## Find a channel by name

Often I need to find a particular channel Id for use in notification tasks.
Running the following from the command line will get you the channel with the given name.

```javascript
const channelByName = name => discord.channels.find(c => c.name === name)
let channel = channelByName('bots')
```

## Sending a message to a channel

Using the above, we can post a message to a channel.
Here is another helper function to assist.

```javascript
const sendTo = (chanName, message) => (async () => await channelByName(chanName).send(message))()
sendTo('bots', 'Hello World!')
```

## Find a user

Users can be tagged using their user object.
Here's how you get it, tag them and DM them.

```javascript
const userByName = name => discord.users.find(u => u.username === name)
const slideIntoDMs = (name, message) => (async () => await userByName(name).send(message))()
let user = userByName('MilkyTaste')
sendTo('bots', "Hello ${user}!")
slideIntoDMs('MilkyTaste', 'Hello friend!')
```

## Closing

Got something else you want a helper function for?
Let me know in the comments.

[0]: https://discord.js.org
