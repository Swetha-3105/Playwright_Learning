import {test,expect} from '@playwright/test';

test.beforeEach(async({page})=>{
     await page.goto("https://www.ebay.com");
});

test.skip("Launch Ebay Page",async({page})=>{
    //Task1
   // await page.goto("https://www.ebay.com"); //opens again 
    //await page.waitForTimeout(2000);

    console.log(await page.url());
    console.log(await page.title());

    await expect(page).toHaveURL("https://www.ebay.com/");
    await expect(page).toHaveTitle("Electronics, Cars, Fashion, Collectibles & More | eBay");
});

test("Search laptop", async({page})=>{
    //Task2
    const searchBox = page.getByPlaceholder("Search for anything");
    await searchBox.fill("Laptop");
    //await page.waitForTimeout(2000);

    //await searchBox.press("Enter");
    await page.getByRole("button",{
        name:"Search",
        exact:true
    }).click();
    //await page.waitForTimeout(2000);

    await expect(page).toHaveURL(/sch/);

    //Task3
    let products = page.locator(".su-styled-text.primary.default"); 
    let firstProduct = products.nth(2);
    console.log(await firstProduct.textContent());

    await expect(searchBox).toHaveValue("Laptop");
    await expect(firstProduct).toHaveText("Dell Latitude 3420 Business 14” Laptop Intel Core i5 16GB RAM 256GB SSD Win 11");
    
    const [firstProductPage] = await Promise.all([
        page.waitForEvent("popup"),
        firstProduct.click()
    ]);
    const price = firstProductPage.getByTestId("x-price-primary");
    console.log(await price.textContent()); 

    await expect(price).toContainText("249");
    //Task4
    const buyBtn = firstProductPage.locator("#binBtn_btn_1");
    await expect(buyBtn).toBeVisible();

    const addCart = firstProductPage.locator("#atcBtn_btn_1");
    await expect(addCart).toBeVisible();

    const firstProductName= firstProductPage.locator("h1");
    const LptopName = await firstProductName.textContent();

    const sellerName = firstProductPage.locator(".x-sellercard-atf__about-seller-item.x-sellercard-atf__about-seller-item--seller-name");
    console.log(await sellerName.textContent());

    const productImg = firstProductPage.locator("div.ux-image-carousel-item.image-treatment.active.image");
    const lapImg = productImg.locator("img").first();
    await expect(lapImg).toHaveAttribute("src");

    //Scenario 2
    //Task 1
    await addCart.click();
    const seeCart = firstProductPage.locator("//*[@id=\"mainContent\"]/div/div[6]/ul/li[2]/div[1]/div/div[2]/div[3]/div/div/div[1]/div[2]/div[2]/div/div/div/div[1]/a/span/span");
    await seeCart.click();
    const cartItem = firstProductPage.getByRole("link",{
        name:"Dell Latitude 3420 Business 14” Laptop Intel Core i5 16GB RAM 256GB SSD Win 11"
    });
    console.log(cartItem.textContent());
    await expect(cartItem).toHaveText(LptopName);
    const total = await firstProductPage.locator('[data-test-id="ITEM_TOTAL"]').locator(".text-display-span");
    console.log(await total.textContent());
    const quantity = firstProductPage.locator("input.textbox__control");
    await expect(quantity).toHaveValue("1");
    const subTotal = firstProductPage.locator("div.val-col.total-row");
    await expect(subTotal).toContainText("432");
});

