const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

// (async function example() {
//     let driver = await new Builder().forBrowser('chrome').build()
//     try {
//       await driver.get('https://www.google.com/ncr')
//       await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
//       await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
//     } finally {
//       await driver.quit()
//     }
//   })()

async function start() {
    let driver = await new Builder().forBrowser('chrome').build()
    try {
        await driver.get('https://www.tokopedia.com/')
        await driver.findElement(By.xpath(`//input[@data-unify="Search"]`)).sendKeys('Baju', Key.RETURN)   
        await driver.sleep(5000)
    } finally {
        await driver.quit()
    }
}

start()