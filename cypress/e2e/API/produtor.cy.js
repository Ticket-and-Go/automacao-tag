
context('API - Area de Membros', () => {
  beforeEach(() => {
    
  });
  it.only('Obter Token de Login', () => {
    cy.criarProdutor().then((dadosTeste) => {
      expect(response.body).to.have.length(500)
  //    expect(dadosTeste.status).to.eq(500);
   
    })
  })

});
