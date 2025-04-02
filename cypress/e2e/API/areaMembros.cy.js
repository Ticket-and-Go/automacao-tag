
context('API - Area de Membros', () => {
  beforeEach(() => {
    
  });
  it.only('Obter Token de Login', () => {
    cy.getBasichAuthTokenLogin().then((dadosTeste) => {

      expect(dadosTeste.status).to.eq(200);
      expect(dadosTeste.body.data).to.have.property('area_membros_processo_fila_id');
     
     // expect(dadosTeste).to.have.property('message');
      
      //cy.get('button').contains('Entrar').click()
    })
  })

});
