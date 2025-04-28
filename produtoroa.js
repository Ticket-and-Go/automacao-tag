const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
  // Configurar o driver
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless()) // para modo headless
    .build();

  try {
    // Navegar para uma página
    await driver.get('https://www.google.com');
    
    // Localizar elemento e interagir
    let searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenium JavaScript', Key.RETURN);
    
    // Esperar por um resultado
    await driver.wait(until.titleContains('Selenium JavaScript'), 5000);
    
    // Verificar resultado
    let title = await driver.getTitle();
    console.log('Título da página:', title);
    
  } finally {
    // Fechar o navegador
    await driver.quit();
  }
})();