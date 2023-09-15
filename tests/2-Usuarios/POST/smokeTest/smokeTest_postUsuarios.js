import { sleep } from 'k6'
import { geraBody } from '../../../../functions/GeraBody.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../../support/base/baseTest.js'

export const options = testConfig.options.smokeThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export default() =>{
    const payloadUsuario = geraBody(10, 'usuario')
    const resPostUsuario = baseRest.post(ENDPOINTS.USER_ENDPOINT, payloadUsuario)

    baseChecks.checkStatusCode(resPostUsuario, 201)
    baseChecks.checkResponseSize(resPostUsuario, 82)
    baseChecks.checkResponseMessage(resPostUsuario, 'Cadastro realizado com sucesso')
    baseChecks.checkResponseTime(resPostUsuario, 2000)
    sleep(1)
}

export function teardown(){
    console.log("Realizando Limpeza dos Dados")
    const resGetUsuarios = baseRest.get(ENDPOINTS.USER_ENDPOINT)
    const bodyResGetUsuariosJSON = JSON.parse(resGetUsuarios.body)
    const usuarios = bodyResGetUsuariosJSON.usuarios

    for(let i = 0; i < usuarios.length; i++){
        const id = usuarios[i]._id
        baseRest.delete(`${ENDPOINTS.USER_ENDPOINT}/`, id)
    }console.log("Limpeza do teste concluida")
    sleep(1)
}

export function handleSummary(data) {
    return {
      "smoke_test_postUsuarios.html": htmlReport(data),
    };
}