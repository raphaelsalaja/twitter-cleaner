# twitter-cleaner

Simply put twitter-cleaner is a browser extension that allows you to clean up your Twitter feed by getting rid of unwanted replies on Twitter. Say goodbye to onlyfans links, engagement bait, and more.

## Installation

See the releases page at the side for the latest version of the extension. Download the zip file and extract it to a folder. Then, follow the instructions below to load the extension into your browser.

[![How To Install Extensions](https://img.youtube.com/vi/oswjtLwCUqg/maxresdefault.jpg)](https://www.youtube.com/watch?v=oswjtLwCUqg)

## Development

This extension is built using the Plasmo framework, a React-based framework for building browser extensions. To get started, clone this repository and install the dependencies:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

