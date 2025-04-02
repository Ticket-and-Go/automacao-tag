function criarNovoProdutor() {
  /* const data = {
    ...requestData,
  };*/

  const formData = new FormData();
  formData.append('nome_comercial', 'Tales Andrade');
  formData.append('cnpj', '33238656000104');
  formData.append('razao_social', 'tales andrade dev');
  formData.append('cep', '51020310');
  formData.append('endereco', 'Rua Jack Ayres');
  formData.append('numero', '52');
  formData.append('bairro', 'Boa Viagem');
  formData.append('cidade', 'Recife');
  formData.append('estado', 'PE');


   // Converta o FormData para o formato que o Cypress pode enviar
    const body = new URLSearchParams();
    for (const pair of formData.entries()) {
      body.append(pair[0], pair[1]);
    }
    let api21Url = Cypress.env('apiV2Url'); 
    let url123 = `${api21Url}/api/v2/producer/create`;
    // Faça a requisição

    cy.getBasichAuthTokenLogin('@token').then((token) => {
    cy.request({

      url: url123,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token.body.data.token}.`,
        'uuidUsuario': '928f8135-df82-40f6-83e4-146a0645b716' // UUID do exemplo do Insomnia
      },
      body: body.toString()
    }).then((response) => {
      // Você pode adicionar verificações da resposta aqui
      expect(response.status).to.eq(200);
      cy.log('Produtor criado com sucesso:', response.body);
    });
  });
}



  
  Cypress.Commands.add('criarNovoProdutor', (data) => criarNovoProdutor(data));

  