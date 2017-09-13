// https://www.npmjs.com/package/selenium-webdriver
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

/*
// headless firefox
// https://mykzilla.org/2017/08/30/headless-firefox-in-node-js-with-selenium-webdriver/
const firefox = require('selenium-webdriver/firefox');
webdriver.promise.USE_PROMISE_MANAGER = false;
const binary = new firefox.Binary();
binary.addArguments("--headless");
*/
var driver = new webdriver.Builder()
//    .forBrowser('phantomjs')
    .forBrowser('firefox')
//    .setFirefoxOptions(new firefox.Options().setBinary(binary))
    .build();

// http://stackoverflow.com/a/11701802
driver.manage().timeouts().setScriptTimeout(30000);

// core testing
driver.get('http://www.google.com/ncr');
driver.getTitle().then(function(Title) {
  console.log("Page Title is",Title);
});
//driver.findElement(By.name('q')).sendKeys('webdriver');
//driver.findElement(By.name('btnG')).click();
//driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();
