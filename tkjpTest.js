const { Builder, Browser, Key, By, until } = require("selenium-webdriver");

async function login(driver) {
  try {
    await driver.get("http://pertaminaproject.test/");
    await driver.findElement(By.name("email")).sendKeys("golwiner@gmail.com");
    await driver.findElement(By.name("password")).sendKeys("password", Key.RETURN);
    await driver.wait(until.urlIs("http://pertaminaproject.test/home"), 10000);
  } catch (error) {
    console.error("Testing Login gagal", error);
  }
}

async function testDelete(driver) {
  //akses delete button
  try {
    await driver.get("http://pertaminaproject.test/daftartkjp");
    const deleteBtn = await driver.findElement(By.xpath('//div[@class="card-body row"]//button[@class="btn btn-danger mb-2 mb-sm-0 me-sm-2"]'));
    deleteBtn.click();
    // akses hapus button
    try {
      const hapusBtn = await driver.findElement(By.xpath('//div[@class="modal-footer"]//a[@class="btn btn-danger"]'));
      hapusBtn.click();
      await driver.wait(until.elementLocated(By.xpath('//div[@class="alert alert-danger"]')), 10000);
      // Jika elemen konfirmasi ditemukan, tampilkan pesan di konsol
      console.log("Proses testing delete berhasil");
    } catch (error) {
      console.error("Proses testing gagal dilakukan", error);
    }
    // end akses  hapus button
  } catch (error) {
    console.error("Button tidak dapat di akses  ", error);
  }
}

async function testSearch(driver) {
  try {
    await driver.get("http://pertaminaproject.test/daftartkjp");
    const searchBtn = await driver.findElement(By.xpath('//input[@name="search"]'));
    searchBtn.sendKeys("haikal", Key.RETURN);

    await driver.wait(until.elementLocated(By.className("card-text")), 5000);
    console.log("Testing Search Berhasil dilakukan");
  } catch (error) {
    console.error("Testing Search gagal dilakukan");
  }
}

(async function runTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await login(driver);
    await driver.sleep(2000)
    // await testDelete(driver);
    // await driver.sleep(2000)
    await testSearch(driver);
    await driver.sleep(1000)
  } finally {
    await driver.sleep(5000);
    await driver.quit();
  }
})();
