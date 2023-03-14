Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Natan')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})