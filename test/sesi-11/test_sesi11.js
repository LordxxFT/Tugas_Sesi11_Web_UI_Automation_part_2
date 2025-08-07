import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';
import chrome from 'selenium-webdriver/chrome.js';

import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

import PageLogin from '../../pages/page_login.js';


describe('Test Tugas Sesi ke 11', function () {
    let driver;
//-- hook untuk setup sebelum semua test case
    before(async function () {
        console.log('Bersiap menjalankan test Sesi 11 dengan Login SauceDemo');
        
        // maximize browser window
        let options = new chrome.Options();
        options.addArguments('--start-maximized');
        driver = await new Builder()
            .forBrowser('chrome')
            .build();
        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        // assert: memastikan object sama persis
        assert.strictEqual(title, 'Swag Labs');

        //   |
        //   v


        // inputs
        let pageLogin = new PageLogin(driver);
        await pageLogin.login('standard_user', 'secret_sauce');
        // jeda sebelum test case berikutnya
        await driver.sleep(2000);

        
    });

    beforeEach(async function () {  
        console.log('Menjalankan test Sesi 11 case: '+ this.currentTest.title);       
    });


    afterEach(async function () {
        console.log('Selesai mejalankan case: '+ this.currentTest.title);
    });

    after(async function () {
        console.log('Test Sesi 11 selesai, menutup browser');
        await driver.sleep(2000);
        await driver.quit();
    });
//---------------------------------------------------------------------------------
// Test cases
    it('Test SauceDemo login success dengan Full Screenshoot', async function () {
        
        // full screenshot
        let ss_full = await driver.takeScreenshot();
        fs.writeFileSync("full_screenshot_sucess_login_page.png", Buffer.from(ss_full, "base64"));
        await driver.sleep(2000);

        // partial screenshot
        // let inputUsernamePOM = await driver.findElement(page_login.inputUsername)
        // let ss_inputusername = await inputUsernamePOM.takeScreenshot();
        // fs.writeFileSync("inputusername.png", Buffer.from(ss_inputusername, "base64"));

    });

    it('Test SauceDemo -> login success -> change a-z to z-a', async function () {


        // tunggu element tampil
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            10000
        );
        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Shopping cart harus tampil');
        
        // assert: elememt ada
        await buttonCart.isDisplayed()

        // assert: text dalam element benar
        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.equal(logotext, 'Swag Labs')

        //   |
        //   v

        // assert: dropdown search
        let dropdownSort = await driver.findElement(By.xpath('//*[@data-test="product-sort-container"]'));
        await dropdownSort.click()     
        // az = dari a ke z
        // za = dari z ke a
        // lohi = dari harga rendah ke tinggi
        // hilo = dari harga tinggi ke rendah  
        let option = await driver.findElement(By.xpath('//*[@value="za"]'));
        await option.click();
        
        // jeda sebelum quitting driver
        await driver.sleep(2000);

    });

    it('Test SauceDemo -> login success -> change a-z to low - high', async function () {


        // tunggu element tampil
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            10000
        );
        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Shopping cart harus tampil');
        
        // assert: elememt ada
        await buttonCart.isDisplayed()

        // assert: text dalam element benar
        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.equal(logotext, 'Swag Labs')

        //   |
        //   v

        // assert: dropdown search
        let dropdownSort = await driver.findElement(By.xpath('//*[@data-test="product-sort-container"]'));
        await dropdownSort.click()     
        // az = dari a ke z
        // za = dari z ke a
        // lohi = dari harga rendah ke tinggi
        // hilo = dari harga tinggi ke rendah  
        let option = await driver.findElement(By.xpath('//*[@value="lohi"]'));
        await option.click();
        
        // jeda sebelum quitting driver
        await driver.sleep(2000);

    });

    it('Test SauceDemo -> login success -> change a-z to high - low', async function () {


        // tunggu element tampil
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            10000
        );
        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Shopping cart harus tampil');
        
        // assert: elememt ada
        await buttonCart.isDisplayed()

        // assert: text dalam element benar
        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.equal(logotext, 'Swag Labs')

        //   |
        //   v

        // assert: dropdown search
        let dropdownSort = await driver.findElement(By.xpath('//*[@data-test="product-sort-container"]'));
        await dropdownSort.click()     
        // az = dari a ke z
        // za = dari z ke a
        // lohi = dari harga rendah ke tinggi
        // hilo = dari harga tinggi ke rendah  
        let option = await driver.findElement(By.xpath('//*[@value="hilo"]'));
        await option.click();
        
        // jeda sebelum quitting driver
        await driver.sleep(2000);

    });
    it('Test Visual Testing compare img', async function () {
        driver 
        // screenshot keadaan login page sekarang, current.png
        let screenshot = await driver.takeScreenshot();
        let imgBuffer = Buffer.from(screenshot, "base64");
        fs.writeFileSync("current.png", imgBuffer);

        // ambil baseline untuk komparasi
        // jika belum ada baseline, jadikan current.png sebagai baseline
        if (!fs.existsSync("baseline.png")) {
            fs.copyFileSync("current.png", "baseline.png");
            console.log("Baseline image saved.");
        }

        // Compare baseline.png dan current.png apakah sama
        let img1 = PNG.sync.read(fs.readFileSync("baseline.png"));
        let img2 = PNG.sync.read(fs.readFileSync("current.png"));
        let { width, height } = img1;
        let diff = new PNG({ width, height });

        let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

        fs.writeFileSync("diff.png", PNG.sync.write(diff));

        if (numDiffPixels > 0) {
            console.log(`Visual differences found! Pixels different: ${numDiffPixels}`);
        } else {
            console.log("No visual differences found.");
        }
    });
});
