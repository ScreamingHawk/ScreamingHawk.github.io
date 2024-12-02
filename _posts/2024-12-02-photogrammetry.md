---
layout: post
title: "Photogrammetry"
excerpt: "Using photogrammetry to create 3D models."
image: "images/pexels-jakubzerdzicki-19746343.webp"
imageattribution: "Jakub Zerdzicki"
imageattributionlink: https://www.pexels.com/photo/pink-light-over-3d-printer-19746343/
tags:
  - project
  - printing
---

# Photogrammetry

My mum is notoriously hard to buy for when it comes to presents. So this year when she asked for a 3D printed model of our family, I knew I had to step up my game.

## What is photogrammetry?

Photogrammetry is a technique for creating 3D models from photographs. It's a great way to create 3D models of complex objects without the need for expensive equipment.

## Getting the photos

First up, the camera. I borrowed my wife's Sony DSLR Camera with a [DT 18–55mm F3.5–5.6 SAM II](https://www.sony.co.nz/electronics/camera-lenses/sal18552) lens. This is a solid camera with a great all-round lens. 

To get the best photos I followed the advice of [the Meshroom for Beginners guide](https://meshroom-manual.readthedocs.io/en/latest/tutorials/sketchfab/sketchfab.html) by selecting a fast shutter speed (1/250) and reduced aperture (f/4.5) and reduced ISO (200). I don't know anything about cameras so I let the Mrs do all the work setting this up.

Then I sat as still as possible and had my daughter circle me taking as many photos as possible.

<figure>
  <img src="/images/photo0001.webp">
  <figcaption>A beautiful example photo of myself.</figcaption>
</figure>

## Creating the mesh

The software I used was [Meshroom](https://github.com/alicevision/meshroom). It's a free, open-source, cross-platform photogrammetry application.

Simply drag and drop the photos into the Meshroom folder and hit the Start button. Then go to sleep and come back in the morning.

When you wake up you'll be able to see the locations of all the photos that were taken and you'll have a 3D model of yourself.

<figure>
  <img src="/images/meshroom0001.webp">
  <figcaption>Photo locations.</figcaption>
</figure>

<figure>
  <img src="/images/model0001.webp">
  <figcaption>A 3D model of myself.</figcaption>
</figure>

You can see the mesh by double clicking on the `MeshFiltering` node in the graph editor. Play around with the settings until you're happy with the result. `Keep Only The Largest Mesh` is usually a good starting point.

I highly recommend reading through the [Meshroom Beginner's Guide](https://meshroom-manual.readthedocs.io/en/latest/tutorials/sketchfab/sketchfab.html) to learn how it all works.

## Correcting the mesh

Depending on the quality of the photos you may end up with a mesh that needs correcting. I used [MeshLab](https://www.meshlab.net) to delete some of the smaller pieces and fill in some of the larger holes.

Lucky for me the pictures were great quality so I didn't have to play around much. I am by no means an expert at this so I did as little as possible. I even left a hole in the top of my head... But the slicer fixed it so it was all good.

<figure>
  <img src="/images/meshlab0001.webp">
  <figcaption>No brain in there.</figcaption>
</figure>

## Slicing the model

I used [Cura](https://ultimaker.com/software/ultimaker-cura) to slice the model. I set the extrusion width to 0.4mm and the layer height to 0.2mm. I also enabled supports and set the support angle to 60 degrees and blocked supports at the top of my head.

Support blockers can also be used to remove parts of the model itself.

<figure>
  <img src="/images/cura0001.webp">
  <figcaption>Cura support torture device.</figcaption>
</figure>

## The print!

I printed the model on my [Creality Ender 3 V3 SE](https://www.creality.com/products/creality-ender-3-v3-se) using PLA. You can see the final product below.

<figure>
  <img src="/images/print0001.webp">
  <figcaption>The print.</figcaption>
</figure>

## Closing

When I started this project I had zero knowledge of photogrammetry. But the process was so simple and the results were so good that I'm definitely spending the time to turn my entire family into Mount Rushmore.
