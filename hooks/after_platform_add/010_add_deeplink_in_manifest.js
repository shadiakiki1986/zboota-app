#!/usr/bin/env node
// Notes from: https://github.com/driftyco/ionic-app-base/tree/master/hooks
// remember to chmod +x this file
// the script will be run from the project's root dir
// npm install libxmljs
 
var libxmljs = require('libxmljs');
var fs = require('fs');

var filename="platforms/android/AndroidManifest.xml";
  fs.readFile(filename, {encoding:'utf8',flag:'r'}, function (err, contents) {
    if (err) {
      console.error('error reading file', filename + ':', err);
      return -1;
    }

    var xmlDoc1 = libxmljs.parseXmlString(contents);

x=xmlDoc1.get("//manifest/application/activity");

if(x==undefined) { console.error("couldn't find activity tag"); return -1; }

	filename="010_add_deeplink_in_manifest.xml";
	  fs.readFile(filename, function (err, contents) {
	    if (err) {
	      console.error('error reading file', filename + ':', err);
	      return -1;
	    }

    var xmlDoc2 = libxmljs.parseXmlString(contents).root();

x.addChild(xmlDoc2); 

fs.writeFile('platforms/android/AndroidManifest.xml', xmlDoc1, function (err) {
  if (err) throw err;
  console.log('Updated android manifest with deeplink intent!');
});

  });
});
