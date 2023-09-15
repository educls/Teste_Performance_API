import { sleep } from 'k6'
import { geraBody } from '../../../../functions/GeraBody.js';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../../support/base/baseTest.js'
//import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export const options = testConfig.options.stressThresholds;

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
    return{
        Id_Usuario,
        token,
        payloadUsuario
    }
}

export default(data) =>{
    const payload = data.payloadUsuario
    const idUsuario = data.Id_Usuario
    const tokenBearer = data.token

    const bodyPutUsuario = {
        "nome": geraBody(10, "put"),
        "email": payload.email,
        "password": payload.password,
        "administrador": payload.administrador
    }

    const resPutUsuario = baseRest.put(`${ENDPOINTS.USER_ENDPOINT}/`, idUsuario, tokenBearer, bodyPutUsuario)

    baseChecks.checkStatusCode(resPutUsuario, 200)
    baseChecks.checkResponseSize(resPutUsuario, 50)
    baseChecks.checkResponseMessage(resPutUsuario, 'Registro alterado com sucesso')
    baseChecks.checkResponseTime(resPutUsuario, 2000)
    sleep(1)
}

export function teardown(data){
    console.log("Realizando Limpeza dos Dados")
    baseRest.delete(`${ENDPOINTS.USER_ENDPOINT}/`, data.Id_Usuario)
    console.log("Limpeza do teste concluida")
}