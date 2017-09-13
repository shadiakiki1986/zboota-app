# zboota-app
Project home page: [here](http://shadiakiki1986.github.io/zboota-server/)


This is yet another application to help track traffic tickets you receive in [Lebanon](http://en.wikipedia.org/wiki/Lebanon).
Other apps are [here](https://play.google.com/store/apps/details?id=air.speedTicketLebanon),
[here](http://www.appszoom.com/android_applications/tools/lebanese-traffic-ticket_inbfc.html),
[here](https://play.google.com/store/apps/details?id=com.stround.lebanoncarfines),
[here](https://play.google.com/store/apps/details?id=com.tesladroid.lebanontickets),
and [here](https://play.google.com/store/apps/details?id=com.omr.zbt)

What sets this one apart is:
* It has
 * [ISF](http://www.isf.gov.lb/en/speedtickets)
 * [PML](http://www.parkmeterlebanon.com/statment_of_account.aspx)
 * [Mechanique](http://www.dawlati.gov.lb/en/mecanique)
* If you register your email and use it to log in, the server will email you the day after you receive a ticket
* You can monitor several cars at once
* <strike>It exposes a simple [API](http://genesis.akikieng.com/zboota-server/api/) that you can use to have the same table in Excel for example</strike>
 * Cancelled unless somebody explicitly requests so
* It's opensourced [here](https://github.com/shadiakiki1986/zboota-app)
* It's on
 * [Google Play](https://play.google.com/store/apps/details?id=com.akikieng.genesis.zbootaapp)
 * [Apple Store](https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=974745846&mt=8)
* You can use it in your [browser](http://shadiakiki1986.github.io/zboota-server/client/)
* The app has a [facebook page](http://www.facebook.com/yaza4) 

# Misc
* Author: Shadi Akiki ( shadiakiki1986 at gmail dot com )
* Licensed under WTFPL: http://www.wtfpl.net/
* Semantic versioning: http://semver.org/

# Under the hood
* PHP back-end: [zboota-server](https://github.com/shadiakiki1986/zboota-server)
* Nodejs API: [zboota-server-nodejs](https://github.com/shadiakiki1986/zboota-server-nodejs)
* Built with cordova, html, javascript, css, angular.js, moment.js, jquery.js, etc

# Dev notes
* This app is published via github pages
* Doing so is done by copying the contents of `www` to the `client` folder in the gh-pages branch of [zboota-server](https://github.com/shadiakiki1986/zboota-server)

# Usage
To install to a web server, just serve the folder `www`, e.g. `python -m SimpleHTTPServer 8001`

To upload the application to Google Play Store or Apple Store, run `make install` or any of the other Makefile targets

Check [Testing](TESTING.md)

To build the android app: `make androidAll` (or read the Makefile and run each step alone)

To build the ios app: `make iosAll` (or read the Makefile)
