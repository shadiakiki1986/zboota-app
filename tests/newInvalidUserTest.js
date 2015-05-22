// Test new user

var webdriver = require('selenium-webdriver'),// https://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebDriver.html
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
  should = require("should"); // https://github.com/tj/should.js
hf=require("./helperFunctions");


var driver = new webdriver.Builder().
   forBrowser('firefox').
   build();

driver.manage().timeouts().setScriptTimeout(5000); // http://stackoverflow.com/a/11701802
driver.get('file://'+__dirname+'/../www/index.html');
driver.sleep(2000);

// new invalid
hf.newUser(driver,By,"blabla");
driver.sleep(1000);

driver.switchTo().alert().getText().then(function(x) { x.should.equal("Zboota new account error: Invalid email blabla."); });
driver.switchTo().alert().dismiss();
//driver.findElement(By.id("loginCloseBtn")).click();
hf.elementHidden(driver,By,"loginModal");

// done
driver.sleep(1000);

