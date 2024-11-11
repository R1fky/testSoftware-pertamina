const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const { elementIsDisabled, elementLocated } = require("selenium-webdriver/lib/until");

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

async function btnTambahTgs(driver) {
  try {
    await driver.get("http://pertaminaproject.test/daftarkerja");
    const btnTambahTgs = await driver.findElement(By.xpath('//button[@data-bs-target="#tambahTugas"]'))
    btnTambahTgs.click()

    const nama_tugas = await driver.wait(until.elementLocated(By.name('nama_tugas')), 2000)
    nama_tugas.sendKeys('Tes Tambah Tugas')

    async function elemenOption() {
      
    }
  } catch (error) {
    console.error("Tambah Tugas Tidak Berhasil diJalankan", error);
  }
}

async function btnInfoTgs(driver) {
  try {
    await driver.get("http://pertaminaproject.test/daftarkerja");
    const btnInfo = await driver.findElement(By.xpath('//i[@class="bi bi-info-lg"]'));
    btnInfo.click();

    console.log("Btn Info Berhasil ");
  } catch (error) {
    console.error("Element untuk Btn Info Tidak ditemukan", error);
  }
}

async function btnDeleteTgs(driver) {
  try {
    await driver.get("http://pertaminaproject.test/daftarkerja");
    // akses delete button
    const deleteBtn = await driver.findElement(By.xpath('//button[@class="btn btn-danger btn-sm"]')); //perlu diubah
    deleteBtn.click();
    try {
      const hapusBtn = await driver.wait(until.elementLocated(By.xpath('//div[@aria-labelledby="hapusModalLabel"]//a[@class="btn btn-danger"]')), 3000);
      hapusBtn.click();

      await driver.wait(until.elementLocated(By.xpath('//div[@class="alert alert-danger"]')), 3000);
      console.log("Proses Hapus Tugas test Berhasil");
    } catch (error) {
      console.error("Proses Hapus tugas Gagal", error);
    }
    console.log("Delete Tugas Testing Berhasil di jalankan");
  } catch (error) {
    console.error("Btn delete Tidak dapat diakses", error);
  }
}

async function btnSearch(driver) {
}

(async function runTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await tesLogin(driver);
    await driver.sleep(2000);
    await btnTambahTgs(driver)
    // await driver.sleep(2000)
    // await btnInfoTgs(driver);
    // await driver.sleep(5000);
    // await btnDeleteTgs(driver);
    // await driver.sleep(3000);
  } finally {
    await driver.sleep(5000);
    await driver.quit();
  }
})();
