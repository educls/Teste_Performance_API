import { sleep } from 'k6'
import { geraBody } from '../../../../functions/GeraBody.js';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../../support/base/baseTest.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = testConfig.options.loadThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export async function setup(){
    console.log("Cadastrando Usuario para o teste")
    //Cadastra Usuario
        let payloadUsuario = geraBody(10, 'usuario')
        const resUsuario = baseRest.post(ENDPOINTS.USER_ENDPOINT, payloadUsuario);
        let resBodyUsuarioJSON = JSON.parse(resUsuario.body)
        const Id_Usuario = resBodyUsuarioJSON._id
    sleep(1)
    //Login
        const payloadLogin = {"email": payloadUsuario.email,"password": payloadUsuario.password}
        const resLogin = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payloadLogin)

        const resLoginJSON = JSON.parse(resLogin.body)
        let token = resLoginJSON.authorization
    sleep(1)
    //Cadastra Produto
        const payloadProduto = geraBody(10, 'produto')
        const resPostProduto = baseRest.post(`${ENDPOINTS.PRODUCTS_ENDPOINT}`, payloadProduto, token)
        const resPostProdutoJSON = JSON.parse(resPostProduto.body)
        const Id_Produto = resPostProdutoJSON._id
    return{
        Id_Usuario,
        Id_Produto,
        token,
        payloadProduto
    }
}

export default(data) =>{
    const idProduto = data.Id_Produto
    const payloadProd = data.payloadProduto
    const tokenBearer = data.token
    const bodyPutProduto = {
        "nome": geraBody(10, 'put'),
        "preco": payloadProd.preco,
        "descricao": payloadProd.descricao,
        "quantidade": payloadProd.quantidade
    }
    
    const resPutProduto = baseRest.put(`${ENDPOINTS.PRODUCTS_ENDPOINT}/`, idProduto, tokenBearer, bodyPutProduto)
    baseChecks.checkStatusCode(resPutProduto, 200)
    baseChecks.checkResponseSize(resPutProduto, 50)
    baseChecks.checkResponseMessage(resPutProduto, 'Registro alterado com sucesso')
    baseChecks.checkResponseTime(resPutProduto, 2000)
    sleep(1)
}

export function teardown(data){
    console.log("Realizando Limpeza dos Dados")
    baseRest.delete(`${ENDPOINTS.PRODUCTS_ENDPOINT}/`, data.Id_Produto, data.token)
    baseRest.delete(`${ENDPOINTS.USER_ENDPOINT}/`, data.Id_Usuario)
    console.log("Limpeza do teste concluida")
}

export function handleSummary(data) {
    return {
      "load_test_putProdutos.html": htmlReport(data),
    };
}