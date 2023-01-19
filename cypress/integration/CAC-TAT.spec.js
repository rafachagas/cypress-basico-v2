/// <reference types="Cypress" /> 

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envida o formulário',function(){
//        cy.get('input[id="firstName"]').should('be.visible').type('Recursos')
//  no exemplo abaixo, o símbolo "#" significa 'ID'
        cy.get('#firstName').should('be.visible').type('Recursos')
        cy.get('#lastName').should('be.visible').click().type('Cambiais')
        cy.get('#email').should('be.visible').click().type('recursoscambiais@email.com.br')
        cy.get('#open-text-area').should('be.visible').click().type('Realizando testes de inclusão de texto', {delay:0})
        cy.get('button[type="submit"]').click()
//  no exemplo abaixo, o símbolo "." significa a classe do objeto
        cy.get('.success').should('be.visible')
    })

    it('mensagem de erro com email formatação inválida', function(){
        cy.get('#firstName').should('be.visible').type('Recursos')
        cy.get('#lastName').should('be.visible').click().type('Cambiais')
        cy.get('#email').should('be.visible').click().type('recurso@email,com.br')
        cy.get('#open-text-area').should('be.visible').click().type('Texto teste')        
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone vazio com valor não numérico', function(){
        cy.get('#phone').type("abcdefhij").should('have.value','')
    })

    it('mensagem de erro com telefone obrigatório', function(){
        cy.get('#firstName').should('be.visible').type('Recursos')
        cy.get('#lastName').should('be.visible').click().type('Cambiais')
        cy.get('#email').should('be.visible').click().type('recurso@email.com.br')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').should('be.visible').click().type('Texto teste')        
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Walmir').should('have.value', 'Walmir').clear().should('have.value','')
        cy.get('#lastName').type('filho').should('have.value', 'filho').clear().should('have.value','')
        cy.get('#email').type('recurso@email.com.br').should('have.value','recurso@email.com.br').clear().should('have.value','')
        cy.get('#phone').type('12345678').should('have.value','12345678').clear().should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('Teste 1 utilizando "contains" no lugar de "Get" ',function(){
        cy.get('#firstName').should('be.visible').type('Recursos')
        cy.get('#lastName').should('be.visible').click().type('Cambiais')
        cy.get('#email').should('be.visible').click().type('recursoscambiais@email.com.br')
        cy.get('#open-text-area').should('be.visible').click().type('Realizando testes de inclusão de texto', {delay:0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('Teste 2 utilizando "contains" no lugar de "Get" ', function(){
        cy.get('#firstName').should('be.visible').type('Recursos')
        cy.get('#lastName').should('be.visible').click().type('Cambiais')
        cy.get('#email').should('be.visible').click().type('recurso@email,com.br')
        cy.get('#open-text-area').should('be.visible').click().type('Texto teste')        
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('select').select('youtube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        //cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
        cy.get('input[type="radio"]').check('feedback').should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]').should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').should('be.visible').type('Recursos')
        cy.get('#lastName').should('be.visible').click().type('Cambiais')
        cy.get('#email').should('be.visible').click().type('recurso@email.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').should('be.visible').click().type('Texto teste')        
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fictures', function() {
        cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json').should(function($input){
            //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    // ESTE EXERCÍCIO SIMULA A SITUAÇÃO DE ARRASTAR O ARQUIVO PARA O UPLOAD
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input){
                //console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })
})