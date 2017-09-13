#!/bin/bash
# Notes:
# Manually update which SDK API versions to download for android update sdk command
set -e

# install prerequisites, except node.js
sudo apt-get install ant gcc-multilib lib32z1 lib32stdc++6

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

# install cordova
npm install -g cordova libxmljs fs

