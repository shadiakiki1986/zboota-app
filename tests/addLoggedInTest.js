// log in and add a car, then log out, delete the car, log in, car must re-appear

var webdriver = require('selenium-webdriver'),// https://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebDriver.html
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
  should = require("should"); // https://github.com/tj/should.js
hf=require("./helperFunctions");


var driver = new webdriver.Builder().
//  forBrowser('chrome').
  build();

var url = 'file://'+__dirname+'/../www/index.html';
function doTests() {
  return driver
    // http://stackoverflow.com/a/11701802
//    .manage().timeouts().setScriptTimeout(5000)
    // sleep X secs while connection is established .. this was made for android which was crashing if app didn't wait for a bit before connecting
    .then(_ => driver.get(url) )
    .then(_ => driver.sleep(10000) )
    .then(_ => {
      // login
      hf.login(driver,By);
      driver.sleep(3000);

      // add car
      hf.addCar(driver,By,webdriver);
      driver.sleep(3000);

      // clear and refresh
      driver.executeScript("localStorage.clear()"); // http://www.mkyong.com/selenium/how-to-execute-javascript-in-selenium-webdriver/
      driver.get(url);
      driver.sleep(5000); // sleep 5 secs while connection is established .. this was made for android which was crashing if app didn't wait for a bit before connecting
      driver.sleep(1000);
      hf.noCars(driver,By);

      // re-login
      hf.login(driver,By);
      driver.sleep(3000);

      // check that car is automatically added from server
      hf.carAdded(driver,By);
      driver.sleep(3000);

      // refresh
      driver.get(url);
      driver.sleep(5000); // sleep 5 secs while connection is established .. this was made for android which was crashing if app didn't wait for a bit before connecting
      driver.sleep(3000);

      // check that automatically logged in
      hf.isLoggedIn(driver,By);
      // check that car already there
      hf.carAdded(driver,By);

      //---------------------------------------
      // done
      driver.sleep(1000);
      driver.quit();
    });
}

Promise.all([
  doTests(),
]).then(_ => {
  console.log('Success!');
}, err => {
  console.error('An error occured! ' + err);
  setTimeout(() => {throw err}, 0);
});
