#!/bin/bash

set -e

cordova build android --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/zboota-app.keystore ~/zboota-app/platforms/android/ant-build/CordovaApp-release-unsigned.apk zboota-app
jarsigner -verify -verbose -certs ~/zboota-app/platforms/android/ant-build/CordovaApp-release-unsigned.apk
fn=~/zboota-app-release-signed.apk
if [ -f $fn ]
then
	rm -i $fn
fi
$ANDROID_HOME/build-tools/21.1.2/zipalign -v 4 ~/zboota-app/platforms/android/ant-build/CordovaApp-release-unsigned.apk ~/zboota-app-release-signed.apk


echo "Completed build app for android"
echo "Version: "
$ANDROID_HOME/build-tools/21.1.2/aapt dump badging ~/zboota-app-release-signed.apk |head -n 1
echo "App is now available in ~/zboota-app-release-signed.apk"
echo "and you could upload it to Google play at https://play.google.com/apps/publish/"
