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
driver.sleep(5000); // sleep 5 secs while connection is established .. this was made for android which was crashing if app didn't wait for a bit before connecting

driver.executeScript("localStorage.clear()"); // http://www.mkyong.com/selenium/how-to-execute-javascript-in-selenium-webdriver/

driver.sleep(1000);
hf.noCars(driver,By);

//--------------------------------
// Test: Launch/Online
hf.elementHidden(driver,By,'addModal');
hf.btnEnabled(driver,By,'addShowBtn');
hf.btnEnabled(driver,By,'existingUserBtn');
hf.btnEnabled(driver,By,'newUserBtn');

//--------------------------------
// Test add a car
hf.addCar(driver,By,webdriver);

// since no photo
hf.carAdded(driver,By);
driver.sleep(2000);
hf.noHeaderError(driver,By);

//--------------------------------
// Test edit a car
testEdit=function(xx) {
	driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[3]/button")).click();
	driver.sleep(1000);
	hf.elementDisplayed(driver,By,'addModal');
	hf.btnEnabled(driver,By,'addSaveBtn');
	hf.btnEnabled(driver,By,'delBtn');
	driver.findElement(By.id("addSaveBtn"))
		.getText()
		.then(function(x) { x.should.equal("  Save"); });

	addC_a.findElement(By.css("option[label='B']"))
		.isSelected()
		.then(function(x) { x.should.be.true; });
	driver.findElement(By.id("addC_n"))
		.getAttribute("value")
		.then(function(x) { x.should.equal("123"); });
	driver.findElement(By.id("addC_l"))
		.getAttribute("value")
		.then(function(x) { x.should.equal(xx.addC_l2); });

	driver.findElement(By.id(xx.sendKeys)).sendKeys(xx.sendKeys2);
	driver.findElement(By.id('addSaveBtn')).click();
	hf.elementHidden(driver,By,'addModal');
	driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[1]/span[1]"))
		.getText()
		.then(function(x) { x.should.equal("test2"); });
	driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[1]/span[2]"))
		.getText()
		.then(function(x) { x.should.equal(xx.df2); });

	// below xpath can be tested on live html in firefox developer inspection console
	// http://stackoverflow.com/a/14284815
	// function getElementByXpath(path) {
	//  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	// }
	// console.log( getElementByXpath("//html[1]/body[1]/div[1]") );
	driver.isElementPresent(By.xpath("//table[@id='mytable']/tbody[tr[1]/td[1]/span/text()='"+xx.df2Old+"']"))
		.then(function(x) {
			x.should.not.be.true;
		});
}

// Test edit a car: label
testEdit({"addC_l2":"test" ,"sendKeys":"addC_l","sendKeys2":"2"  ,"df2":"B   123"   ,"df2Old":"test"})
// Test edit a car: number and area
testEdit({"addC_l2":"test2","sendKeys":"addC_n","sendKeys2":"123","df2":"B   123123","df2Old":"B \u00a0 123"}) // \u00a0 is for &nbsp; https://code.google.com/p/selenium/issues/detail?id=1366


//-------------------------------
//var start = new Date().getTime();
//driver.executeAsyncScript('window.setTimeout(arguments[arguments.length - 1], 1000);'); // http://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebDriver.html

driver.sleep(1000);
//driver.wait(until.titleIs('webdriver - Google Search'), 5000);
//driver.quit();

