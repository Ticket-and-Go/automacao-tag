const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

(async function example() {
  // Configurar o driver
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(
      new chrome.Options()
        //.headless() // Descomente para modo headless
        .addArguments('--window-size=1280,720')
    )
    .build();

  try {
    console.log('Abrindo navegador...');
    await driver.get('https://ah-dash.ticketandgo.com.br/#/login');

    // 1. Preencher formulário de login
    console.log('Preenchendo formulário...');
    const emailField = await driver.wait(until.elementLocated(By.id('email')), 15000);
    await emailField.clear();
    await emailField.sendKeys('produtor_area_membro@ticketandgo.com.br');

    const senhaField = await driver.wait(until.elementLocated(By.id('senha')), 15000);
    await senhaField.clear();
    await senhaField.sendKeys('secret@tag');

    // 2. Verificar e clicar no botão
    console.log('Verificando botão...');
    const submitButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 15000);
    
    const isDisplayed = await submitButton.isDisplayed();
    const isEnabled = await submitButton.isEnabled();
    
    if (!isDisplayed || !isEnabled) {
      throw new Error('O botão de submit não está visível ou habilitado');
    }
    
    await submitButton.click();

    // 3. Esperar redirecionamento ou elemento da próxima página
    console.log('Aguardando login...');
    try {
      // Espere por um elemento exclusivo da página após login
      await driver.wait(until.elementLocated(By.css('.dashboard-header')), 20000);
      console.log('Login realizado com sucesso!');
      
      // Mantém aberto por 10 segundos para visualização
      await driver.sleep(10000);
    } catch (e) {
      console.error('Falha no login ou redirecionamento:', e);
      
      // Tirar screenshot para debug
      const screenshot = await driver.takeScreenshot();
      fs.writeFileSync('login_failed.png', screenshot, 'base64');
      console.log('Screenshot salvo como login_failed.png');
    }

  } catch (error) {
    console.error('Erro durante o teste:', error);
  } finally {
    console.log('Fechando navegador...');
    await driver.quit();
  }
})();