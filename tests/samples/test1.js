// https://github.com/admc/wd/blob/master/examples/async/firefox.js
// with help from http://simpleprogrammer.com/2014/02/03/selenium-with-node-js/
//
// node test1.js

"use strict";
require('colors');
var wd=require("wd");
var chai = require("chai");
var should = chai.should();

var browser = wd.remote();

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


browser.init({browserName:'firefox'}, function() {
browser.get("http://admc.io/wd/test-pages/guinea-pig.html", function() {
browser.title(function(err, title) {
console.log(title,err);
title.should.include('WD');
browser.elementById('i am a link', function(err, el) {
browser.clickElement(el, function() {
/* jshint evil: true */
browser.eval("window.location.href", function(err, href) {
href.should.include('guinea-pig2');
browser.quit();
});
});
});
});
});
});
