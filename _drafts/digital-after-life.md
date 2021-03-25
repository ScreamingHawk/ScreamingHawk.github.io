---
layout: post
title: "Digital After Life"
excerpt: "Instructions for dealing with my digital assets when I'm gone"
image: "images/pexels-pixabay-161280.jpg"
imageattribution: "Pixabay"
imageattributionlink: https://www.pexels.com/photo/purple-crocus-in-bloom-during-daytime-161280/
tags:
  - blog
  - introspection
---

# Digital After Life

As technological dependence grows society is going to have to worry more and more about what to do with digital assets after a person's death.
For myself and a lot of other technical people, there can be a huge cost associated with this.
Dealing with some of these can be time critical.

The instructions below are provided both for my next of kin (as a light set of instructions) and the wider internet community (as a conversation point).

Accompanying information (passwords etc) can be found in my will or [Google Drive][1].

## Respecting My Privacy

There is a folder on my hard drive labeled "Homework". **Destroy all the contents immediately!**

*Just kidding.*

In the process of going through my digital life you will likely find personal items that you find *uncomfortable*.
Please respect my privacy with these items and either delete them or turn a blind eye.
Take comfort that nothing you find while diving through my digital life made you concerned in life.

To those reading prior to my death, note that this is not some big dark secret, it is merely regarding aspects of my personal self that I choose not to disclose to the public.
I hope that you will respect my privacy in the same way you allow people to close their curtains before getting changed.

## Email and Accessing Accounts

Email contains the keys to the kingdom.

Access to email gives you access to any account with the "Forgot my Password" feature.
2 factor authentication is secured through [Authy](https://authy.com/) and is susceptible to this bypass too.

Where possible I use Google OAuth ("Sign in with Google" buttons) and Facebook OAuth.
Use these to get around the password requirements for individual apps.

To make life easier I've included a number of passwords and pin numbers in my will that are needed to access import accounts.

I recommend setting up an automated forwarding rule on both my email addresses so you get my emails to make your life easier. 

## Devices

I do not hold anything of value on my phone.
All photos and documents are backed up to the cloud.

There is a trivial amount of crypto I use for play testing.
Feel free to do whatever you like with this.

Please keep my SIM card for 2 factor authentication purposes.

Feel free to do whatever you see fit with my PC.
I don't have anything of value on there either.

## Friends and Social

My preference is that accounts hang around with something like "RIP ⚰️" added.

Please update the following:

* Google (update my name)
* Twitter (name and username)
* Facebook (name)
* Discord (username)
* GitHub (name)

Please also post a comment on each of these platforms as me stating I have passed on.
I'm not concerned about the phrasing. Something like the below is enough:

> Hi, this is X. Michael has requested I make this post to show he has passed on. I'm sorry for your loss.

If the family prefers the accounts be removed, that is ok.
Delete the Twitter, Facebook and Discord accounts.

Please keep the Google account in case it is needed to access any of my other accounts.

Do not worry about informing anyone regarding other accounts I have that are not listed above.
I do not treat all social networks as social networks, merely communication hubs.
The one's listed above are the only ones I care strongly about.

### Gaming

Steam doesn't always honour requests to transfer game ownership.
Feel free to take ownership of the account by changing the username and other details.
I would appreciate if any of the family can access the games.

All my true friends from Steam know me on other platforms.
Do not worry if you unfriend anyone as you take ownership.

I have a handful of games through [Epic Games][10] and [Humble Bundle][11].
Feel free to do the same with these accounts.

## Archives

While I have a lot of data stored online I don't think much of it will be relevant to those going through my estate.
The main thing that I think will be nice to be kept is my photo records.
Please note again the privacy concerns listed above.

### Photos

Log in to [AWS][3], navigate to S3, then the `deep-photo-storage` bucket.
Select each zipped file, `Action` and `Initiate Restore`.
More information about the restore process can be found here: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects.html

Log in to [Google Photos][5] to view the photos.
Export the photos via [Google Takeout][6].

I haven't used [Facebook][7] in a long time but there are some old photos in there.
Log in to my account, navigate to `Settings` and download a copy of my Facebook data.
This will include all the posts and photos.
More information can be found here: https://www.facebook.com/help/212802592074644

### Documents

All my documents can all be found either in [GitHub][2] or [Google Drive][1].
I don't think any of my documents are particularly important but some might be interesting to look through.

I'm currently recording some (not quite) daily thoughts over at [One Post a Day][12] which could be fun to read through.
I have a couple project / life ideas in the `Personal` folder in Google Drive that might be interesting too.
You can download these one by one or via [Google Takeout][6].

## Websites and Infrastructure

Ideally I would like my websites and services to live on.
I created these as public goods and on the chance someone gaining value from them I feel they should stay.

Unfortunately there is a cost associated with hosting these solutions and I don't want my next of kin to bear the responsbility of maintaining these; money or effort.

So... **Shut it down.**

The source code will remain available on [GitHub][2] and hopefully the READMEs in each project are sufficient to get them up and running again if desired.

All my content that has a cost associated is stored on [AWS][3].
Here are some instructions from AWS about how to close an account: https://aws.amazon.com/premiumsupport/knowledge-center/close-aws-account/
Please make sure you have finished exporting any photos.
My email is also hosted here so make sure you are done with accessing my accounts too.
At this point I would also recommend cancelling the credit card to ensure there are no additional charges.

### Exceptions

I have a few projects hosted in [Google Cloud][7] and [Heroku][8] using entirely free tier services.
Neither service has a valid payment option and can remain untouched indefinitely.

I recieve occasional payments from Google for [my Android apps][9].
The only reason you would need to access these is to change the account the payments are made to.
This is only ever a couple dollars a month.

### Discord Bots

All the source code is available on [GitHub][2] and people are free to clone them for reuse as per the licences.
I am happy for the bot tokens to be shared to any admins in the respective servers.

`SatanBot` is hosted in [Google Cloud][7] on the free tier and work until some maintainance event happens.
While the database can be extracted I feel cloning the bot isn't worth the effort.
I recommend the server transition to a new bot.
The state can be exported at any time via admin commands.

`PI Manager` is hosted on my PC (there is a `.bat` file on the desktop).
This bot is currently storing state in a hidden discord channel so anyone that runs the bot will have all the data instantly.
You can share the code and bot token for anyone else on the server to run it.

## Crypto

I've been playing the crypto space for a while and have accumulated a sizable stash.
This is mainly in Bitcoin and Ethereum.
The seed phrases are located with my important documents.
**Please please please do not share these phrases!**

I have set up a wallets for each of the kids with small balances.
I would like them to have complete access to these accounts to do with as they wish. It is not a college fund.

There are a number of documents stored in [Google Drive][1] that point to various online exchanges where crypto is stored. 
I suggest you withdraw the funds as fiat via [EasyCrypto][4] (or some other means).
Alternatively, withdraw the funds to the wallets above if you want to keep it as crypto.

## Closing

Look after yourself.
I love you guys.

[1]: https://drive.google.com/drive/my-drive
[2]: https://github.com/ScreamingHawk
[3]: https://console.aws.amazon.com/console
[4]: https://easycrypto.ai
[5]: https://photos.google.com/u/0/albums
[6]: https://takeout.google.com
[7]: https://cloud.google.com
[8]: https://www.heroku.com
[9]: https://play.google.com/store/apps/developer?id=Michael+Standen
[10]: https://www.epicgames.com
[11]: https://www.humblebundle.com
[12]: https://raw.githack.com/ScreamingHawk/one-post-a-day/master/index.html
