//global-setup.js
const { chromium } = require('@playwright/test');

module.exports = async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    await page.goto('https://polaris-ui.deming.qa.eastus2.spacee.io/login');

    await page.click('input[name="username"]');
    await page.fill('input[name="username"]', 'felix@spacee.com');

    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', 'Testingis4we$0m3');
    
    // Click text=Login
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://polaris-ui.azurewebsites.net/test' }*/),
        page.click('text=Login')
    ]);
    
    // Save storage state into the file.
    await page.context().storageState({ path: 'polaris.json' });    
    await browser.close();
}
