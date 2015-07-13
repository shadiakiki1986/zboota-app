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
driver.sleep(5000); // sleep 5 secs while connection is established .. this was made for android which was crashing if app didn't wait for a bit before connecting
driver.sleep(2000);

//---------------------------------------
// prepare
driver.executeAsyncScript(function() {
  var callback = arguments[arguments.length - 1];
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status==200) {
      callback(xhr.responseText);
    }
  }
  xhr.open("GET", "http://genesis.akikieng.com/zboota-server/api/testUserDelete.php"+"?timestamp=" + new Date().getTime());
  xhr.send();
}).then(function(str) {
//  driver.sleep(5000);
//console.log(str);
  ["Deleted","Inexistant"].should.matchAny(str);
});

//---------------------------------------
// new valid
hf.newUser(driver,By,"shadi_akiki_1986@hotmail.com");
driver.sleep(500);

driver.switchTo().alert().getText().then(function(x) { x.should.equal("Please check your email in a few minutes (including possibly the junk mail folder) and log into the app using the random password in the email."); });
driver.sleep(500);
driver.switchTo().alert().dismiss();
//driver.findElement(By.id("loginCloseBtn")).click();
hf.elementHidden(driver,By,"loginModal");
driver.sleep(1000);

//---------------------------------------
// new already registered
hf.newUser(driver,By,"shadi_akiki_1986@hotmail.com",true);
driver.sleep(500);

driver.switchTo().alert().getText().then(function(x) { x.should.equal("Zboota new account error: Email address already registered."); });
driver.sleep(500);
driver.switchTo().alert().dismiss();
//driver.findElement(By.id("loginCloseBtn")).click();
hf.elementHidden(driver,By,"loginModal");

//-------------------------------
// login with newly created account
hf.login(driver,By,true);
driver.sleep(1000);
hf.isLoggedIn(driver,By);

//---------------------------------------
// done
driver.sleep(1000);

