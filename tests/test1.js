var webdriver = require('selenium-webdriver'),// http://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebDriver.html
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
  should = require("should"); // https://github.com/tj/should.js


var driver = new webdriver.Builder().
   forBrowser('firefox').
   build();

//--------------------------------------
// Helper function
btnEnabled=function(id) {
	return driver
		.findElement(By.id(id))
		.getAttribute("disabled")
		.then(function(x) {
			(x === null).should.be.true;
		});
}
btnDisabled=function(id) {
	return driver
		.findElement(By.id(id))
		.getAttribute("disabled")
		.then(function(x) {
			x.should.equal('true');
		});
}
elementHidden=function(id) {
return driver.findElement(By.id(id)).isDisplayed().then(function(x) { x.should.not.be.true; });
}
elementDisplayed=function(id) {
return driver.findElement(By.id(id)).isDisplayed().then(function(x) { x.should.be.true; });
}

//--------------------------------------
driver.manage().timeouts().setScriptTimeout(5000); // http://stackoverflow.com/a/11701802
driver.get('file://'+__dirname+'/../www/index.html');
driver.executeScript("localStorage.clear()"); // http://www.mkyong.com/selenium/how-to-execute-javascript-in-selenium-webdriver/

driver.sleep(1000);
driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[1]"))
	.getInnerHtml()
	.then(function(x) { x.should.equal("No cars added"); });

//--------------------------------
// Test: Launch/Online
elementHidden('addModal');
btnEnabled('addShowBtn');
btnEnabled('existingUserBtn');
btnEnabled('newUserBtn');

//--------------------------------
// Test add a car
driver.findElement(By.id('addShowBtn')).click();
driver.sleep(1000);
elementDisplayed('addModal');
btnDisabled('addSaveBtn');
btnDisabled('delBtn');

addC_a=driver.findElement(By.id('addC_a'));
addC_a.click();
// Oddly, the find/click didn't work, but the sendkeys below solved it
//option=addC_a.findElement(By.css("option[label='B']"));
//option.click();
addC_a.sendKeys(webdriver.Key.DOWN);
addC_a.sendKeys(webdriver.Key.ENTER);
btnDisabled('addSaveBtn');

driver.findElement(By.id('addC_n')).sendKeys('123');
btnDisabled('addSaveBtn');

driver.findElement(By.id('addC_l')).sendKeys('test');
btnEnabled('addSaveBtn');

driver.findElement(By.id('addSaveBtn')).click();
elementHidden('addModal');

// This is for with photo
//driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[1]/div/div[1]/div[1]"))
//	.getInnerHtml()
//	.then(function(x) { x.should.equal("test"); });

// since no photo
driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[1]/span[1]"))
	.getInnerHtml()
	.then(function(x) { x.should.equal("test"); });

//--------------------------------
// Test edit a car/label
driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[3]/button")).click();
driver.sleep(1000);
elementDisplayed('addModal');
btnEnabled('addSaveBtn');
btnEnabled('delBtn');
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
	.then(function(x) { x.should.equal("test"); });

driver.findElement(By.id('addC_l')).sendKeys('2');
driver.findElement(By.id('addSaveBtn')).click();
elementHidden('addModal');
driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[1]/span[1]"))
	.getInnerHtml()
	.then(function(x) { x.should.equal("test2"); });


//-------------------------------
//var start = new Date().getTime();
//driver.executeAsyncScript('window.setTimeout(arguments[arguments.length - 1], 1000);'); // http://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebDriver.html

driver.sleep(5000);
//driver.wait(until.titleIs('webdriver - Google Search'), 5000);
//driver.quit();

