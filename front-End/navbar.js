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

async function navLinksTes(driver) {
  try {
    await driver.get("http://pertaminaproject.test/home");
    await driver.sleep(2000);
    await driver.get("http://pertaminaproject.test/daftartkjp");
    await driver.sleep(2000);
    await driver.get("http://pertaminaproject.test/daftarkerja");
    await driver.sleep(2000);
    await driver.get("http://pertaminaproject.test/profil");
    await driver.sleep(2000);
    //logout belum
    
    console.log("semua test berjalan dengan Benar");
  } catch (error) {
    console.error("Navbar Tidak Berjalan", error);
  }
}
(async function runTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await tesLogin(driver);
    await navLinksTes(driver);
  } finally {
    await driver.sleep(5000);
    await driver.quit();
  }
})();
