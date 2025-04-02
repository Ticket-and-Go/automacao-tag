const {defineConfig} = require('cypress');
const path = require('path');


module.exports = defineConfig({
  e2e: {
    "reporter": "mochawesome",
    "reporterOptions": {
      "reportDir": "cypress/results",
      "overwrite": false,
      "html": true,
      "json": true
    },
    baseUrl: 'http://localhost:3000/#/login', // URL base para a API v2
    env: {
      apiV1Url: 'https://homol-api-v1-sic.ticketandgo.com.br', // URL base para a API v1
      apiV2Url: 'homol-api-v2-sic.ticketandgo.com.br', // URL base para a API v2
    },
    viewportWidth: 1920,
    viewportHeight: 1080,

    // Suas outras configura
    fileServerFolder: "./",
    chromeWebSecurity:false,
    failOnStatusCode: false,
    specPattern: [
      path.resolve('cypress', 'e2e', 'e2e', '**', '*.cy.js'),
      path.resolve('cypress', 'e2e', 'API', '**', '*.js')
    ],
    supportFile: './support.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
