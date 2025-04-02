function gerarSenhaAleatoria() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';

  // Garante pelo menos 1 caractere de cada tipo
  let password = [
    Cypress._.sample(uppercase), // 1 letra maiúscula
    Cypress._.sample(lowercase), // 1 letra minúscula
    Cypress._.sample(numbers),   // 1 número
    Cypress._.sample(symbols),   // 1 símbolo
  ].join('');

  // Adiciona mais caracteres aleatórios até completar 8+
  while (password.length < 8) {
    const allChars = uppercase + lowercase + numbers + symbols;
    password += Cypress._.sample(allChars);
  }

  // Embaralha para evitar ordem previsível
  return Cypress._.shuffle(password.split('')).join('');
}

function bypassRecaptcha() {
  cy.window().then((win) => {
    win.executeRecaptcha = () => Promise.resolve('fake-recaptcha-token');
  });

}

Cypress.Commands.add('bypassRecaptcha', (data) => bypassRecaptcha(data));



  
  Cypress.Commands.add('gerarSenhaAleatoria', (data) => gerarSenhaAleatoria(data));

  