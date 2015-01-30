#!/bin/bash
# To download zboota-app and build the mobile app
# sudo su
# curl -sL https://raw.githubusercontent.com/shadiakiki1986/zboota-app/master/build.sh | bash -
#
# Notes:
# 1. This isn't functional yet I think
# 2. Update the android sdk version number later
# 3. Manually update which SDK API versions to download for android update sdk command

set -e

# install prerequisites, except node.js
sudo apt-get install curl npm openjdk-7-jdk ant gcc-multilib lib32z1 lib32stdc++6

# install node.js
curl -sL https://deb.nodesource.com/setup | bash - 
apt-get install -y nodejs

# install cordova
npm install -g cordova

# install android sdk
# Reference: http://sblackwell.com/blog/2014/06/installing-the-android-sdk-on-a-headless-server/
wget http://dl.google.com/android/android-sdk_r24.0.2-linux.tgz
tar -xzf android-sdk_r24.0.2-linux.tgz
echo "export ANDROID_HOME=/home/ubuntu/android-sdk-linux" >> ~/.bash_profile
echo "export PATH=\$PATH:\$ANDROID_HOME/tools" >> ~/.bash_profile
echo "export PATH=\$PATH:\$ANDROID_HOME/platform-tools" >> ~/.bash_profile
source ~/.bash_profile
android list sdk # install api in android sdk
android update sdk --no-ui --filter 1,2,4

# download zboota-app
sudo apt-get install git
git clone https://github.com/shadiakiki1986/zboota-app.git

# build for android
cd zboota-app
cordova platform add android
cordova build android --release # this generates an unsigned version

echo "-------------------------------------------"
echo "Completed building. Please sign using below"
echo ""
echo "keytool -v -genkey -v -keystore zboota-app.keystore -alias \"zboota-app\" -keyalg RSA -validity 10000"
echo "jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/zboota-app.keystore ~/zboota-app/platforms/android/ant-build/CordovaApp-release-unsigned.apk zboota-app"
echo "jarsigner -verify -verbose -certs ~/zboota-app/platforms/android/ant-build/CordovaApp-release-unsigned.apk"
echo "$ANDROID_HOME/build-tools/21.1.2/zipalign -v 4 ~/zboota-app/platforms/android/ant-build/CordovaApp-release-unsigned.apk ~/zboota-app-release-signed.apk"
echo ""
echo "After which app would be available in ~/zboota-app-release-signed.apk"
echo "and you could upload it to Google play at https://play.google.com/apps/publish/"
