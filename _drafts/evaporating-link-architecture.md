---
layout: post
title: "Evaporating.Link Architecture"
excerpt: "Architecture behind the temporary files sharing service."
image: "images/james-sutton-191331.jpg"
imageattribution: "James Sutton"
imageattributionlink: https://unsplash.com/@jamessutton_photography
tags:
  - project
  - architecture
---

# Evaporating.Link

[Evaporating.Link](http://evaporating.link) is a simple file sharing service hosted in the cloud.

If you missed the first post about Evaporating.Link, you can [read the summary here]({{ site.url }}/2017/03/08/evaporating-link.html).

## Architecture Overview

This project utilises some key features of AWS in order to provide a cheap and scalable fully managed service.

<figure>
  <img src="/images/cloudcraft-evaporating-link.jpg">
  <figcaption>Evaporating.Link architecture created on <a href="https://cloudcraft.co/" title="Cloudcraft">Cloudcraft</a>.</figcaption>
</figure>

That's it.

The minimal architecture reflects the minimal UI design, minimal technology stack and minimal capabilities.

If you have been following my projects you'll notice the design for Evaporating.Link will be similar to other websites I've created.
A lot of the usual cruft has been removed for the sake of simplicity and cost.

## Hosting - Amazon S3

Amazon's [Simple Service Storage (S3)](https://aws.amazon.com/s3/) is the perfect candidate for hosting a static website in the AWS cloud.

I've covered it [in detail here]({{ site.url }}/2017/02/20/jekyll-site.html#storage---s3) so won't rehash the benefits again.

It's worth noting here that without a Cloudfront distribution in front of S3 the website will be vulnerable to [S3 failures]({{ site.url }}/2017/03/01/aws-s3-failure.html).
Due to the dependency on S3 for uploads, a primary use of the site, the Evaporating.Link will be severely debilitated regardless of whether Cloudfront is added.

### Lifecycle Policy

A lifecycle policy can be added to an S3 bucket to enable some automated actions on stored objects.

The lifecycle policy on the Evaporating.Link bucket is the means for automated file deletion.

```
{
    "Rules": [
        {
            "ID": "evaporate",
            "Prefix": "evaporating/",
            "Status": "Enabled",
            "Expiration": {
                "Days": 1
            }
        }
    ]
}
```

In AWS terms, Evaporating.Link the lifecycle policy is responsible for *expiring* files over 1 day old that are stored with the prefix `evaporating/`.
As versioning is not enabled on this bucket, this tell AWS to delete all files that are older than 1 day.

### Bucket Policy

The bucket policy is as follows:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::evaporating.link/*"
        }
    ]
}
```

This allows read access to all files stored in the bucket.
This is requried to enable unauthenticated users access to the website itself and user uploaded files.

### Cross Origin Resource Sharing

[Cross Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) is the bain of my existence.

I've grappled with this in many projects and integration with the AWS environment (looking at you API gateway) has been redumentary until very recently.

The CORS configuration on the S3 bucket is as follows:

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>http://evaporating.link</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

This restricts the ability to upload files to the evaporating.link domain and as an extra level of security restricts the ability to use the `DELETE` HTTP verb.

## Authentication and Authorisation - Google, Amazon IAM and Cognito

Unlike previous projects, such as [Cat Facts]({{ site.url }}/catfacts.html), Evaporating.Link requires authentication to use the service.

Authentication is provided via Google OAuth, which is automatically verified by Cognito providing an authentication token to access Amazon resources.

### Google OAuth

OAuth and in particular [Google OAuth](https://developers.google.com/identity/protocols/OAuth2) provides an incredibly simple way to authenticate users.

Rather than rolling your own user management system, which can be complicated and error prone, the service is offloaded to another.

Google was chosen over Facebook and other providers as it is ubiquitous and offers simplistic implementation.
The implemenation is a simple button which prompts the user to log in and provide Evaporating.Link access if required.
If the user is already signed in and has already provided Evaporating.Link access, the log in process will be automated and the user doesn't need to click anything.
That's really nice.

More information can be found in my code write up, will I'll link here when available.

### Amazon Cognito

Once the user has authenticated via Google, a request is sent to [AWS Cognito](https://aws.amazon.com/cognito/).

Cognito checks the supplied Google authentication token with the Google backend to ensure the authentication was successful.
Another token is sent back to the user, which provides access to an AWS role configured in AWS IAM.

Cognito can integrate with many different OAuth providers without duplicating implementation details.
This is handy if you want to provide multiple authentication options, instead of limiting to just Google like Evaporating.Link.

### Amazon IAM

Authorisation is provided through an [Amazon Identity and Access Management](https://aws.amazon.com/iam/) role.

This [role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) contains a [policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) which enables a user to upload to S3.

The policy document is as follows:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1488761483000",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl*",
                "s3:PutObjectVersionAcl*"
            ],
            "Resource": [
                "arn:aws:s3:::evaporating.link/evaporating",
                "arn:aws:s3:::evaporating.link/evaporating/*"
            ]
        }
    ]
}
```

This policy allows `PUT` access to the `evaporating` *folder*, which is where uploaded files are stored.

It's interesting to note that the policy also allows a user to change the [Access Control List (ACL)](http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html).
This is required in order to change the storage option of the object the reduced redundancy.
[Reduced Redundancy](https://aws.amazon.com/s3/reduced-redundancy/) is a cost saving strategy when you are less concerned about losing files.
As Evaporating.Link is all about losing files, this was an obvious choice.

## Enhancements

### Cloudfront

Cloudfront will enable the entire site to be served over HTTPS via SSL.
While it is preferable to serve the entire site over HTTPS, the cost is high for little benefit.
Currently, all javascript interactions, including uploads and downloads, are over SSL.
There will be more information about this in a follow up post about the code for Evaporating.Link which I'll link here when it's written.
If I hear enough complaints or discussion on the topic, I'll consider changing this.

Cloudfront will cache files at locations closer to users than delivering straight from an S3 bucket.
This will provide a noticable improvement for large files.
Due to the minimalistic nature of Evaporating.Link, there are no large files stored in S3, and so this benefit would not be realised.
Any large file that is stored by a user will not be subject to the benefits of this caching as per below.

As the intention of this site is to provide files that disappear after a short amount of time, adding Cloudfront will require some careful rules around how caching is managed.
Adding any level of caching can cause a file to be available for longer than the intended period.
This is undesirable for user uploaded content.
Additionally, when caching is disabled Cloudfront will request the file from S3 on each request, effectively doubling the file transfer costs.

These are the primary reasons that Cloudfront is not enabled for Evaporating.Link

### Lambda

The S3 lifecycle policy strategy taken here was a lazy approach.
While the intention is to keep a file around for 24 hours and no more, Amazon makes no gaurantees about how often a lifecycle policy will be run.
This has caused issues where a file is available longer than it should be.
I've been careful not to specify an exact amount of time that a file will be available for to compensate for this architectural flaw.

Lambda is capable of being run on a cron-like schedule with a granularity up to 15 minutes.
This would increase the level of certainty that a file will be retained for the expected period and no more than 15 minutes longer.
Scheduling a task like this is a trivial improvement, and comes at a negligible cost.
The reason for not using Lambda was purely due to a desire to trial the lifecycle policy offering.

## Closing

Evaporating.Link fits a niche use case and is provided absolutely free of charge, while costing essentially nothing.

Simple services like this highlight the power of cloud enabled services and in this case the capabilities provided by AWS.
