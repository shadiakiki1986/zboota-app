#!/bin/bash
# download zboota-app
# sudo apt-get install git
# git clone https://github.com/shadiakiki1986/zboota-app.git
# cd zboota-app
# make install
#
# Notes:
# 1. This isn't functional yet I think
# 2. Update the android sdk version number later
# 3. Manually update which SDK API versions to download for android update sdk command
#
# Can I download and install straight from the web?
#* To download zboota-app and build the mobile app
#* sudo su
#* curl -sL https://raw.githubusercontent.com/shadiakiki1986/zboota-app/master/scripts/build.sh | bash -

set -e

# install prerequisites, except node.js
sudo apt-get install curl npm openjdk-9-jdk ant gcc-multilib lib32z1 lib32stdc++6

# install node.js
if [ -z `which node` ]
then
	curl -sL https://deb.nodesource.com/setup | bash - 
	apt-get install -y nodejs
else
	echo "Nodejs is already installed at `which node`. Not installing"
fi

# install cordova
npm install -g cordova libxmljs fs

# install android sdk
# Reference: http://sblackwell.com/blog/2014/06/installing-the-android-sdk-on-a-headless-server/
if [ -z ANDROID_HOME ]
then
	wget http://dl.google.com/android/android-sdk_r24.0.2-linux.tgz -o $HOME/android-sdk_r24.0.2-linux.tgz
	cd $HOME
	tar -xzf android-sdk_r24.0.2-linux.tgz
	echo "export ANDROID_HOME=/home/ubuntu/android-sdk-linux" >> ~/.bash_profile
	echo "export PATH=\$PATH:\$ANDROID_HOME/tools" >> ~/.bash_profile
	echo "export PATH=\$PATH:\$ANDROID_HOME/platform-tools" >> ~/.bash_profile
	source ~/.bash_profile
	android list sdk # install api in android sdk
	android update sdk --no-ui --filter 1,2,4
	cd -
else
	echo "Android SDK already installed at $ANDROID_HOME, not installing"
fi

# for testing
npm install selenium-webdriver should # required node packages


