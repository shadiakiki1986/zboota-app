test:
	node tests/addEditTest.js
	node tests/loginInexistantTest.js
	node tests/newInvalidUserTest.js
	node tests/newValidUserTest.js
	node tests/addLoggedInTest.js
	node tests/addMechaniqueTest.js

androidAll: androidInstall androidPrepare androidBuild

androidInstall:
	bash scripts/install_android.sh

androidPrepare:
	cordova platform add android

androidBuild:
	bash scripts/buildAndroid.sh

iosAll: iosPrepare iosBuild

iosPrepare:
	npm install libxmljs
	cordova platform add ios
	echo "Now make iosBuild"

iosBuild:
	echo "Make sure to have run make iosPrepare"
	cordova build ios
	echo "Continue the build and submittal to Apple store via XCode"

install:
	bash scripts/install.sh
