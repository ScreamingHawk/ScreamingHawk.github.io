---
layout: post
title: "Bitcoin Cash from your Pre-Fork Android Wallet"
excerpt: "Walkthrough for how to get Bitcoin Cash out of your pre-fork Android Bitcoin Wallet."
image: "images/didier-weemaels-36055.jpg"
imageattribution: "Didier Weemaels"
imageattributionlink: https://unsplash.com/@didwee
tags:
  - guide
  - crypto
---

## About Bitcoin Cash

If you don't know about Bitcoin, this post isn't for you.
There are plenty of other resources that explain Bitcoin far better than I am able.

Bitcoin Cash was created due to a fork in the Bitcoin protocol.
This means that anyone who had a Bitcoin wallet with a value prior to the fork, also has the same wallet and value on the Bitcoin Cash network.

**Woohoo Free Money!**

So how do you get it?

I had my Bitcoin stored in the incredibly popular [Android Wallet App][0].
I highly recommend this app for anyone looking to get into Bitcoin. But unfortunately, it does not support Bitcoin Cash.
Don't worry, you have the private keys so you can still get it.

## Back Up Your Keys

**You should already be backing up your keys and know how to do this!**

But for completeness, here's how:

Open the app.

Open the `option menu` and select `Safety` then `Back up wallet`.

Give your wallet a good password. And I mean *really* good. If someone gets this back up, they have all your coins.

`Archive` your back up to somewhere you can access it from your PC.
I use [Evaporating.link][1] for temporary sharing and [Google Drive][2] for long term.
I also recommend sticking the date on the filename.

## Download the Files

These instructions are for Linux computers.
If you have Windows, I recommend installing [Bash on Ubuntu on Windows][3], but a virtual machine will get the job done too.

Install the dependencies.

```
sudo add-apt-repository ppa:webupd8team/java -y
sudo apt-get update
sudo apt-get install openssl git maven oracle-java8-installer oracle-java8-set-default -y
git clone -b release-0.14 https://github.com/bitcoinj/bitcoinj.git
cd bitcoinj/tools
```

Test it worked

```
java -version
./wallet-tool
```

Download the back up you created earlier.

Decrypt the back up (where `your-bitcoin-wallet-backup` is your bitcoin wallet backup filename).

```
openssl enc -d -aes-256-cbc -md md5 -a -in your-bitcoin-wallet-backup > bitcoin-wallet-decrypted-backup
```

Check if it worked.

```
cat bitcoin-wallet-decrypted-backup | tr -cd "[:print:]" | awk '{print $1}'
```

If the result is `org.bitcoin.production`, you got the password right and can continue.
Or if the result is just `#`, you've got an early version of the back up file and you can find the WIF private keys in this file.

If you have a spending PIN on the wallet you can remove it now (where `<PIN>` is your spending PIN).
If you do not have a spending PIN, you can skip this step.

```
./wallet-tool decrypt --wallet=/tmp/bitcoin-wallet-decrypted-backup --password=<PIN>
```

Use the `wallet-tool` to dump the private keys from your backup.

```
./wallet-tool dump --wallet=bitcoin-wallet-decrypted-backup --dump-privkeys > private_keys_and_data.txt
```

This file now has your public and private keys and other data in multiple plain text formats.

Strip out all the WIF private keys

```
grep -E "=[A-Za-z0-9]{52}," -o private_keys_and_data.txt | tr -d '=,' > private_keys_only.txt
```

## Copy to Keys into a Bitcoin Cash Support Application

On your computer, generate a QR code for each private key with a value.

```
sudo apt-get install -y nodejs npm build-essential
sudo npm install -g qrcode-terminal
```

Generate a QR code for each private key

To generate a single line at a time use this (increment the value at `1p` to get the next line):

```
qrcode-terminal `sed -n 1p private_keys_only.txt | tr -d '\r\n'`
```

If you just want them all, use:

```
while read -r LINE; do echo $LINE; qrcode-terminal $LINE; echo ""; done < private_keys_only.txt
```

A QR code will spew into your terminal for you to capture with the application.

Install a Bitcoin Cash supporting wallet.
I used [Coinomi][4] for this.

In [Coinomi][4], navigate to Bitcoin Cash, from the `option menu` select `Sweep wallet`.

Press the QR code button and take a picture of the QR code printed to your PC console.

Press `Next`.

If the address had coins you will be given a balance, press `Next` then repeat.

If the address had no balance, repeat with the next QR code.

## Clean Up

**Delete all the unencrypted files!**

This files give anyone access to your wallet addresses for both Bitcoin and Bitcoin Cash networks.
Delete all the wallet files created in this guide using the following.

```
rm -f private* bitcoin* out
```

## Closing

This process took me a couple hours to figure out and complete, hopefully this guide will save someone a headache.

If this information helped, consider tipping me at `1HQCiMrG86Rry4fNdP7z17DCdhfZ8ow5nK` (BTC and BCH)

[0]: https://play.google.com/store/apps/details?id=de.schildbach.wallet
[1]: http://evaporating.link
[2]: https://www.google.com/drive/
[3]: https://insights.ubuntu.com/2016/04/14/howto-ubuntu-on-windows-2/
[4]: https://play.google.com/store/apps/details?id=com.coinomi.wallet
