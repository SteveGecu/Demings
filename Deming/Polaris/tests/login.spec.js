const { test, expect } = require('@playwright/test');
const login = require('../pages/login');

test.describe('login page', () => {

  test('shows up when navigating to Polaris for the first time', async ({ page }) => {

    await login.landingPage(page);
    await expect(page).toHaveURL('/login');
  
  })
  
  test('has username field', async ({ page }) => {
  
    await login.landingPage(page);
    const locator = page.locator('#okta-signin-username');
    await expect(locator).toHaveAttribute('type', 'text');
    
  })
  
  test('has password field', async ({ page }) => {
  
    await login.landingPage(page);
    const locator = page.locator('#okta-signin-password');
    await expect(locator).toHaveAttribute('type', 'password');
    
  })
  
  test('has "remember me" checkbox', async ({ page }) => {
  
    await login.landingPage(page);
    const locator = page.locator('#input42');
    await expect(locator).toHaveAttribute('type', 'checkbox');
    
  })
  
  test('has a "forgot your password" button', async ({ page }) => {
  
    const text = await login.forgotPassword(page);
    expect(text).toBe('Forgot Your Password');
    
  })
  
  test('has login button', async ({ page }) => {
  
    await login.landingPage(page);
    const locator = page.locator('#okta-signin-submit');
    await expect(locator).toHaveAttribute('type', 'submit');
    
  })
  
  test('has footer', async ({ page }) => {
  
    const text = await login.getFooterLogin(page);
    expect(text).toContain('Powered by');
    
  })

})
  
test.describe('forgot password reset page', () => {

  /*test('forgot your password button takes to reset page', async ({ page }) => {
  
    await login.recoverPassword(page);
    const locator = page.locator('#account-recovery-username');
    await expect(locator).toHaveAttribute('type', 'text');
    
  })*/
  
  test('has email field', async ({ page }) => {
  
    await login.recoverPassword(page);
    const locator = page.locator('#account-recovery-username');
    await expect(locator).toHaveAttribute('type', 'text');
    
  })
  
  test('has "send link" button', async ({ page }) => {
  
    const text = await login.sendLink(page);
    expect(text).toBe('Send Link');
    
  })
  
  test('has a "back to sign in" button that takes you back to login page', async ({ page }) => {
  
    await login.backToLogin(page);
    const locator = page.locator('#okta-signin-submit');
    await expect(locator).toHaveAttribute('type', 'submit');
    
  })
  
  
  test('has footer', async ({ page }) => {
  
    const text = await login.getFooterReset(page);
    expect(text).toContain('Powered by');
    
  })
  
  test('shows success message when resetting password with valid email', async ({ page }) => {
  
    const text = await login.recoverySuccessEmail(page);
    expect(text).toContain('Email has been sent');
    
  })
  
  test('shows success message when resetting password with valid username', async ({ page }) => {
  
    const text = await login.recoverySuccessUser(page);
    expect(text).toContain('Email has been sent');
    
  })
})

test.skip('click email reset password button', async ({ context:BrowserContext }) => {
  
  const page = await BrowserContext.newPage();

  await login.recoverySuccessEmail(page);
  const text = await login.checkEmail(page, BrowserContext);
  expect(text).toBe('Password reset successful.');

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