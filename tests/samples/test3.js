// From first example on https://www.npmjs.com/package/wd

"use strict";
require('colors');
var wd=require("wd");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var browser = wd.remote();

// https://github.com/admc/wd/blob/master/examples/async/firefox.js
// optional extra logging
browser.on('status', function(info) {
console.log(info.cyan);
});
browser.on('command', function(eventType, command, response) {
console.log(' > ' + eventType.cyan, command, (response || '').grey);
});
browser.on('http', function(meth, path, data) {
console.log(' > ' + meth.magenta, path, (data || '').grey);
});



browser = wd.promiseChainRemote();
browser
  .init({browserName:'firefox'})
//  .get("../www/index.html")
  .get("file:///home/ubuntu/zboota-app/www/index.html")
  .title()
    .should.become('WD Tests')
  .elementById('i am a link')
  .click()
  .eval("window.location.href")
    .should.eventually.include('guinea-pig2')
  .back()
  .elementByCss('#comments').type('Bonjour!')
  .getValue().should.become('Bonjour!')
  .fin(function() { return browser.quit(); })
  .done();

