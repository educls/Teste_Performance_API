import { sleep } from 'k6'
import { geraBody } from '../../../../functions/GeraBody.js';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../../support/base/baseTest.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = testConfig.options.loadThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export async function setup(){
    console.log("Cadastrando Produtos para o teste")
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
    let ids_Prod = []
        for(let i = 0; i < 100; i++){
            const payloadProduto = geraBody(10, 'produto')

            const resPostProduto = baseRest.post(ENDPOINTS.PRODUCTS_ENDPOINT, payloadProduto, token)
            const resPostProdutoJSON = JSON.parse(resPostProduto.body)
            ids_Prod.push(resPostProdutoJSON._id)
        }console.log("Produtos para o teste cadastrados na API")
    sleep(1)
    return{
        id_usuario,
        token,
        ids_Prod
    }
}

export default(data) =>{
    const tokenBearer = data.token
    const idProdutos = data.ids_Prod
    let ProdId = idProdutos[__ITER];

    const resDeleteProduto = baseRest.delete(`${ENDPOINTS.PRODUCTS_ENDPOINT}/`, ProdId, tokenBearer)

    baseChecks.checkStatusCode(resDeleteProduto, 200)
    baseChecks.checkResponseSize(resDeleteProduto, 50, 45)
    baseChecks.checkResponseMessage(resDeleteProduto, 'Registro excluído com sucesso', 'Nenhum registro excluído')
    baseChecks.checkResponseTime(resDeleteProduto, 2000)
    sleep(2)
}

export function teardown(data){
    console.log("Realizando Limpeza dos Dados")
    const tokenBearer = data.token
    const Produtos_id = data.ids_Prod

    for(let i = 0; i < Produtos_id.length; i++){
        const id = Produtos_id[i]
        baseRest.delete(`${ENDPOINTS.PRODUCTS_ENDPOINT}/`, id, tokenBearer)
    }
    const idUser = data.id_usuario
    baseRest.delete(`${ENDPOINTS.USER_ENDPOINT}/`, idUser)
    
    console.log("Limpeza do teste concluida")
}
export function handleSummary(data) {
    return {
      "load_test_delProdutos.html": htmlReport(data),
    };
}