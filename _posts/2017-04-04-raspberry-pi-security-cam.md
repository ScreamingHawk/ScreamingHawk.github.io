---
layout: post
title: "Raspberry Pi Security Camera"
excerpt: "Step by step instructions for how to build a security camera with a raspberry pi and a webcam."
image: "images/matthew-henry-87142.webp"
imageattribution: "Matthew Henry"
imageattributionlink: https://unsplash.com/@matthewhenry
tags:
  - guide
---

## Why

I want to add some security cameras to the house, so I can see which neighbour cars are coming in through the cat door.
I had a [Raspberry Pi](https://developers.redhat.com/devnation/) from [DevNation](https://developers.redhat.com/devnation/) that never found a purpose, and had a USB webcam lying around so figured these would be the perfect tools for the job.

It was a bit of a struggle combining a couple different tutorials to get everything working, so I figured I'd glue it all together for anyone else in a similar situation.

You'll also need a WiFi dongle or ethernet cable to hook the Pi up to your router / switch.
If your computer doesn't have an SD card reader, you'll need an adapter too.

## Install Raspbian

Raspbian is a Debian based operating system for the Raspberry Pi that has a bunch of handy features.

The install process is relatively easy.

[Download Raspbian from here](https://www.raspberrypi.org/downloads/raspbian/).
I opted for the net install but either will work.

Plug the Pi's SD card into your computers SD card reader.
Format the SD card to FAT32.

The instructions for this part will be different depending on your operating system, but [this tool](https://www.sdcard.org/downloads/formatter_4/) worked for me on a Windows machine.

Unzip and copy the files for Raspbian onto the SD card.

Plug it back into your Pi and power it on.

## Pi Configuration

Ensure your Pi has internet access (via ethernet etc) and power it on.

Wait for the installation of Raspbian to complete.
If you are using the network install image, you will need to wait a while.

Once the Pi has power up you can log in with these credentials:

```
Username: root
Password: raspbian
```

Get your IP address using:

```
ifconfig
```

**Optional**

You will need to use a browser to check that your Pi camera is working correctly.
If you are planning to use your computer for this, you may find it easy to `ssh` to the Pi and issue the commands remotely.

### Install Some Packages

Install rpi updates.

```
apt-get install rpi-update
rpi-update
apt-get update
apt-get upgrade
```

Install utilities, editors and camera handling programs.

```
apt-get install usbutils nano motion
```

To see if your webcam can be accessed run `lsusb`.

### Configure Motion

Motion is an application that has features for automatically turning a webcam enabled device into a motion detecting security camera.
There are a lot of different options but there are only a few small changes required to get your Pi working.

Edit the file with:

```
nano /etc/motion/motion.conf
```

Find the following lines and edit the properties:

```
daemon on #Enable background processing
stream_localhost off #Allow external access
```

If you notice the application is crashing, try disabling file saving by changing these lines as well:

```
output_pictures off
ffmpeg_output_movies off
```

Now enable the daemon process by editing another properties file:

```
nano /etc/default/motion
```

and change the line to:

```
start_motion_daemon=yes
```

### Start Motion

```
service motion restart
```

Navigate to `http://<pi_ip>:8080` in your browser to see the live feed!

**Woohoo~**

## Follow Up

I noticed, on my Raspberry Pi, that the motion service would stop unexpectedly.
My Pi is an older model so you may not have this problem.

There are a ton of configurable options in `/etc/motion/motion.conf` that you can change to reduce the load on your Pi.
I found reducing the framerate to be effective for increasing performance.

If you are still having issues, you can run something like [systemd](https://wiki.debian.org/systemd) to ensure the process restarts after a crash.


