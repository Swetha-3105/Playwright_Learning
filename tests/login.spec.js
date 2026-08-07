import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

let loginpage;

test.beforeEach(async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    loginpage = new LoginPage(page);
});

test('Valid Log in',async({page})=>{
    await loginpage.login("standard_user","secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await loginpage.logout();
});

test("Invalid test",async({page})=>{
    await loginpage.login("swetha","swe2003");
    await expect(page.locator("h3")).toContainText("Username and password do not match");
});

test("Empty credentials",async({page})=>{
    await loginpage.login("","");
    await expect(page.locator("h3")).toHaveText("Epic sadface: Username is required");
});

test("Locked user",async({page})=>{
    await loginpage.login("locked_out_user","secret_sauce");
     await expect(page.locator("h3")).toContainText("user has been locked out");
});
