// Copied from
// https://www.npmjs.com/package/selenium-webdriver
// and modified to work
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

// headless firefox
// https://mykzilla.org/2017/08/30/headless-firefox-in-node-js-with-selenium-webdriver/
const firefox = require('selenium-webdriver/firefox');
webdriver.promise.USE_PROMISE_MANAGER = false;
const binary = new firefox.Binary();
binary.addArguments("--headless");

var driver = new webdriver.Builder()
    .forBrowser('phantomjs')
//    .forBrowser('firefox')
//    .setFirefoxOptions(new firefox.Options().setBinary(binary))
    .build();


function doSearch() {
  // http://stackoverflow.com/a/11701802
  //driver.manage().timeouts().setScriptTimeout(30000);

  // core testing
  return driver.get('http://www.google.com/ncr')
    .then(_ => driver.getTitle())
    .then(Title => {
      console.log("Page Title is",Title);
      return driver.findElement(By.name('q')).sendKeys('webdriver',webdriver.Key.RETURN);
    })
    .then(_ => {
      console.log('wait title');
      return driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    })
    .then(_ => {
      return driver.findElement(By.xpath("//title"))
        .getAttribute('innerHTML');
    })
    .then(html => {
      console.log('title html',html);
    })
    .then(_ => driver.quit());
}

Promise.all([
  doSearch(),
]).then(_ => {
  console.log('Success!');
}, err => {
  console.error('An error occured! ' + err);
  setTimeout(() => {throw err}, 0);
});
