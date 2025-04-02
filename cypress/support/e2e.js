function getAuthorizationProtheus_Prod() {
  /* const data = {
    ...requestData,
  };*/
  const url = `https://apimprod.totvs.com.br/api/token`;
  cy.getBasichAuthToken().as('token');
  cy.get('@token').then(() => {
    cy.request({
      url: url,
      body: {
        grant_type: 'client_credentials',
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: Cypress.env('prod_integracao_protheus_env')
          .basic_autorization,
      },
    });
  });
}

  function getBasichAuthTokenLogin(requestData = {}) {
    const data = {
      ...requestData,
    };
    const apiV1Url = Cypress.env('apiV1Url'); 
    const url = `${apiV1Url}/auth/login`;
      cy.request({
        url: url,
        method: 'POST',
   
        headers: {
          'Content-Type': 'application/json',
          //authorization: `${sesiondata}`,
        },
        body:{                
                "email": "produtor_area_membro@ticketandgo.com.br",
                "senha": "secret@tag"
        }
      });
  }
  
  Cypress.Commands.add('postLogin', (data) => postLogin(data));
  
  Cypress.Commands.add('getBasichAuthTokenLogin', (data) => getBasichAuthTokenLogin(data));

  