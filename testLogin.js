const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");

async function testLogin() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://pertaminaproject.test/");

    // Improved element finding (using more specific XPath)
    const emailInput = await driver.findElement(By.xpath('//input[@name="email"]'));
    const passwordInput = await driver.findElement(By.xpath('//input[@name="password"]'));

    await emailInput.sendKeys("admin@gmail.com");
    await passwordInput.sendKeys("password", Key.RETURN);

    try {
      await driver.wait(until.urlContains("http://pertaminaproject.test/home"), 5000);
      await driver.sleep(5000);
      console.log("Login Berhasil");
    } catch (error) {
      console.error("Login Tidak Berhasil");
    }
  } catch (error) {
    console.error("Login failed:", error);
  } finally {
    await driver.quit();
  }
}

testLogin();
