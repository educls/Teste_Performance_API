import { sleep } from 'k6'
import { SharedArray } from 'k6/data'
import { geraBody } from '../../../../functions/GeraBody.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../../support/base/baseTest.js'

export const options = testConfig.options.loadThresholds

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const productsArray = new SharedArray('Produtos', function () {
    const jsonData = JSON.parse(open('C:/Users/edufi/Desktop/Proj_Sprint7/Proj_Base_K6/data/dynamic/Produtos.json'));
    return jsonData;
});

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

    let idsProdutos = []
    //Cadastra produto
    for (let i = 0; i < productsArray.length; i++) {
        try {
          const resProduto = baseRest.post(ENDPOINTS.PRODUCTS_ENDPOINT, productsArray[i], token);
          const resProdutoJSON = JSON.parse(resProduto.body);
          idsProdutos.push(resProdutoJSON._id);
        } catch (error) {
          console.error(`${i}: ${error}`);
        }
    }console.log("Produtos cadastrados na API")
    sleep(1)
    return {
        idsProdutos,
        resCadastroUsuarioJSON,
        token
    }
}

export default(data) =>{
    let Index = __ITER % productsArray.length;
    let idProduto = data.idsProdutos[Index]
    const resGetProdutos = baseRest.get(`${ENDPOINTS.PRODUCTS_ENDPOINT}/`, idProduto)

    baseChecks.checkStatusCode(resGetProdutos, 200)
    baseChecks.checkResponseTime(resGetProdutos, 2000)
    sleep(1)
}

export function teardown(data){
    console.log("Realizando Limpeza dos Dados")
    const ids = data.idsProdutos
    //Excluir Produtos
    for (let i = 0; i < ids.length; i++) {
        try {
            baseRest.delete(ENDPOINTS.PRODUCTS_ENDPOINT + '/', ids[i], data.token)
        } catch (error) {
          console.error(`${i}: ${error}`);
        }
    }
    //Excluir Usuario
    const idUsuario = data.resCadastroUsuarioJSON._id
    baseRest.delete(`${ENDPOINTS.USER_ENDPOINT}/`,idUsuario)
    console.log("Limpeza do teste concluida")

    sleep(1)
}

export function handleSummary(data) {
    return {
      "load_test_getProdutos.html": htmlReport(data),
    };
}