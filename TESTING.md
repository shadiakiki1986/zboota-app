I still perform the testing of the app manually.

Automated testing using appium is work-in-progress. Please check my notes on this at the bottom of this page

Here are the steps I follow for my manual testing

# Preparation
* go to my aws console
* open dynamodb us-west-2
* delete shadiakiki1986@hotmail.com from zboota-users table
* open www/index.html in firefox on my local machine
 * I''m currently at firefox version 35.0
* open the developer console
* run localStorage.clear()
* refresh

# Server unavailable
* disconnect my network interface
* refresh
 * expect header message that server is unavailable
 * expect refresh button, existing user button, new user button to be disabled
 * expect "+" button to still be enabled

# Working offline
## Add
* click on "+"
 * expect add car module to show up
 * expect "Del" and "Add" button to be disabled
* enter a random car number, area code, and description
 * expect "Add" button to get enabled only after the number, code, and description are all in
* click "Add"
 * expect car add module to disappear
 * expect new car to show up in list

## Edit
* click "Edit" button
 * expect car add module to show up already populated with the car''s info just added
 * expect "Del" button to be enabled
 * expect "Save" instead of "Add"
* change the label to something else
* click "Save"
 * expect new label to show up in list
 * expect car number and area code to still be the same

## Edit and change label
* click "Edit" button
 * expect car add module to show up already populated with the car''s info just added
 * expect "Del" button to be enabled
 * expect "Save" instead of "Add"
* change the label to something else
* click "Save"
 * expect new label to show up in list
 * expect car number and area code to still be the same

## Edit and change number or area
* click "Edit" button
 * expect car add module to show up already populated with the car''s info just added
 * expect "Del" button to be enabled
 * expect "Save" instead of "Add"
* change the number and/or area to something else
* click "Save"
 * expect entry to show up with correct number and area


* click Try again
 * expect button to get disabled for a brief moment then re-enabled
 * expect header message to still be there
* reconnect my network interface
* go to my www/index.html tab
* go to my www/index.html tab
* click Existing user
* enter shadiakiki1986@hotmail.com with any password
 * expect "email not registered" error message
* click ok
* close Existing user modal
* click New user
* enter "blablabla"
* click Create
 * expect an alert saying "invalid email"
* dismiss alert
* enter shadiakiki1986@hotmail.com
* click Create
 * expect an alert saying that the email has been sent
* dismiss alert
* go to my hotmail inbox
 * expect a new registration email
* copy the password from the registration email
* go back to www/index.html
* click Existing user
 * expect my email is still there
* enter my password
* click login
 * expect login modal to disappear
 * expect the refresh button to be disabled
* click on "+"

# Automated testing
Install node and npm
* sudo apt-get install nodejs npm

Configure npm such that we can run npm install -g FOO without sudo
* http://stackoverflow.com/questions/18212175/npm-yeoman-install-generator-angular-without-sudo/18277225#18277225
* http://stackoverflow.com/a/21712034
* npm config set prefix '~/.npm' 
 * after checking that ~/.npm exists
* append to ~/.bash_profile
 * export PATH="$PATH:$HOME/.npm/bin"
 * not to ~/.bashrc because it doesn''t get loaded upon ssh

## Testing on chrome
```
npm install selenium-webdriver
wget http://chromedriver.storage.googleapis.com/2.15/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
sudo mv chromedriver /usr/local/bin
sudo apt-get install google-chrome
sudo apt-get install chromium-browser chromium-chromedriver
sudo apt-get install xvfb # http://www.installationpage.com/selenium/how-to-run-selenium-headless-firefox-in-ubuntu/
```

## Appium
Install appium
* http://appium.io/
```
> npm install -g appium  # get appium (WITHOUT SUDO)
> npm install wd         # get appium client
npm install chai # https://www.npmjs.com/package/chai
npm install chai-as-promised # https://www.npmjs.com/package/chai-as-promised

> node your-appium-test.js
```