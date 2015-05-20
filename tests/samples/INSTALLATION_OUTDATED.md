# Automated testing
## Prerequisites
Since my app is html+javascript, I decided to got with node for the testing also


Install node and npm
* sudo apt-get install nodejs npm

Configure npm such that we can run npm install -g FOO without sudo
* http://stackoverflow.com/questions/18212175/npm-yeoman-install-generator-angular-without-sudo/18277225#18277225
* http://stackoverflow.com/a/21712034
* npm config set prefix '~/.npm'
 * after checking that ~/.npm exists
* append to ~/.bash_profile
 * export PATH="$PATH:$HOME/.npm/bin"
 * not to ~/.bashrc because it doesn''t get loaded upon ssh

## selenium-webdriver + firefox (not headless)
This would test the app in firefox. The limitation is that it doesn''t include native app platform testing, which will be with appium below

I had a lot of trouble to get this working: http://selenium.googlecode.com/git/docs/api/javascript/index.html


```
npm install selenium-webdriver
wget http://chromedriver.storage.googleapis.com/2.15/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
http://chromedriver.storage.googleapis.com/2.15/chromedriver_win32.zip
```

## Testing with Appium
This seems to be the way to go for android/ios testing. I haven''t had success with this yet.


Install appium
* http://appium.io/
```
> npm install -g appium  # get appium (WITHOUT SUDO)
> npm install wd         # get appium client
npm install chai # https://www.npmjs.com/package/chai
npm install chai-as-promised # https://www.npmjs.com/package/chai-as-promised

> node your-appium-test.js
```

