// http://simpleprogrammer.com/2014/02/03/selenium-with-node-js/

"use strict";
var webdriver = require('selenium-webdriver');
 
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

driver.get('http://www.google.com');
driver.findElement(webdriver.By.name('q')).sendKeys('simple programmer');
driver.findElement(webdriver.By.name('btnG')).click();
driver.quit();

