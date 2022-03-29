# Fullpage Snapshot Tool (PDF)

## Usage
1. 🧱 Run `yarn` to install the required dependencies
1. 📃 Change the `PAGE_URL` variable at the top of the `script.mjs` file to the desired webpage
1. ⚙️ [Configure](#configuration) any necessary settings
1. 👉 Run `node script.mjs` (after you `cd` into this folder)
1. 💰 Profit (find the snapshot at */snapshot.pdf*)

## Configuration
There are 4 possible configuration variables at the top of the file.
```js
const PAGE_URL = 'https://bauschandlomb.steadfa.st?token=password'
const DEFAULT_WIDTH = 1440
const DEFAULT_HEIGHT = 1000
const HEADLESS_MODE = true
```

### Page URL *(string)*
This is the page that we will take a snapshot of

### Default Width *(number)*
This is the width (in pixels) that the page will be rendered at in the browser. If you want to create a mobile version, you can set this to 400 ()

### Default Height *(number)*
This is the width in height that the page will **initally** be rendered at. **But**, the tool will automatically resize the page's width to fit the whole page if possible, so this option doesn't really do much.

### Headless Mode *(boolean)*
**Default: true**

You can set this to `true` if you want to actually *see* the browser instance used to generate the snapshot. Mostly helpful for debugging purposes.

## Under the hood
- We're using [Puppeteer](https://github.com/puppeteer/puppeteer) for this, which is a Chromium simulator. It is essentially an instance of Chromium, and gives you an API to make that Chromium browser do things. So, we're creating a browser instance, navigating to a page, resizing the browser window to fit all of the page content, and then taking a screenshot.
- We're using `jsPDF` to create a PDF based on the screenshot that we get from Puppeteer
