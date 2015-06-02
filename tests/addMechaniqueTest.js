var webdriver = require('selenium-webdriver'),// https://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebDriver.html
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
  should = require("should"); // https://github.com/tj/should.js
hf=require("./helperFunctions");

var driver = new webdriver.Builder().
   forBrowser('firefox').
   build();

//--------------------------------------
driver.manage().timeouts().setScriptTimeout(5000); // http://stackoverflow.com/a/11701802
driver.get('file://'+__dirname+'/../www/index.html');
driver.executeScript("localStorage.clear()"); // http://www.mkyong.com/selenium/how-to-execute-javascript-in-selenium-webdriver/

driver.sleep(1000);

//--------------------------------
hf.noCars(driver,By);
hf.login(driver,By);
driver.sleep(3000);
hf.addCarWithMechanique(driver,By,webdriver);
hf.carWithMechaniqueAdded(driver,By);

driver.sleep(1000);
