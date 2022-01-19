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
    await page.fill('#account-recovery-username', 'deming-qa@spacee.com');
    await page.click('.button.button-primary.button-wide.email-button.link-button');
    const text = await page.innerText('.okta-form-subtitle.o-form-explain');
    return text;
}

async function recoverySuccessUser (page){
    await recoverPassword(page);
    await page.fill('#account-recovery-username', 'deming-qa');
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

function generatePassword(){

}

async function checkEmail (page, BrowserContext) {
    
    await page.goto('https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1641837451&rver=7.0.6737.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26RpsCsrfState%3d61e2ded9-60dd-f037-d7e6-c2d906333845&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=90015');

    await page.click('[placeholder="Email, phone, or Skype"]');
    await page.fill('[placeholder="Email, phone, or Skype"]', 'felix@spacee.com');
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000002-0000-0ff1-ce00-000000000000&redirect_uri=https%3a%2f%2foutlook.office365.com%2fowa%2f&resource=00000002-0000-0ff1-ce00-000000000000&response_mode=form_post&response_type=code+id_token&scope=openid&msafed=1&msaredir=1&client-request-id=34e0372b-4cea-a598-579a-61f437b3ca7c&protectedtoken=true&claims=%7b%22id_token%22%3a%7b%22xms_cc%22%3a%7b%22values%22%3a%5b%22CP1%22%5d%7d%7d%7d&login_hint=felix%40spacee.com&nonce=637774343051320160.68185832-8fe1-4424-b9b9-9f1d1ef72a27&state=Dcs7EoAgDABR0PE4kfwg4TgwQmvp9U3xttucUjrDETJGkjUxMxUVrCSM1PBuTl5dGHwvAlVWmH126JseWtt4sOV4r_J-o_w' }*/),
        page.press('[placeholder="Email, phone, or Skype"]', 'Enter')
    ]);
    await page.fill('[placeholder="Password"]', 'Memet1when?');

    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://login.microsoftonline.com/common/login' }*/),
        page.click('input:has-text("Sign in")')
    ]);
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://outlook.office365.com/mail/' }*/),
        page.click('text=No')
    ]);

    await page.click('._3qXS6Uo8WFxax_lDWr_1a_ .NsB53xFTU532cgP0ztFSC');
    
    const [newPage] = await Promise.all([
        BrowserContext.waitForEvent('page'),
        await page.click('#x_reset-password-link')
    ])
    
  
    await newPage.click('[placeholder="New Password"]');
    await newPage.fill('[placeholder="New Password"]', 'NewPasswordTe$t123456789');
    await newPage.click('[placeholder="Confirm Password"]');
    await newPage.fill('[placeholder="Confirm Password"]', 'NewPasswordTe$t123456789');
    await newPage.click('text=Reset Password');

    const text = await newPage.innerText('.bx--inline-notification__subtitle');
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
    checkEmail
}