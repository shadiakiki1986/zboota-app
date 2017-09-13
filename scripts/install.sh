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
sudo apt-get install curl openjdk-9-jdk

# install node.js
if [ -z `which node` ]
then
	curl -sL https://deb.nodesource.com/setup_6.x | sudo bash - 
	sudo apt-get install -y nodejs
  nodejs --version # v6.11.3
  npm --version # 5.3.0
  sudo npm i -g npm
  npm --version # 5.4.1
else
	echo "Nodejs is already installed at `which node`. Not installing"
fi

# for testing
npm install selenium-webdriver should # required node packages

# https://www.npmjs.com/package/webdriver-manager
sudo npm install -g webdriver-manager
sudo webdriver-manager update

# for firefox
sudo ln -s /usr/local/lib/node_modules/webdriver-manager/selenium/geckodriver-v0.18.0 /usr/bin/geckodriver

# to use chrome
# do I need this? sudo apt-get install chromium-chromedriver
wget http://chromedriver.storage.googleapis.com/2.32/chromedriver_linux64.zip -O - | unzip 
sudo ln -s $PWD/chromedriver /usr/bin/

# download/install phantomjs
#   http://phantomjs.org/download.html
# since firefox 55 onwards is not compatible with selenium
#   https://seleniumhq.wordpress.com/2017/08/09/firefox-55-and-selenium-ide/
wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 -O - | tar -xjf - -C .
sudo ln -s $PWD/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/bin/
