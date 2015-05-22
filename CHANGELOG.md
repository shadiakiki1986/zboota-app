I''m tring to follow Semantic Versioning 2.0.0
http://semver.org/

# 1.2.3
2015-05-22
* More complete automated testing
* makefile
* re-ordering files

2015-05-21
* first draft of automated testing .. hooray!

2015-05-20
* struggled to get automated web gui testing
* finally resolved it with selenium-webdriver + firefox + not headless

2015-05-18
* get function made parallel
 * in UI showing each car''s get status separately
* erased the "clear" lines (already commented out)
* addCore was overwriting the isf, pml, dm fields
* upon login, emitting the "loggedIn" event
 * also, running get AFTER successful update IF needed

# 1.2.2
2015-05-15
* loading uploaded photos for logged in users
* uploading photo only for logged in users
* jquery ajax converted to angular http for a few cases (the ones with more than one variable update or with function calls)
* added photos while offline are uploaded along with new data when gone online
* New button was being enabled while logging in .. fixed
* blinking up arrow blinks while uploading photos
* ping server: added timeout of 5 seconds, and Connecting message
* added pingServer to all error cases
 * also added max ping safety limit
 * with force=true for Try Again
* DEL button disabled for new cars
* retested all app
* data sources were wrongly placed outside of container
* no need to get on first login
* dropped unnecessary imgprvw.src from adding image
* added redundant image upload/download when adding new image after displaying locally
 * even though this works on the browser
 * it doesn''t on my tablet, so this is for that
 * the same is done with the thumbnail in the main list
  * in case it''s the dataurl of the original, overwrite with dataurl from server
* addCore: reordering code a bit
* editing image and/or removing an image was not really working..fixed

2015-05-13
* moved "Uploading image" to next to save, del
* working on loading uploaded photo

2015-05-12
* photo gets uploaded to server (on top of being stored locally)

2015-05-11
* getHeader and login upon serveravailable event instead of document load
* alert of server unavalailable replaced with a 2nd danger header message
* image saved locally
* also improved design to accomodate for image

2015-05-10
* added photo, still needs some work

# 1.2.1
version bump for ios

# 1.2.0
2015-05-07
* added edit button
* aesthetics
* highlight if mechanique in current month or if servers were not available
* support for header
* moved delete button inside of edit
* replaced blinking animation wtih gif

2015-05-06
* added mechanique on server and supporting it in app
* replaced some text with glyphicons
* added highlighting of invalid mechanique result

# 1.1.9
* blinking down/up arrows were not working. Fixed
* added red background when data date != today
* upgraded to using bootstrap 3.3.4
* fixed muted class to be text-muted

# 1.1.8
* added top margin to avoid overlap with battery indicator on ios
* saved on some horizontal space
* some aesthetics on iOS
* removed the disclaimer from the app and small improvements to readme

# 1.1.7
* repackage for ios

# 1.1.5
* New email registration does not require clicking on confirmation code anymore
* Password is given to user by server in email

# 1.1.4
* 2015-02-12: had wrong deeplink... testing correct one

# 1.1.3
* 2015-02-11: added deeplinking

# V1.1.2
* 2015-02-09: adding forgot password button

# V1.0
2015-01-30
* moving client out of zboota-server into separate repo and building app
* I''m starting off with 1.0 since I had already progressed with the app in zboota-server repo
