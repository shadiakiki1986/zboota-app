The testing of the app is covered by the steps below.

Automated testing using selenium is marked with a check.

Please make sure to have followed the installation by ''make install''

To test with firefox (check note below that this doesnt work with firefox 55 ATM)
```
# https://www.npmjs.com/package/webdriver-manager
sudo npm install -g webdriver-manager
sudo webdriver-manager update

# for firefox
sudo ln -s /usr/local/lib/node_modules/webdriver-manager/selenium/geckodriver-v0.18.0 /usr/bin/geckodriver
```

To test with phantomjs
```

# download/install phantomjs
#   http://phantomjs.org/download.html
# since firefox 55 onwards is not compatible with selenium
#   https://seleniumhq.wordpress.com/2017/08/09/firefox-55-and-selenium-ide/
wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 -O - | tar -xjf - -C .
sudo ln -s $PWD/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/bin/
```

Run the tests with `SELENIUM_BROWSER=chrome make test`
- note that only the following tests pass on phantomjs:
  - `tests/addEditTest.js`
  - `phantomjs` requires Launch webdriver: `webdriver-manager start`
    - am i sure? 
- the rest only pass on chrome
- firefox 55 onwards does not work with selenium
- NOTE that headless testing on AWS EC2 doesn't work
  - (not sure if because of closed ports or firefox headless or phantomjs)


# Preparation
## Local storage
* [x] open www/index.html in firefox on my local machine
 * I''m currently at firefox version 35.0
* [ ] open the developer console
* [x] run localStorage.clear()
* [ ] refresh

# Launch
## Offline
* disconnect my network interface
* refresh
 * [ ] expect header message that server is unavailable
 * [ ] expect refresh button, existing user button, new user button to be disabled
 * [ ] expect "+" button to still be enabled
* [ ] click Try again
 * [ ] expect button to get disabled for a brief moment then re-enabled
 * [ ] expect header message to still be there
* [ ] reconnect my network interface
* [ ] click Try again
 * [ ] expect button to get disabled for a brief moment then header message to disappear

## Online
* [x] add modal is hidden
* [x] Existing and New user buttons are enabled
* [x] "+" button enabled

# Add
* [x] click on "+"
 * [x] expect add car module to show up
 * [x] expect "Add" button to be disabled
 * [x] expect "Del" button to be disabled
* [x] enter a random car number, area code, and description
 * [x] expect "Add" button to get enabled only after the number, code, and description are all in
* [x] click "Add"
 * [x] expect car add module to disappear
 * [x] expect new car label to show up in list
 * [x] expect new car area/number to show up in list

# Edit
## Change label
* [x] click "Edit" button
 * [x] expect car add module to show up
 * [x] expect it to be already populated with the car''s info just added
 * [x] expect "Del" button to be enabled
 * [x] expect "Save" instead of "Add"
 * [x] expect "Save" button to be enabled
* [x] change the label to something else
* [x] click "Save"
 * [x] expect new label to show up in list
 * [x] expect car number and area code to still be the same

## Change number or area
* [x] click "Edit" button
 * [x] expect car add module to show up already populated with the car''s info just added
 * [x] expect "Del" button to be enabled
 * [x] expect "Save" instead of "Add"
 * [x] expect "Save" button to be enabled
* [x] change the number and/or area to something else
* [x] click "Save"
 * [x] expect entry to show up with old label
 * [x] expect entry to show up with new number and area
 * [x] expect no entry with old number and area

# Working offline
* [ ] Add, edit tests above should also work while offline

# Registered user
## Log in for inexistant
* [x] click Existing user
 * [x] expect loginModal to show up
 * [x] expect login button to be disabled
 * [x] expect forgot password button to be disabled
 * [x] expect no button "create" to be shown
* [x] enter whatever
 * [x] expect forgot password button to get enabled
 * [x] expect login button to still be disabled
* [x] enter any password
 * [x] expect login button to get enabled
* [x] click on login
 * [x] expect "email not registered" error message
* [x] dismiss alert by clicking ok
 * [x] expect loginModal to be hidden now

## New invalid
* [x] click New user
 * [x] expect loginModal to show
* [x] enter "blablabla"
* [x] click Create
 * [x] expect an alert saying "invalid email"
* [x] dismiss alert
 * [x] expect loginModal to be hidden now

## New valid
### start
* [x] delete shadi_akiki_1986@hotmail.com from zboota-users
 * by using the deleteTestAccount.php api hook
 * http://genesis.akikieng.com/zboota-server/api/deleteTestUser.php
* [x] enter shadi_akiki_1986@hotmail.com
* [x] click Create
 * [x] expect an alert saying that the email has been sent
* [x] dismiss alert

### already registered
* [x] click New user
 * [x] expect shadi_akiki_1986@hotmail.com to still be filled in
* [x] click Create
 * [x] expect an alert saying that the email is already registered
* [x] dismiss alert

### Login for new
* [x] copy the password from the registration email
* [x] click Existing user
 * [x] expect my username is still there
* [x] enter my password
* [x] click login
 * [x] expect login modal to disappear
 * [x] expect the refresh button to be disabled
 * [x] expect log out button to be shown and enabled
 * [x] epect existing user and new user buttons to be hidden

# add while logged in
* [x] click on "+"
* [x] enter random car info without mechanique without photo
* [x] click on "Save"
* [x] clear localstorage
* [x] refresh
* [x] click on existing
* [x] enter shadi_akiki_1986@hotmail.com and password
* [x] click on login
 * [x] expect car to show up
* [x] refresh
 * [x] expect to be automatically logged in
 * [x] expect car to show up

# add mechanique
* [x] same as ''add while logged in'' but with mechanique info
 * [x] expect message about mechanique to show up

# add photo
* [x] same as ''add mechanique'' but with photo
 * [x] expect photo to show up in cars list
