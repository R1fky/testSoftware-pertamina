const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

async function tesLogin(driver) {
  try {
    await driver.get("http://pertaminaproject.test/");
    await driver.findElement(By.name("email")).sendKeys("golwiner@gmail.com");
    await driver.findElement(By.name("password")).sendKeys("password", Key.RETURN);
    await driver.wait(until.urlIs("http://pertaminaproject.test/home"), 10000);
  } catch (error) {
    console.error("Testing Login gagal", error);
  }
}

async function homeTest(driver) {
  try {
    await driver.get("http://pertaminaproject.test/home");
    
    console.log("Home Page Berhasil Di Akses");
  } catch (error) {
    console.error("Home Page tidak Berhasil Di Akses");
  }
}
(async function testRunHome() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await tesLogin(driver);
    await driver.sleep(2000);
    await homeTest(driver);
  } finally {
    await driver.sleep(5000);
    await driver.quit();
  }
})();
