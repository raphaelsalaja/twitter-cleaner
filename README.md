# twitter-cleaner

Simply put twitter-cleaner is a browser extension that allows you to clean up your Twitter feed by getting rid of unwanted replies on Twitter. Say goodbye to onlyfans links, engagement bait, and more.

## Installation

See the releases page at the side for the latest version of the extension. Download the zip file and extract it to a folder. Then, follow the instructions below to load the extension into your browser.
 
https://github.com/rafunderscore/twitter-cleaner/assets/52125687/3adcd468-f71b-4127-8a37-68f344737420

## Development

This extension is built using the Plasmo framework, a React-based framework for building browser extensions. To get started, clone this repository and install the dependencies:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

For further guidance, [Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Contributions

This project is a not as optimised as it can be and there is alot of room for improvement and quality of life feautures. Feel free to make any changes or updates as you feel and don't be afraid to send pull requests.
