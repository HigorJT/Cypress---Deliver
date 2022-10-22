import SignupPage from '../pages/SignupPages'

describe('Cadastro', () => {

    beforeEach(function() {
        cy.fixture('deliver').then((d)=> {
            this.deliver = d
        })
    })

    it('Usuário deve se tornar um entregador', function() {

        SignupPage.go()
        SignupPage.fillForm(this.deliver.signup)
        SignupPage.submit()

        const validation = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        SignupPage.modalContentShouldBe(validation)
        
        cy.get('.swal2-actions .swal2-confirm').click()
    })

    it('Incorret Document', function() {

        SignupPage.go()
        SignupPage.fillForm(this.deliver.cpf_inv)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! CPF inválido')

    })

    it('Incorret email', function() {

        SignupPage.go()
        SignupPage.fillForm(this.deliver.email_inv)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! Email com formato inválido.')

    })

    context('Required fields', function () {

        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function(){
            SignupPage.go()
            SignupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function() {
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })

    })
})