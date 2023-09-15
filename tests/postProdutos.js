import { sleep} from 'k6';
import { geraBody } from '../functions/GeraBody.js';

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../support/base/baseTest.js';

export const options = testConfig.options.smokeThresholds

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export function setup(){
//////Cadastrar Usuario
    const payload = geraBody(10, 'usuario')
    const res = baseRest.post(ENDPOINTS.USER_ENDPOINT, payload)
    const resBody = JSON.parse(res.body)
    console.log("USUARIO: ",resBody.message)

    baseChecks.checkStatusCode(res, 201)
    baseChecks.checkResponseSize(res, 82)
    baseChecks.checkResponseMessage(res, 'Cadastro realizado com sucesso')
    baseChecks.checkResponseTime(res, 2000)
    sleep(1)

//////Get Usuario
    const idUsuario = resBody._id
    const resGet = baseRest.get(ENDPOINTS.USER_ENDPOINT + '/', idUsuario)

    const resGetJson = JSON.parse(resGet.body)
    console.log("GET USUARIO: ",resGetJson)

    baseChecks.checkStatusCode(resGet, 200)
    baseChecks.checkResponseSize(resGet, 157)
    baseChecks.checkResponseTime(resGet, 2000)
    sleep(1)

//////Realizar Login
    const payloadLogin = {
        "email": resGetJson.email,
        "password": resGetJson.password
    }

    const resLogin = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payloadLogin)
    const resLoginJson = JSON.parse(resLogin.body)
    console.log("LOGIN: ",resLoginJson.message)
    const token = resLoginJson.authorization

    baseChecks.checkStatusCode(resLogin, 200)
    baseChecks.checkResponseSize(resLogin, 277)
    baseChecks.checkResponseMessage(resLogin, 'Login realizado com sucesso')
    baseChecks.checkResponseTime(resLogin, 2000)
    sleep(1)

//////Cadastrar Produto
    const payloadProduto = geraBody(10, 'produto')
    const resProduto = baseRest.post(ENDPOINTS.PRODUCTS_ENDPOINT, payloadProduto, token)
    const resProdutoBody = JSON.parse(resProduto.body)
    console.log("PRODUTO: ",resProdutoBody.message)

    baseChecks.checkStatusCode(resProduto, 201)
    baseChecks.checkResponseSize(resProduto, 82)
    baseChecks.checkResponseMessage(resProduto, 'Cadastro realizado com sucesso')
    baseChecks.checkResponseTime(resProduto, 2000)
    sleep(1)

//////Excluir produto cadastrado
    const idProd = resProdutoBody._id
    const resProdDelete = baseRest.delete(ENDPOINTS.PRODUCTS_ENDPOINT + '/', idProd, token)
    console.log(resProdDelete.body)

    baseChecks.checkStatusCode(resProdDelete, 200)
    baseChecks.checkResponseSize(resProdDelete, 50)
    baseChecks.checkResponseMessage(resProdDelete, 'Registro excluído com sucesso')
    baseChecks.checkResponseTime(resProdDelete, 2000)
    sleep(1)

//////Editar nome do Usuario
    const payloadPut = {
        "nome": geraBody(10, "put"),
        "email": payload.email,
        "password": payload.password,
        "administrador": payload.administrador
    }
    const resPut = baseRest.put(ENDPOINTS.USER_ENDPOINT + '/', idUsuario, token, payloadPut)
    console.log(resPut.body)

    baseChecks.checkStatusCode(resPut, 200)
    baseChecks.checkResponseSize(resPut, 50)
    baseChecks.checkResponseMessage(resPut, 'Registro alterado com sucesso')
    baseChecks.checkResponseTime(resPut, 2000)
    sleep(1)

//////Excluir Usuario
    const resDeleteUsuario = baseRest.delete(ENDPOINTS.USER_ENDPOINT + '/', idUsuario, token)
    console.log(resDeleteUsuario.body)

    baseChecks.checkStatusCode(resDeleteUsuario, 200)
    baseChecks.checkResponseSize(resDeleteUsuario, 50)
    baseChecks.checkResponseMessage(resDeleteUsuario, 'Registro excluído com sucesso')
    baseChecks.checkResponseTime(resDeleteUsuario, 2000)
    sleep(1)
}

export default() => {
    console.log('Final')
    sleep(1)
}




