// Test new user

var webdriver = require('selenium-webdriver'),// https://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebDriver.html
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
  should = require("should"); // https://github.com/tj/should.js
hf=require("./helperFunctions");


var driver = new webdriver.Builder().
   forBrowser('firefox').
   build();

driver.manage().timeouts().setScriptTimeout(10000); // http://stackoverflow.com/a/11701802
driver.get('file://'+__dirname+'/../www/index.html');
// sleep 5 secs while connection is established .. this was made for android which was crashing if app didn't wait for a bit before connecting
driver.sleep(15000);

//---------------------------------------
// new valid
// https://blog.tompawlak.org/generate-random-values-nodejs-javascript
var uuid = require('node-uuid');
var newEmail = "test-"+uuid.v4()+"@hotmail.com";
console.log('test new email', newEmail);
hf.newUser(driver,By,newEmail);
driver.sleep(5000);

driver.switchTo().alert().getText().then(function(x) {
  x.should.equal("Please check your email in a few minutes (including possibly the junk mail folder) and log into the app using the random password in the email.");
});
driver.sleep(500);
driver.switchTo().alert().dismiss();
//driver.findElement(By.id("loginCloseBtn")).click();
hf.elementHidden(driver,By,"loginModal");
driver.sleep(1000);

//---------------------------------------
// new already registered
hf.newUser(driver,By,newEmail,true);
driver.sleep(1000);

driver.switchTo().alert().getText().then(function(x) {
  x.should.equal("Zboota new account error: Email address already registered.");
});
driver.sleep(500);
driver.switchTo().alert().dismiss();
//driver.findElement(By.id("loginCloseBtn")).click();
hf.elementHidden(driver,By,"loginModal");

//---------------------------------------
// done
driver.sleep(1000);
driver.quit();
