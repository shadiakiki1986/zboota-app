// http://simpleprogrammer.com/2014/02/03/selenium-with-node-js/

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;
 
var driver = new webdriver.Builder().
   forBrowser('firefox').
   build();

//var driver = new webdriver.Builder().
//   withCapabilities(webdriver.Capabilities.chrome()).
//   setChromeOptions({"binary_location": "/usr/bin/chromium-browser"}).
//   build();

driver.get('file:///home/shadi/Development/zboota-app/www/index.html');
//driver.findElement(By.name('q')).sendKeys('simple programmer');
//driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 10000);
//driver.quit();

