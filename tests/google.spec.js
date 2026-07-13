import {test,expect} from '@playwright/test';

test('Open Google',async({page})=>{
    await page.goto('https://www.google.com/');
    // to wait for 2 seconds
    await page.waitForTimeout(2000);
    // to reload the page like refresh the page
    await page.reload();
    await page.waitForTimeout(2000);
    // to get title of page
    let title = await page.title();
    console.log(title);
    // to get url of page
    let url = await page.url();
    console.log(url);
    // to get content of page , HTML code of page
    let content = await page.content();
    console.log(content.length);
    await page.waitForTimeout(2000);
    // to click on search bar
    await page.click('textarea[name="q"]');
    await page.waitForTimeout(2000);
    // to type in search bar
    await page.fill('textarea[name="q"]',"playwright")
    await page.waitForTimeout(2000);
    // to press enter key in keyboard
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
});