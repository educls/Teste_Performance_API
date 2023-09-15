import { sleep } from 'k6'
import { geraBody } from '../../../../functions/GeraBody.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../../support/base/baseTest.js'

export const options = testConfig.options.stressThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export async function setup(){
    
    //Cadastra Usuario
        let payloadUsuario = geraBody(10, 'usuario')
        const resCadastroUsuario = baseRest.post(ENDPOINTS.USER_ENDPOINT, payloadUsuario)

        let resCadastroUsuarioJSON = JSON.parse(resCadastroUsuario.body)
    
    sleep(1)
    //Login
        const payloadLogin = {"email": payloadUsuario.email,"password": payloadUsuario.password}
        const resLogin = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payloadLogin)

        const resLoginJSON = JSON.parse(resLogin.body)
        let token = resLoginJSON.authorization
    sleep(1)
    return{
        resCadastroUsuarioJSON,
        token
    }
}

export default(data) =>{
    const payloadProduto = geraBody(10, 'produto')
    const tokenBearer = data.token

    const resPostUsuario = baseRest.post(ENDPOINTS.PRODUCTS_ENDPOINT, payloadProduto, tokenBearer)

    baseChecks.checkStatusCode(resPostUsuario, 201)
    baseChecks.checkResponseSize(resPostUsuario, 82)
    baseChecks.checkResponseMessage(resPostUsuario, 'Cadastro realizado com sucesso')
    baseChecks.checkResponseTime(resPostUsuario, 2000)
    sleep(1)
}

export function teardown(data){
    console.log("Realizando Limpeza dos Dados")
    const resGetProdutos = baseRest.get(ENDPOINTS.PRODUCTS_ENDPOINT)
    const bodyGetProdutosJSON = JSON.parse(resGetProdutos.body)
    const produtos = bodyGetProdutosJSON.produtos

    for(let i = 0; i < produtos.length; i++){
        const id = produtos[i]._id
        baseRest.delete(`${ENDPOINTS.PRODUCTS_ENDPOINT}/`, id, data.token)
    }

    //Excluir Usuario
    const idUsuario = data.resCadastroUsuarioJSON._id
    baseRest.delete(`${ENDPOINTS.USER_ENDPOINT}/`,idUsuario)
    console.log("Limpeza do teste concluida")

    sleep(1)
}

export function handleSummary(data) {
    return {
      "stress_test_postProdutos.html": htmlReport(data),
    };
}