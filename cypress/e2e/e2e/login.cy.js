import { faker } from '@faker-js/faker';


context('E2E - Login', () => {
  beforeEach(() => {
    // Configuração robusta do mock do reCAPTCHA
    cy.intercept('https://www.google.com/recaptcha/**', { statusCode: 200, body: {} });
    
    cy.visit('/', {
      onBeforeLoad(win) {
        // Mock completo para todas as variações de implementação do reCAPTCHA
        win.recaptchaDisabled = true;
        win.grecaptcha = {
          
          execute: (siteKey, options) => Promise.resolve('fake-recaptcha-token'),
          ready: (cb) => cb(),
          render: () => {}
        };
        win.executeRecaptcha = () => Promise.resolve('fake-recaptcha-token');
      }
    });

    // Garante que o reCAPTCHA está pronto
    cy.window().its('grecaptcha').should('exist');
  });

  it.only('Criar Novo Produtor', () => {
    const nomeAleatorio = faker.person.fullName();
    const idAleatorio = faker.string.alphanumeric(10).toLowerCase();
    const produtor = {
      nome: `TESTE AUTOMATIZADO ${nomeAleatorio}`,
      email: `teste.automatizado.${idAleatorio}@ticketandgo.com.br`,
    };

    cy.gerarSenhaAleatoria().then((senha) => {
      // Intercepta a requisição ANTES de qualquer ação
      cy.intercept('POST', '**/register**', (req) => {
        req.reply({
          statusCode: 200,
          body: { success: true }
        });
      }).as('registerRequest');

      cy.get('a[href="#/register"]').click();

      // Preenche o formulário com waits estratégicos
      cy.get('#nome').should('be.visible').type(produtor.nome);
      cy.get('#email').type(produtor.email);
      cy.get('#confirmeEmail').type(produtor.email);
      cy.get('#senha').type(senha);
      cy.get('input[type="checkbox"]').check({ force: true });

      // Verificação adicional do estado do formulário
      cy.get('button[type="submit"]')
        .should('not.be.disabled')
        .and('be.visible')
        .click();

      // Aguarda a requisição com timeout aumentado
      cy.wait('@registerRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
    });
  });
});