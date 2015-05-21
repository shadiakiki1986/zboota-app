I still perform the testing of the app manually.

Automated testing using selenium is work-in-progress. Install node, npm, ... as below
```
sudo apt-get install nodejs npm       # required ubuntu installations
npm install selenium-webdriver should # required node packages
node tests/test1.js                   # run tests
```

Here are the steps I follow for my manual testing. The marks are what I have automated thus far

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
 * [ ] expect new car area/number to show up in list

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
 * [ ] expect car number and area code to still be the same

## Change number or area
* [ ] click "Edit" button
 * [ ] expect car add module to show up already populated with the car''s info just added
 * [ ] expect "Del" button to be enabled
 * [ ] expect "Save" instead of "Add"
* [ ] change the number and/or area to something else
* [ ] click "Save"
 * [ ] expect entry to show up with correct number and area

# Working offline
* [ ] Add, edit tests above should also work while offline

# New user
* [ ] go to my aws console
* [ ] open dynamodb us-west-2
* [ ] delete shadiakiki1986@hotmail.com from zboota-users table
* [ ] click Existing user
* [ ] enter shadiakiki1986@hotmail.com with any password
 * [ ] expect "email not registered" error message
* [ ] click ok
* [ ] close Existing user modal
* [ ] click New user
* [ ] enter "blablabla"
* [ ] click Create
 * [ ] expect an alert saying "invalid email"
* [ ] dismiss alert
* [ ] enter shadiakiki1986@hotmail.com
* [ ] click Create
 * [ ] expect an alert saying that the email has been sent
* [ ] dismiss alert
* [ ] click New user
* [ ] enter shadiakiki1986@hotmail.com
* [ ] click Create
 * [ ] expect an alert saying that the email is already registered
* [ ] dismiss alert
* [ ] go to my hotmail inbox
 * [ ] expect a new registration email
* [ ] copy the password from the registration email
* [ ] go back to www/index.html
* [ ] click Existing user
 * [ ] expect my email is still there
* [ ] enter my password
* [ ] click login
 * [ ] expect login modal to disappear
 * [ ] expect the refresh button to be disabled
* [ ] click on "+"


