#!/bin/bash
# This script will require a key to sign the app
# To generate key for this app for google play
# keytool -v -genkey -v -keystore zboota-app.keystore -alias \"zboota-app\" -keyalg RSA -validity 10000

set -e

baseFn="/home/ubuntu/Development/"

cordova build android --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $baseFn/zboota-app.keystore $baseFn/zboota-app/platforms/android/ant-build/CordovaApp-release-unsigned.apk zboota-app
jarsigner -verify -verbose -certs $baseFn/zboota-app/platforms/android/ant-build/CordovaApp-release-unsigned.apk
fn=$baseFn/zboota-app-release-signed.apk
if [ -f $fn ]
then
	rm -i $fn
fi
$ANDROID_HOME/build-tools/21.1.2/zipalign -v 4 $baseFn/zboota-app/platforms/android/ant-build/CordovaApp-release-unsigned.apk $baseFn/zboota-app-release-signed.apk


echo "Completed build app for android"
echo "Version: "
$ANDROID_HOME/build-tools/21.1.2/aapt dump badging $baseFn/zboota-app-release-signed.apk |head -n 1
echo "App is now available in $baseFn/zboota-app-release-signed.apk"
echo "and you could upload it to Google play at https://play.google.com/apps/publish/"
