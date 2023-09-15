import { sleep } from 'k6'
import { SharedArray } from 'k6/data';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../../support/base/baseTest.js'

export const options = testConfig.options.stressThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const usersArray = new SharedArray('Usuarios', function () {
    const jsonData = JSON.parse(open('C:/Users/edufi/Desktop/Proj_Sprint7/Proj_Base_K6/data/dynamic/Usuarios.json'));
    return jsonData;
});

export async function setup(){
    let ids = []
    //Cadastra usuario
    for (let i = 0; i < usersArray.length; i++) {
        try {
          const resUsuario = baseRest.post(ENDPOINTS.USER_ENDPOINT, usersArray[i]);

          const resUsuarioJSON = JSON.parse(resUsuario.body);
          ids.push(resUsuarioJSON._id);
        } catch (error) {
          console.error(`${i}: ${error}`);
        }
    }console.log("Usuarios da massa de dados cadastrados na API")

    sleep(1)
    return ids
}
export default() =>{
    let Index = __ITER % usersArray.length;
    let user = usersArray[Index];

    //Login
    const payloadLogin = {
        "email": user.email,
        "password": user.password
    }

    const resLogin = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payloadLogin)

    baseChecks.checkStatusCode(resLogin, 200)
    baseChecks.checkResponseMessage(resLogin, 'Login realizado com sucesso')
    baseChecks.checkResponseTime(resLogin, 2000)
    sleep(1)
}

export function teardown(data){
    const idsUsuarios = data
    //Excluir Usuario
    for (let i = 0; i < data.length; i++) {
        try {
            baseRest.delete(ENDPOINTS.USER_ENDPOINT + '/', idsUsuarios[i])
        } catch (error) {
          console.error(`${i}: ${error}`);
        }
    }
    console.log("Limpeza do teste concluida")

    sleep(1)
}
export function handleSummary(data) {
    return {
      "stress_test_postLogin.html": htmlReport(data),
    };
}