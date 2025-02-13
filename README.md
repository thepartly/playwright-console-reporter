# Playwright Console Reporter

Console reporter for Playwright. This custom playwright reporter captures test results and transforms them into formatted reports, enabling deeper insights into the test suite's performance.


## Installation

To use this reporter, install it via npm:

```sh
npm install @playwright-console-reporter --save-dev
```

## Usage

To integrate the console reporter into your Playwright test configuration, modify your `playwright.config.ts file` as follows:

```typescript
// Ansure you have @playwright/test installed
import { PlaywrightTestConfig } from '@playwright/test';  

let reporters: PlaywrightTestConfig['reporter'] = [
  ['junit', { outputFile: 'build/results.xml' }],
  ['html', { outputFolder: 'build/html-report', open: 'never' }],
  ['list']
];

// Add the console reporter
reporters.push(['@playwright-console-reporter', {}]);

const config: PlaywrightTestConfig = {
  reporter: reporters,
  // other Playwright configurations...
};

export default config;

```
