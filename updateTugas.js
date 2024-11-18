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

async function testApproveSafty(driver) {
  try {
    await driver.get("http://pertaminaproject.test/home");
    await driver.findElement(By.xpath(`//a[@href="/kategorikerja/safety"]`)).click();

    const btnInfo = await driver.wait(until.elementLocated(By.xpath(`//button[@data-bs-target="#infoTugas139"]`)));
    btnInfo.click();

    const btnTerima = await driver.wait(until.elementLocated(By.xpath(`//button[contains(text(), 'Terima')]`)), 2000);
    btnTerima.click();
    await driver.sleep(2000);
    
    console.log("Testing Approve Berhasil");
  } catch (error) {
    console.error("test Approve Gagal", error);
  }
}

(async function runtest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await tesLogin(driver);
    await driver.sleep(2000);
    await testApproveSafty(driver);
    await driver.sleep(2000);
  } finally {
    await driver.sleep(5000);
    await driver.quit();
  }
})();
