export class LoginPage {
    constructor(page) {
        this.page=page;
        this.userNameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginBtn = page.locator("#login-button");
    }
    async login(username,password){
        await this.userNameInput.fill(username);
        //await this.page.waitForTimeout(2000);
        await this.passwordInput.fill(password);
        //await this.page.waitForTimeout(2000);
        await this.loginBtn.click();
    }
    async logout(){
        await this.page.getByRole(
            'button',{name:'Open Menu'}
        ).click();
        //await this.page.waitForTimeout(2000);
        await this.page.getByRole('link',{name:'Logout'}).click();
        //await this.page.waitForTimeout(2000);
    }
}