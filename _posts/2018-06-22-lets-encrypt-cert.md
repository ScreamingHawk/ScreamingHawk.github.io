---
layout: post
title: "Let's Encrypt Certificate"
excerpt: "Getting a Certificate from Let's Encrypt"
image: "images/padlock-lock-chain-key-39624.webp"
imageattribution: "Steve Buissinne"
imageattributionlink: https://pixabay.com/en/padlock-lock-chain-key-security-597495/
tags:
  - guide
  - service
---

# Getting a Certificate from Let's Encrypt

Getting a certificate is one of those things you have to do a couple times a year, but something that I never remember how to do.

Since I'm trying to get `HTTPS` working for [Video Viewer][0], I figured I'd write a quick guide so that I can do it quickly again next time.

## Requirements

To do this you need to already have a domain name registered and access to set some `TXT` values in the `DNS`. I use [Amazon Route 53][1] because I'm an Amazon shill, but there are plenty of other options out there (some are even free).

This guide is also only for Ubuntu and similar systems. If you are on Windows I suggest you install [Bash On Ubuntu on Windows][2]. You can have an almost complete bash shell on your Windows machine. It's a killer feature.


## Process

Install [certbot][3] using the instructions below.
Alternatively follow the link to see if there is a better option for your set up.

```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
```

Run certbot.

```
sudo certbot -d <YOUR_DOMAIN_HERE> --manual --preferred-challenges dns certonly
```

Follow the prompts.

* Enter email address
* Accept terms of service
* Allow / decline the Let's Encrypt newsletter
* Approve IP logging

certbot will then request you add a `DNS` `TXT` record to prove you own the domain.
Do this before continuing.

* Hit enter

The certificate and private key will be saved to your machine for you to do as you please.

## Afterword

The certificate will be valid for 90 days.
Renewing the certificate is out of scope for this post.
Expect another post in about 91 days

This service is provided completely free.
If it helped you out as much as it's helped me, you should consider donating the [price of a coffee][4] to [Let's Encrypt][5] as a thank you.

[0]: https://michael.standen.link/2018/03/13/web-vlc.html
[1]: https://aws.amazon.com/route53/
[2]: http://wsl-guide.org/en/latest/installation.html
[3]: https://certbot.eff.org
[4]: https://twitter.com/4BillLewis/status/527963934427709440
[5]: https://letsencrypt.org/donate
