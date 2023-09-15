import { sleep, group } from 'k6'
import { geraBody } from '../../functions/GeraBody.js'

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../support/base/baseTest.js'

export const options = testConfig.options.fluxoThresholds

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

let token = ''
let idProd = ''
let payloadUsuario = {}
let resCadastroUsuarioJSON = ''

export function setup(){
    console.log("=====================Inicio=do=Teste=====================")
}

export default() =>{
    group("Cadastro de Usuario", () => {
        payloadUsuario = geraBody(10, 'usuario')
        
        const resCadastroUsuario = baseRest.post(ENDPOINTS.USER_ENDPOINT, payloadUsuario)

        baseChecks.checkStatusCode(resCadastroUsuario, 201)
        baseChecks.checkResponseSize(resCadastroUsuario, 82)
        baseChecks.checkResponseMessage(resCadastroUsuario, 'Cadastro realizado com sucesso')
        baseChecks.checkResponseTime(resCadastroUsuario, 2000)

        resCadastroUsuarioJSON = JSON.parse(resCadastroUsuario.body)
    })
    sleep(1)
    group("Login", () => {
        const payloadLogin = {"email": payloadUsuario.email,"password": payloadUsuario.password}
        const resLogin = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payloadLogin)

        baseChecks.checkStatusCode(resLogin, 200)
        baseChecks.checkResponseSize(resLogin, 277)
        baseChecks.checkResponseMessage(resLogin, 'Login realizado com sucesso')
        baseChecks.checkResponseTime(resLogin, 2000)

        const resLoginJSON = JSON.parse(resLogin.body)
        token = resLoginJSON.authorization
    })
    sleep(1)


    //Cadastrar Produto 


    group("Listar Produtos", () => {
        const resGetProdutos = baseRest.get(ENDPOINTS.PRODUCTS_ENDPOINT)

        baseChecks.checkStatusCode(resGetProdutos, 200)
        baseChecks.checkResponseSize(resGetProdutos, 260)
        baseChecks.checkResponseTime(resGetProdutos, 2000)

        const resGetProdutosJSON = JSON.parse(resGetProdutos.body)
        console.log(resGetProdutosJSON)

        const produto = resGetProdutosJSON.produtos[0];
        idProd = produto._id;
        console.log(idProd);
    })
    sleep(1)
    group("Cadastrar carrinho", () =>{

        const payloadCarrinho = {"produtos": [{"idProduto": idProd, "quantidade": 1}]}
        const resPostCarrinho = baseRest.post(ENDPOINTS.CARTS_ENDPOINTS, payloadCarrinho, token)

        baseChecks.checkStatusCode(resPostCarrinho, 201)
        baseChecks.checkResponseSize(resPostCarrinho, 82)
        baseChecks.checkResponseMessage(resPostCarrinho, 'Cadastro realizado com sucesso')
        baseChecks.checkResponseTime(resPostCarrinho, 2000)

        console.log(resPostCarrinho.body)
    })
    sleep(1)
    group("Concluir Compra", () =>{
        const resConcluirCompra = baseRest.delete(`${ENDPOINTS.CARTS_ENDPOINTS}/concluir-compra`, '', token)

        baseChecks.checkStatusCode(resConcluirCompra, 200)
        baseChecks.checkResponseSize(resConcluirCompra, 50)
        baseChecks.checkResponseMessage(resConcluirCompra, 'Registro excluído com sucesso')
        baseChecks.checkResponseTime(resConcluirCompra, 2000)

        console.log(resConcluirCompra.body)
    })
    sleep(1)


    //Excluir Produto cadatrado


    group("Excluir Usuario Cadastrado", () =>{
        const idUsuario = resCadastroUsuarioJSON._id
        const resDeleteUsuario = baseRest.delete(`${ENDPOINTS.USER_ENDPOINT}/`, idUsuario)

        baseChecks.checkStatusCode(resDeleteUsuario, 200)
        baseChecks.checkResponseSize(resDeleteUsuario, 50)
        baseChecks.checkResponseMessage(resDeleteUsuario, 'Registro excluído com sucesso')
        baseChecks.checkResponseTime(resDeleteUsuario, 2000)

        console.log(resDeleteUsuario.body)
    })
}

export function teardown(){
    console.log("=====================Fim=do=Teste=====================")
}