import { check, sleep} from 'k6';
import { BaseRest } from '../services/baseRest.js';
import { geraBody } from '../functions/GeraBody.js';

export const options = {
  vus: 1,
  duration: '1s',
};

const base_uri = 'http://localhost:3000'
const baseRest = new BaseRest(base_uri)

export function setup(){
    const payload = geraBody(10, 'email')
    const res = baseRest.post('/usuarios', payload)
    console.log(res.body)
    check(res, {
        'status should be 201': (r) => r.status === 201,
    });
    return { 
        responseData : res.json()
    }
}

export default(data) => {

    const id = data.responseData._id
    const resGet = baseRest.get(`/usuarios/${id}`)

    const resJson = JSON.parse(resGet.body)
    console.log(resJson)

    check(resGet, {
        'status should be 200': (r) => r.status === 200
    })
    sleep(1)


    const payload = {
        "email": resJson.email,
        "password": resJson.password
    }

    const res = baseRest.post('/login', payload)
    console.log(res.body)

    check(res, {
        'status should be 200': (r) => r.status == 200,
    });
    console.log("Realizando Login")
    sleep(1);
}

export function teardown(data){
    const id = data.responseData._id
    const res = baseRest.delete('/usuarios/', id)

    check(res, {
        'status should be 200': (r) => r.status == 200,
    });
    console.log("Excluindo Usuario")
    sleep(1);
}