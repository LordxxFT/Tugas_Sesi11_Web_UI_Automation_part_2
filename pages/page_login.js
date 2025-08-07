import { By } from 'selenium-webdriver';



class PageLogin {
        constructor(driver) {
            this.driver = driver;
            this.inputUsername = By.css('[data-test="username"]');
            this.inputPassword = By.xpath('//*[@data-test="password"]');
            this.buttonLogin = By.className('submit-button btn_action');
        }

        async login(username, password) {
            let inputUsername = await this.driver.findElement(this.inputUsername);
            let inputPassword = await this.driver.findElement(this.inputPassword);
            let buttonLogin = await this.driver.findElement(this.buttonLogin);
            
            await inputUsername.sendKeys(username);
            await inputPassword.sendKeys(password);
            await buttonLogin.click();
        }
    }

    export default PageLogin;