import { sleep } from 'k6'
import { geraBody } from '../../../../functions/GeraBody.js';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../../support/base/baseTest.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = testConfig.options.stressThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();


export async function setup(){
    let ids = []
    console.log("Cadastrando Usuarios para o teste")
    //Cadastra usuario
    for (let i = 0; i < 200; i++) {
        try {
            let payloadUsuario = geraBody(10, 'usuario')
            const resUsuario = baseRest.post(ENDPOINTS.USER_ENDPOINT, payloadUsuario);
            const resUsuarioJSON = JSON.parse(resUsuario.body);
            ids.push(resUsuarioJSON._id);
        } catch (error) {
          console.error(`${i}: ${error}`);
        }
    }console.log("Usuarios para o teste cadastrados na API")
    sleep(1)
    return ids
}

export default(data) =>{
    const iDs = data
    let Index = __ITER % iDs.length;
    let useriD = data[Index];

    const resDeleteUsuario = baseRest.delete(`${ENDPOINTS.USER_ENDPOINT}/`, useriD)

    baseChecks.checkStatusCode(resDeleteUsuario, 200)
    baseChecks.checkResponseSize(resDeleteUsuario, 50, 45)
    baseChecks.checkResponseMessage(resDeleteUsuario, 'Registro excluído com sucesso', 'Nenhum registro excluído')
    baseChecks.checkResponseTime(resDeleteUsuario, 2000)
    sleep(2)
}

export function teardown(){
    console.log("Realizando Limpeza dos Dados")
    const resGetUsuarios = baseRest.get(ENDPOINTS.USER_ENDPOINT)
    const bodyResGetUsuariosJSON = JSON.parse(resGetUsuarios.body)
    const usuarios = bodyResGetUsuariosJSON.usuarios

    for(let i = 0; i < usuarios.length; i++){
        const id = usuarios[i]._id
        baseRest.delete(`${ENDPOINTS.USER_ENDPOINT}/`, id)
    }
    console.log("Limpeza do teste concluida")
    sleep(1)
}
export function handleSummary(data) {
    return {
      "stress_test_delUsuarios.html": htmlReport(data),
    };
}