#!/bin/bash

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

# to use chrome
# do I need this? sudo apt-get install chromium-chromedriver
wget http://chromedriver.storage.googleapis.com/2.32/chromedriver_linux64.zip -O - | unzip 
sudo ln -s $PWD/chromedriver /usr/bin/

