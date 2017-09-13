// Helper function
var self = this;
module.exports = {
	btnEnabled:function(driver,By,id) {
		return driver
			.findElement(By.id(id))
			.getAttribute("disabled")
			.then(function(x) {
				(x === null).should.be.true;
			});
	},
	btnDisabled:function(driver,By,id) {
		return driver
			.findElement(By.id(id))
			.getAttribute("disabled")
			.then(function(x) {
				x.should.equal('true');
			});
	},
	elementHidden:function(driver,By,id) {
		return driver.findElement(By.id(id)).isDisplayed().then(function(x) { x.should.not.be.true; });
	},
	elementDisplayed:function(driver,By,id) {
		return driver.findElement(By.id(id)).isDisplayed().then(function(x) { x.should.be.true; });
	},
	addCar:function(driver,By,webdriver) {
		driver.findElement(By.id('addShowBtn')).click();
		driver.sleep(500);
		hf.elementDisplayed(driver,By,'addModal');
		hf.btnDisabled(driver,By,'addSaveBtn');
		hf.btnDisabled(driver,By,'delBtn');

		addC_a=driver.findElement(By.id('addC_a'));
		addC_a.click();
		// Oddly, the find/click didn't work, but the sendkeys below solved it
		//option=addC_a.findElement(By.css("option[label='B']"));
		//option.click();
		addC_a.sendKeys(webdriver.Key.DOWN);
		addC_a.sendKeys(webdriver.Key.ENTER);
		hf.btnDisabled(driver,By,'addSaveBtn');

		driver.findElement(By.id('addC_n')).sendKeys('123');
		hf.btnDisabled(driver,By,'addSaveBtn');

		driver.findElement(By.id('addC_l')).sendKeys('test');
		hf.btnEnabled(driver,By,'addSaveBtn');

		driver.findElement(By.id('addSaveBtn')).click();
		hf.elementHidden(driver,By,'addModal');
	},
	carAdded:function(driver,By) {
		// This is for with photo
		//driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[1]/div/div[1]/div[1]"))
		//	.getInnerHtml()
		//	.then(function(x) { x.should.equal("test"); });

		// since no photo
		driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[1]/span[1]"))
			.getText()
			.then(function(x) { x.should.equal("test"); });
		driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[1]/span[2]"))
			.getText()
			.then(function(x) { x.should.equal("B   123"); });
	},
	login:function(driver,By,onlyConfirm) {
		if(!onlyConfirm) onlyConfirm=false;

    testUser = "shadiakiki1986@yahoo.com";
		testPass="xmkke";
    this.login2(
      driver,
      By,
      { "user":testUser,
        "pass":testPass },
      onlyConfirm
    );
    driver.sleep(3000);
    this.elementHidden(driver,By,"loginModal");
	},
	login2: function(driver,By,args,onlyConfirm) {
		if(!onlyConfirm) onlyConfirm=false;

		this.elementHidden(driver,By,'server-unavailable');
    //driver.getPageSource().then(_ => console.log(_));

		driver.findElement(By.id("existingUserBtn")).click(); 
		this.elementDisplayed(driver,By,"loginModal");
		this.btnDisabled(driver,By,'loginBtn');
		this.elementHidden(driver,By,'createBtn');

		if(!onlyConfirm) {
			this.btnDisabled(driver,By,'forgotBtn');
			driver.findElement(By.id("loginU_email")).sendKeys(args.user);
		} else {
			this.btnEnabled(driver,By,'forgotBtn');
			driver.findElement(By.id("loginU_email")).getAttribute("value").then(function(x) {
				x.should.equal(args.user);
			});
		}
		this.btnDisabled(driver,By,'loginBtn');
		this.btnEnabled(driver,By,'forgotBtn');

		driver.findElement(By.id("loginU_pass")).then(function(x) {
			x.sendKeys(args.pass);
		});
		this.btnEnabled(driver,By,'loginBtn');
		this.btnEnabled(driver,By,'forgotBtn');

		driver.findElement(By.id("loginBtn")).click();
	},
	isLoggedIn:function(driver,By) {
		this.btnEnabled(driver,By,'refreshBtn');
		this.elementDisplayed(driver,By,'logoutBtn');
		this.btnEnabled(driver,By,'logoutBtn');
		this.elementHidden(driver,By,'existingUserBtn');
		this.elementHidden(driver,By,'newUserBtn');
	},
	noCars:function(driver,By) {
		return driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[1]/td[1]"))
      .getAttribute('innerHTML')
      .then(v =>  v.should.equal("No cars added"));
	},
	noHeaderError:function(driver,By) {
		driver.findElement(By.xpath("//div[contains(@class,'container')]/div[3]/div"))
			.getText()
			.then(function(x) { x.trim().should.equal(""); });
	},
	newUser:function(driver,By,uname,onlyConfirm) {
		if(!onlyConfirm) onlyConfirm=false;

		driver.findElement(By.id("newUserBtn")).click();
		this.elementDisplayed(driver,By,"loginModal");
		this.elementHidden(driver,By,'loginBtn');
		this.elementDisplayed(driver,By,'createBtn');
		this.elementHidden(driver,By,'forgotBtn');
		this.elementHidden(driver,By,'loginU_pass');
		if(!onlyConfirm) {
			this.btnDisabled(driver,By,'createBtn');
			driver.findElement(By.id("loginU_email")).sendKeys(uname);
		} else {
			this.btnEnabled(driver,By,'createBtn');
			driver.findElement(By.id("loginU_email")).getAttribute("value").then(function(x) { x.should.equal(uname); });
		}
		this.btnEnabled(driver,By,'createBtn');
		driver.findElement(By.id("createBtn")).click();
	},
	addCarWithMechanique:function(driver,By,webdriver) {
		driver.findElement(By.id('addShowBtn')).click();
		driver.sleep(500);

		addC_a=driver.findElement(By.id('addC_a'));
		addC_a.click();
		addC_a.sendKeys(webdriver.Key.DOWN);
		addC_a.sendKeys(webdriver.Key.ENTER);

		driver.findElement(By.id('addC_n')).sendKeys('123');
		driver.findElement(By.id('addC_l')).sendKeys('test');

		addC_hp=driver.findElement(By.id('addC_hp'));
		addC_hp.click();
		addC_hp.sendKeys(webdriver.Key.DOWN);
		addC_hp.sendKeys(webdriver.Key.DOWN);
		addC_hp.sendKeys(webdriver.Key.ENTER);

		addC_y=driver.findElement(By.id('addC_y'));
		addC_y.click();
		addC_y.sendKeys(webdriver.Key.DOWN);
		addC_y.sendKeys(webdriver.Key.DOWN);
		addC_y.sendKeys(webdriver.Key.ENTER);

		addC_t=driver.findElement(By.id('addC_t'));
		addC_t.click();
		addC_t.sendKeys(webdriver.Key.DOWN);
		addC_t.sendKeys(webdriver.Key.DOWN);
		addC_t.sendKeys(webdriver.Key.ENTER);

		driver.findElement(By.id('addSaveBtn')).click();
	},
	carWithMechaniqueAdded:function(driver,By) {
		// since no photo
		driver.findElement(By.xpath("//table[@id='mytable']/tbody[2]/tr[2]/td[1]/small"))
			.getText()
			.then(function(x) {
        v1 = "Mechanique: There are no results matching the specifications you\'ve entered...";
        v2 = "Mechanique: Not available";
        (x==v1 || x==v2).should.be.true();
      });
	}
};
