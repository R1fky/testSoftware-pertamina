const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const { elementIsDisabled, elementLocated } = require("selenium-webdriver/lib/until");
const { Select } = require("selenium-webdriver/lib/select");

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

    // Periksa apakah tugas dengan nama yang sama sudah ada
    const tugas_baru = "Tes KeDua";
    const existingTask = await driver.findElements(By.xpath(`//input[@name='nama_tugas' and @value='${tugas_baru}']`));

    if (existingTask.length > 0) {
      console.log("Tugas sudah ada. Tidak perlu menambahkan tugas baru.");
      return;
    }

    // Jika tugas belum ada, lanjutkan proses penambahan tugas
    const btnTambahTgs = await driver.findElement(By.xpath('//button[@data-bs-target="#tambahTugas"]'));
    btnTambahTgs.click();

    const nama_tugas = await driver.wait(until.elementLocated(By.name("nama_tugas")), 2000);
    nama_tugas.sendKeys(tugas_baru);

    // Isi option
    const frekuensi = await driver.findElement(By.name("frekuensi"));
    const bulan = await driver.findElement(By.name("bulan_id"));
    const category = await driver.findElement(By.name("category_id"));
    const pic = await driver.findElement(By.name("pic_id"));
    const user = await driver.findElement(By.name("user_id"));

    await new Select(frekuensi).selectByValue("bulanan");
    await new Select(bulan).selectByValue("3");
    await new Select(category).selectByValue("2");
    await new Select(pic).selectByValue("5");
    await new Select(user).selectByValue("70");

    //input deskripsi
    await driver.findElement(By.name('deskripsi')).sendKeys('Dekripsi ini adalah Testting')

    const textContent = await driver.executeScript('return document.body.innerText')
    console.log(textContent)

    const button = await driver.findElement(By.xpath("//button[contains(text(), 'Save changes')]"));
    await button.click();

    // Periksa apakah tugas berhasil ditambahkan
    const addedTask = await driver.wait(until.elementLocated(By.xpath(`//input[@name='nama_tugas' and @value='${tugas_baru}']`)), 5000);

    if (addedTask) {
      console.log("Data tugas berhasil ditambahkan.");
    }
  } catch (error) {
    console.error("Tambah Tugas Tidak Berhasil dijalankan", error);
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
  try {
    await driver.get("http://pertaminaproject.test/daftarkerja");

    const search = "tes";
    const btnSearch = await driver.findElement(By.name("search"));
    btnSearch.sendKeys(search, Key.RETURN);

    console.log("Search berhasil dijalankan");
  } catch (error) {
    console.error("Search tidak berhasil dijalankan");
  }
}

// async function editTest(driver) {
//   try {
//     await driver.get("http://pertaminaproject.test/daftarkerja");

//     // await driver.findElement(By.xpath(`//button[@class="btn btn-warning btn-sm me-2"]`)).click();
//     await driver.wait(until.elementLocated(By.xpath(`//button[@class="btn btn-warning btn-sm me-2"]`)), 3000).click()
//     const name_tugas = await driver.findElement(By.xpath('//input[@value="Tes kebugaran fireman dan sekuriti"]'))
//     await name_tugas.clear()
//     name_tugas.sendKeys('Tes Ganti Edit')

//     // Tunggu hingga elemen frekuensi tersedia
//     const frekuensi = await driver.wait(until.elementLocated(By.name("frekuensi")), 10000);
//     // await frekuensi.clear();
//     await new Select(frekuensi).selectByValue("mingguan");

//     console.log("Testing Edit Berhasil");
//   } catch (error) {
//     console.error("Testing Edit gagal dilakukan", error);
//   }
// }

(async function runTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await tesLogin(driver);
    await driver.sleep(2000);
    await btnTambahTgs(driver);
    await driver.sleep(2000);
    // await btnInfoTgs(driver);
    // await driver.sleep(5000);
    // await btnDeleteTgs(driver);
    // await driver.sleep(3000);
    // await btnSearch(driver);
    // await driver.sleep(3000);
    // await editTest(driver);
    // await driver.sleep(2000);
  } finally {
    await driver.sleep(5000);
    await driver.quit();
  }
})();
