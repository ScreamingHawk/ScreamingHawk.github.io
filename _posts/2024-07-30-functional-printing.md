---
layout: post
title: "Functional Printing"
excerpt: "Using 3D printing to solve problems."
image: "images/pexels-theshuttervision-13513543.jpg"
imageattribution: "Jonathan Cooper"
imageattributionlink: https://www.pexels.com/photo/a-close-up-shot-of-a-3d-printer-13513543
tags:
  - project
  - printing
---

# Functional 3D Printing

3D printing is a fun hobby. It's also a great way to solve a lot of problems around the home. Here's a quick tale about how I used 3D printing to solve a problem I had with my car.

## Mazda 2007 MPV Ignition Switch

I had a problem.

My car's ignition switch was broken. The plastic part that covers the key hole snapped. In itself that's not a problem because the key can still be used to start the car.

Unfortunately, I lost that too.

I was left with a the fob and a switch I was unable to turn.

<figure>
  <img src="/images/print-key-empty.png">
  <figcaption>Mazda 2007 MPV ignition switch.</figcaption>
</figure>
<figure>
  <img src="/images/print-key-fob.png">
  <figcaption>Mazda 2007 MPV FOB.</figcaption>
</figure>

Lucky for me, I have a 3D printer.

## Measure it

The part was pretty straight forward and used very straight forward shapes. I used a pair of calipers to measure all the dimensions of the switch and scribbled them down on a piece of paper.

<figure>
  <img src="/images/print-key-design.png">
  <figcaption>Design on paper.</figcaption>
</figure>

I actually missed the depth of the part so I had to print it twice. The first time it was too shallow.

## Design it

I used [Fusion 360](https://www.autodesk.com/products/fusion-360) to design the piece. It's a free tool for hobbyists and students. It's also a very powerful tool that I had used at University so the learning curve was very low.

<figure>
  <img src="/images/print-key-cad.png">
  <figcaption>Design in Fusion 360.</figcaption>
</figure>

**Protip**: I store all the dimensions as parameters in the design so I can easily change them later. This was very useful when I had to print the part a second time as it only took a few minutes to adjust the design.

<figure>
  <img src="/images/print-key-params.png">
  <figcaption>Fusion 360 parameters.</figcaption>
</figure>

## Print it

I used a [Creality Ender 3 V3 SE](https://www.creality.com/products/creality-ender-3-v3-se) to print the part. It's a great printer for the price and I've had a lot of fun with it.

<figure>
  <img src="/images/print-key-inserted.png">
  <figcaption>Printed part inserted.</figcaption>
</figure>

## Share it

As a strong supporter of open source, I always make sure my designs are available for others to use.

You can [download the STL file right here](/stls/Mazda2007MPVKey.stl) or from [Thingiverse](https://www.thingiverse.com/thing:6713948), which also has all my slicer settings.
