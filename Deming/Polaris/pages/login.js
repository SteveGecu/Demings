async function landingPage (page){
    await page.goto('');
}

async function forgotPassword (page){
    await landingPage(page);
    const text = await page.innerText('.link.js-forgot-password');
    return text;
}

async function recoverPassword (page){
    await landingPage(page);
    await page.click('.link.help.js-help')
    await page.click('.link.js-forgot-password');
}

async function sendLink (page){
    await recoverPassword(page);
    const text = await page.innerText('.button.button-primary.button-wide.email-button.link-button');
    return text;
}

async function backToLogin(page) {
    await recoverPassword(page);
    await page.click('.link.help.js-back');
}

async function getFooterLogin (page){
    await landingPage(page);
    const text = await page.innerText('.footer-text');
    return text;
}

async function getFooterReset (page){
    await recoverPassword(page);
    const text = await page.innerText('.footer-text');
    return text;
}

async function recoverySuccessEmail (page){
    await recoverPassword(page);
    await page.fill('#account-recovery-username', 'felix@spacee.com');
    await page.click('.button.button-primary.button-wide.email-button.link-button');
    const text = await page.innerText('.okta-form-subtitle.o-form-explain');
    return text;
}

async function recoverySuccessUser (page){
    await recoverPassword(page);
    await page.fill('#account-recovery-username', 'felix');
    await page.click('.button.button-primary.button-wide.email-button.link-button');
    const text = await page.innerText('.okta-form-subtitle.o-form-explain');
    return text;
}

async function loginAuthentication (page) {
    await page.goto('/test')
    const text = await page.innerText('.login-container');
    return text;
};

async function invalidCreds (page) {
  await landingPage(page);

  await page.click('[aria-label=""]');
  await page.fill('[aria-label=""]', 'randomemail');

  await page.click('input[name="password"]');
  await page.fill('input[name="password"]', 'randompassword');

  await page.click('text=Login');

  const text = await page.innerText('.o-form-error-container.o-form-has-errors')
  return text;
}

module.exports = {
    landingPage,
    forgotPassword,
    recoverPassword,
    sendLink,
    backToLogin,
    getFooterLogin,
    getFooterReset,
    recoverySuccessEmail,
    recoverySuccessUser,
    loginAuthentication,
    invalidCreds,
}