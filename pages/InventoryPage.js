import { LoginPage } from "./loginPage";

export class InventoryPage extends LoginPage {
    constructor(page){
        super(page);
    }
    async productCount(){
        this.products = this.page.locator(".inventory_item_name");
        console.log(await this.products.allTextContents())
        //return await this.products.count();
        return {
            count: await this.products.count(),
            product: this.products
        };
    }
    async productName(){
        this.firstProductName = this.page.locator(".inventory_item_name").first();
        return await this.firstProductName.textContent();
    }
    async productPrice(){
        this.firstProductPrice = this.page.locator(".inventory_item_price").first();
        console.log(await this.firstProductPrice.textContent());
        return this.firstProductPrice;
    }
    async productImage(){
        this.productImg = this.page.getByAltText("Sauce Labs Backpack");
        return this.productImg;
    };
    async productDescription(){
        this.description = this.page.locator(".inventory_item_desc").first();
        return this.description;
    }
}