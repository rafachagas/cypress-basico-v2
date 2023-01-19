Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').should('be.visible').type('Recursos')
    cy.get('#lastName').should('be.visible').click().type('Cambiais')
    cy.get('#email').should('be.visible').click().type('recursoscambiais@email.com.br')
    cy.get('#open-text-area').should('be.visible').click().type('Realizando testes de inclusão de texto', {delay:0})
 
    cy.get('button[type="submit"]').click()

})
