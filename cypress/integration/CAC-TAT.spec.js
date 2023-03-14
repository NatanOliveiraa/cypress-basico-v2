
/// <reference types="Cypress" />
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')

    })

    it('verifica o titulo da aplicacao', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatorios e envia o formulario', function(){
        const longText = 'texto longo para exemplificar o exercicio'
        cy.get('#firstName').type('Natan')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('teste@teste.com.br')
        cy.get('#open-text-area').type(longText, {delay: 0 })
        cy.contains('button[type="submit"]', 'Enviar').click()
        
        cy.get('.success').should('be.visible', )
    })

    it('exibe mensagem de erro ao submeter o formulario com um email com formatacao', function(){
        cy.get('#firstName').type('Natan')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('teste@teste.com,br')
        cy.get('#open-text-area').type('teste')
        cy.contains('button[type="submit"]', 'Enviar').click()

        cy.get('.error').should('be.visible', )
    })

    it('campo telefone continua vazio quando preenchido com valor não numerico', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas nao é preenchido antes do envio', function(){
        cy.get('#firstName').type('Natan')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button[type="submit"]', 'Enviar').click()

        cy.get('.error').should('be.visible', )

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Natan')
            .should('have.value', 'Natan')
            .clear()
            .should('have.value', '')
            
        cy.get('#lastName')
            .type('Oliveira')
            .should('have.value', 'Oliveira')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('teste@teste.com')
            .should('have.value', 'teste@teste.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone-checkbox')
            .click()
        cy.get('#phone')
            .type(25652545)
            .should('have.value', '25652545')
                .clear()
                .should('have.value', '')
        cy.contains('button[type="submit"]', 'Enviar')
            .click()

        cy.get('.error')
            .should('be.visible', )

    })

    it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', function(){
        cy.contains('button[type="submit"]', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')

    })

    it('Envia um formulario com sucesso usando comando customizado',function(){

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
            .should('be.visible')
    })
    //**********Trabalhando com selects****************
    it('seleciona um produto (YOUTUBE) por seu texto', function(){

    cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })

    it('seleciona um produto (MENTORIA) pelo seu valor (value)', function(){

        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (BLOG) por seu indice', function(){

        cy.get('#product')
            .select(1)
            .should('have.value','blog')
    })

  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio)
                .check()
            cy.wrap($radio)
                .should('be.checked')

        })

  })

  it('marca ambos checkboxes, depois desmarca o ultimo', function(){

    cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
        
        })

 //**************Upload de arquivos**********************

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')

        })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function(){

    cy.get('#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')

    })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
    

        
        })
  })

  it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){

    cy.get('a')
        .should('have.attr', 'target', '_blank')
  })

  it('acessa a pagina da politica de privacidade removendo o target e entao clicando no link', function(){
    cy.get('a')
    .invoke('removeAttr', 'target')
    .click()
    cy.contains('CAC TAT - Política de privacidade')
        .should('be.visible')
  })

  it.only('testa a pagina da politica de privacidade de forma independente', function(){

    cy.get('a')
    .should('have.attr', 'target', '_blank')
    .click()
  })

})
