import { sleep } from 'k6'
import { geraBody } from '../../../../functions/GeraBody.js';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../../support/base/baseTest.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = testConfig.options.stressThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export async function setup(){
    
    //Cadastra Usuario
        let payloadUsuario = geraBody(10, 'usuario')
        const resCadastroUsuario = baseRest.post(ENDPOINTS.USER_ENDPOINT, payloadUsuario)

        let resCadastroUsuarioJSON = JSON.parse(resCadastroUsuario.body)
        const id_usuario = resCadastroUsuarioJSON._id
    
    sleep(1)
    //Login
        const payloadLogin = {"email": payloadUsuario.email,"password": payloadUsuario.password}
        const resLogin = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payloadLogin)

        const resLoginJSON = JSON.parse(resLogin.body)
        let token = resLoginJSON.authorization
    sleep(1)
    //Cadastra Produto
        const payloadProduto = geraBody(10, 'produto')

        const resPostProduto = baseRest.post(ENDPOINTS.PRODUCTS_ENDPOINT, payloadProduto, token)
        const resPostProdutoJSON = JSON.parse(resPostProduto.body)
        const id_Prod = resPostProdutoJSON._id

    //Cadastra Carrinho
        const payloadCarrinho = {"produtos": [{"idProduto": id_Prod,"quantidade": 1}]}
        const resPostCarrinho = baseRest.post(ENDPOINTS.CARTS_ENDPOINTS, payloadCarrinho, token)
        const resPostCarrinhoJSON = JSON.parse(resPostCarrinho.body)
        const id_Cart = resPostCarrinhoJSON._id
    return{
        id_usuario,
        id_Prod,
        id_Cart,
        token
    }
}

export default(data) =>{
    const idCarrinho = data.id_Cart
    const resGetCarrinho = baseRest.get(ENDPOINTS.CARTS_ENDPOINTS+'/', idCarrinho)

    baseChecks.checkStatusCode(resGetCarrinho, 200)
    baseChecks.checkResponseSize(resGetCarrinho, 401)
    baseChecks.checkResponseTime(resGetCarrinho, 2000)
    sleep(1)
}

export function teardown(data){
    console.log("Realizando Limpeza dos Dados")
    const tokenBearer = data.token
    baseRest.delete(`${ENDPOINTS.CARTS_ENDPOINTS}/cancelar-compra`, '', tokenBearer)

    const id_Produto = data.id_Prod
    baseRest.delete(`${ENDPOINTS.PRODUCTS_ENDPOINT}/`, id_Produto, tokenBearer)

    const idUsuario = data.id_usuario
    baseRest.delete(`${ENDPOINTS.USER_ENDPOINT}/`, idUsuario)

    console.log("Limpeza do teste concluida")
}

export function handleSummary(data) {
    return {
      "stress_test_getCarrinhos.html": htmlReport(data),
    };
}