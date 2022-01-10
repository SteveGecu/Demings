const { test, expect } = require('@playwright/test');
const login = require('../pages/login');

test.describe('Login credentials tests', () => {

  test('Polaris forwards to login page', async ({ page }) => {

    await login.landingPage(page);
    await expect(page).toHaveURL('/login');
  
  })
  
  test('login page has username field', async ({ page }) => {
  
    await login.landingPage(page);
    const locator = page.locator('#okta-signin-username');
    await expect(locator).toHaveAttribute('type', 'text');
    
  })
  
  test('login page has password field', async ({ page }) => {
  
    await login.landingPage(page);
    const locator = page.locator('#okta-signin-password');
    await expect(locator).toHaveAttribute('type', 'password');
    
  })
  
  test('login page has remember me checkbox', async ({ page }) => {
  
    await login.landingPage(page);
    const locator = page.locator('#input42');
    await expect(locator).toHaveAttribute('type', 'checkbox');
    
  })
  
  test('login page has a forgot your password button', async ({ page }) => {
  
    const text = await login.forgotPassword(page);
    expect(text).toBe('Forgot Your Password');
    
  })
  
  test('login page has login button', async ({ page }) => {
  
    await login.landingPage(page);
    const locator = page.locator('#okta-signin-submit');
    await expect(locator).toHaveAttribute('type', 'submit');
    
  })
  
  test('login page has footer', async ({ page }) => {
  
    const text = await login.getFooterLogin(page);
    expect(text).toContain('Powered by');
    
  })
  
  test('forgot your password button takes to reset page', async ({ page }) => {
  
    await login.recoverPassword(page);
    const locator = page.locator('#account-recovery-username');
    await expect(locator).toHaveAttribute('type', 'text');
    
  })
  
  /*test('reset page has email field', async ({ page }) => {
  
    await login.recoverPassword(page);
    const locator = page.locator('#account-recovery-username');
    await expect(locator).toHaveAttribute('type', 'text');
    
  })*/
  
  test('reset page has send link button', async ({ page }) => {
  
    const text = await login.sendLink(page);
    expect(text).toBe('Send Link');
    
  })
  
  test('back to sign in button takes reset page back to login page', async ({ page }) => {
  
    await login.backToLogin(page);
    const locator = page.locator('#okta-signin-submit');
    await expect(locator).toHaveAttribute('type', 'submit');
    
  })
  
  
  test('reset page has footer', async ({ page }) => {
  
    const text = await login.getFooterReset(page);
    expect(text).toContain('Powered by');
    
  })
  
  test('success message when resetting password with email', async ({ page }) => {
  
    const text = await login.recoverySuccessEmail(page);
    expect(text).toContain('Email has been sent');
    
  })
  
  test('success message when resetting password with username', async ({ page }) => {
  
    const text = await login.recoverySuccessUser(page);
    expect(text).toContain('Email has been sent');
    
  })
  

})


//////////////////////////////////////////////////////////
test.describe('cookies saved test', () => {

  test.use({ storageState: 'polaris.json' });
  test('login authentication', async ({ page }) => {
  
    const text = await login.loginAuthentication(page);
    expect(text).toContain('Welcome back');

  });
})

test('invalid credentials should throw error', async ({ page }) => {

  const text = await login.invalidCreds(page);
  expect(text).toBe('Authentication failed');

});