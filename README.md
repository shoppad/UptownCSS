Uptown CSS
=====================
Uptown CSS is a semantic toolkit designed to help developers build fully-responsive apps for Shopify's eCommerce platform.

Getting Started
---------------------
Add the stylesheet to your project and begin writing the HTML for your app:
`<link rel="stylesheet" href="uptown.css">`

Documentation
---------------------
Visit http://www.uptowncss.com for complete documentation and examples

Contributing
---------------------
Fork the repo to you own account.

Use the gulp tasks to build scss.

```javascript
npm install
gulp
```

To rebuild the icons edit `./icons.json`, then run the gulp task

```javascript
gulp icons
```

By default, browser-specific CSS code for Edge references SVG versions of the icons hosted on cdn.uptowncss.com.  If you 
would like to load these locally, change the `$path` scss variable in `./styles/uptown.scss` and rebuild the css file.

To build a release:
1. Edit the version number in paackage.json
2. Run `gulp release`

Submit an issue and a PR!

Copyright & License
---------------------
Code and documentation copyright 2017 [ShopPad Inc.](http://www.theshoppad.com) Code released under the [MIT License](LICENSE).
