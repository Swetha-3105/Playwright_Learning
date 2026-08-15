import {test , expect} from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

let inventory;

test.beforeEach(async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    inventory = new InventoryPage(page);
    await inventory.login("standard_user","secret_sauce");
});

test("Check url",async({page})=>{
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("Product count",async({page})=>{
    let productDetails = await inventory.productCount();
    let count = productDetails.count;
    let product = productDetails.product;
    await expect(product).toHaveCount(6);
    await expect(count).toEqual(6);
});

test("First Product Name",async({page})=>{
    let firstProduct = await inventory.productName();
    await expect(firstProduct).toEqual("Sauce Labs Backpack");
});

test("Product price",async({page})=>{
    let price = await inventory.productPrice();
    await expect(price).toHaveText("$29.99");
});

test("Product Image", async({page})=>{
    let image = await inventory.productImage();
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src");
    await expect(image).toHaveAttribute("alt","Sauce Labs Backpack");
});

test("Product Descriptio", async({page})=>{
    let description = await inventory.productDescription();
    await expect(description).toContainText("carry.allTheThings() with the sleek, streamlined Sly Pack");
});