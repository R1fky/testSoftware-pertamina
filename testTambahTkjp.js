const { Builder, By, Key, until } = require("selenium-webdriver");
const { Select } = require("selenium-webdriver/lib/select");

async function tambahTkjp() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Akses Halaman dan Login
    await driver.get("http://pertaminaproject.test/");
    await driver.findElement(By.xpath('//input[@name="email"]')).sendKeys("golwiner@gmail.com");
    await driver.findElement(By.xpath('//input[@name="password"]')).sendKeys("password", Key.RETURN);
    await driver.wait(until.urlIs("http://pertaminaproject.test/home"), 5000);

    // Navigasi ke Halaman TKJP
    await driver.get("http://pertaminaproject.test/daftartkjp");
    const tambahTkjpButton = await driver.wait(
      until.elementLocated(By.xpath('//button[@data-bs-target="#tambahTkjp"]')),
      5000
    );
    await tambahTkjpButton.click();

    // Tunggu Elemen Form Muncul
    const nameInput = await driver.wait(
      until.elementLocated(By.xpath('//div[@id="tambahTkjp"]//input[@name="name"]')),
      5000
    );
    await nameInput.sendKeys("tesotomatis");

    // Cari dan Isi Input
    const emailInput = await driver.wait(
      until.elementLocated(By.xpath('//div[@id="tambahTkjp"]//input[@name="email"]')),
      5000
    );
    const passInput = await driver.findElement(By.xpath('//div[@id="tambahTkjp"]//input[@name="password"]'));
    const firstName = await driver.findElement(By.xpath('//div[@id="tambahTkjp"]//input[@name="first_name"]'));
    const lastName = await driver.findElement(By.xpath('//div[@id="tambahTkjp"]//input[@name="last_name"]'));

    await emailInput.sendKeys("testotomatis@gmail.com");
    await passInput.sendKeys("password");
    await firstName.sendKeys("tes");
    await lastName.sendKeys("otomatis");

    // Upload Gambar
    const imageInput = await driver.findElement(By.xpath('//div[@id="tambahTkjp"]//input[@name="image"]'));
    await imageInput.sendKeys("E:/Tugas kuliah/Semster 7/Prak pengujian perangkat lunak/pertamina-project/image/profile3.jfif");

    // Pilih Bagian, Role, dan Pic
    const bagianSelect = await driver.findElement(By.xpath('//div[@id="tambahTkjp"]//select[@name="bagian"]'));
    const roleSelect = await driver.findElement(By.xpath('//div[@id="tambahTkjp"]//select[@name="role_id"]'));
    const picSelect = await driver.findElement(By.xpath('//div[@id="tambahTkjp"]//select[@name="pic_id"]'));

    await new Select(bagianSelect).selectByValue("Safety");
    await new Select(roleSelect).selectByValue("3");
    await new Select(picSelect).selectByValue("2");

    // Simpan Data
    const btnSave = await driver.wait(
      until.elementLocated(By.xpath('//div[@id="tambahTkjp"]//button[@class="btn btn-primary"]')
    ),
      5000
    );
    await btnSave.click();

    // Tunggu hingga proses selesai
    await driver.wait(until.elementLocated(By.xpath('//div[@class="container"]//div[@class="alert alert-success mt-3"]')), 5000);
    console.log("Data berhasil ditambahkan");
  } catch (error) {
    console.error("Data tidak berhasil ditambahkan:", error);
  } finally {
    await driver.sleep(5000); // Beri waktu sebelum keluar untuk melihat hasilnya
    await driver.quit();
  }
}

tambahTkjp();

