---
layout: post
title: "Install Prestashop"
excerpt: "A quick and easy to follow guide for installing PrestaShop in the cloud."
image: "images/ferdinand-stohr-197019.jpg"
imageattribution: "Ferdinand Stohr"
imageattributionlink: https://unsplash.com/@fellowferdi
tags:
  - guide
---


## Create AWS Instance

Go to the [AWS console](https://console.aws.amazon.com/) and log in to your account.

Navigate to the EC2 Dashboard for your desired region. e.g. [Sydney's EC2 Dashboard](https://ap-southeast-2.console.aws.amazon.com/ec2/v2/home?region=ap-southeast-2)

Select **Launch Instance**.

Select **Ubuntu 16.04 LTS**.

Choose an Instance Type.
You will require `t2.micro` or greater, as the `t2.nano` does not have enough memory for PrestaShop and MySQL.

**Next**, **Next**, **Next**, **Next**

Ensure access via HTTP is available in security group.

Select **Add Rule**, and choose `HTTP` from the `Type` dropdown.

**Review and Launch**, **Launch**

`ssh` to your machine.
Remember the default user for an Ubuntu machine is `ubuntu`.
[SSH instructions](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-connect-to-instance-linux) for the uninformed.

Everything from here on out is done from within the SSH session (except using your browser).

## Add PHP repository

We will use this later, but you save a bit of time doing it first.

```
sudo add-apt-repository ppa:ondrej/php
```

Update your repository cache.

```
sudo apt update
```

Optionally but recommended, update your system.
This will take a little while.

```
sudo apt upgrade -y
```

## Install Apache

```
sudo apt install -y apache2
```

Enable the rewrite mod. PrestaShop requries this.

```
sudo a2enmod rewrite
```

Restart apache. Get used to this command. You will see it a lot.

```
sudo service apache2 restart
```

Navigate to your server from your browser.
If you don't get an error page then everything is working!

`http://<server_ip>`

## Install MySQL

```
sudo apt install -y mysql-server php5.6-mysql
```

During the installation you will be asked for a password.
Provide a good password, not something like *P4ssw0rd!*.

Remove the example and insecure stuff that comes with the default installation.

```
sudo mysql_secure_installation
```

* Choose whether you want the password policy. `y/n`
* Do not update your root password, unless you want to.
* `y` to everything else.

## Install PHP

Install all the required PHP modules that PrestaShop doesn't tell you it needs.

```
sudo apt install -y php5.6 libapache2-mod-php5.6 php5.6-mcrypt php5.6-zip php5.6-xml php5.6-cli php5.6-curl php5.6-gd php5.6-intl
```

Edit the apache configuration to make php the first choice.

```
sudo nano /etc/apache2/mods-enabled/dir.conf
```

And edit line 2 to put `index.php` at the front of the list.
Note, this is the only bit in this process that I haven't scripted completely.
If someone want to fork this post with a `sed` command or similar I will merge it in here.

Restart apache.

```
sudo service apache2 restart
```

## Install PrestaShop

Navigate to the apache server directory.

```
cd /var/www/html
```

Download the PrestaShop files.

```
sudo wget https://download.prestashop.com/download/releases/prestashop_1.7.0.6.zip
```

Install unzip and then unzip it.

```
sudo apt install -y unzip
sudo unzip prestashop_1.7.0.6.zip
sudo rm prestashop_1.7.0.6.zip
```

Fix the permissions.

```
sudo chown -R www-data:www-data /var/www
sudo chmod -R 775 /var/www
```

Restart apache.

```
sudo service apache2 restart
```

Navigate to your server with your browser.
This will set up all the PrestaShop files for you and redirect you to the installation page.

`http://<server_ip>`

You should be redirected to the installation screen.
If not, navigate to the install screen with your browser.

`http://<server_ip>/install`

Follow the on screen prompts.

Once completed, clean up the install folder.

```
sudo rm -rf /var/www/html/install
```

**Done!**

## Closing

I hope this is useful for someone out there.

This took me much longer to install than it should have.
Now following this guide I can get a machine up and running in under 10 minutes.

If you want a scalable service, you can use an RDS instance for the database and point to that instead of the locally hosted one.
The clone your EC2 instances as desired.

Or if you are lazy you can scale vertically.
