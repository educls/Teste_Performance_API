import http from 'k6/http';
import { check, sleep} from 'k6';
import { SharedArray } from 'k6/data';

import { BaseChecks, BaseRest, ENDPOINTS } from '../support/base/baseTest.js';

export const options = {
  vus: 1,
  duration: '1s',
};

const base_uri = 'http://localhost:3000'
const baseRest = new BaseRest(base_uri)

const data = new SharedArray('User', function () {
  const jsonData = JSON.parse(open('../data/static/user.json'));
  return jsonData.users;
});

const payload = {
  "nome": "Fulano da Silva",
  "email": "fulano@qa.com",
  "password": "teste",
  "administrador": "true"
}

export function setup(){
  const res = baseRest.post('/usuarios', payload)
  check(res, {
    'status should be 201': (r) => r.status === 201
  })
  console.log("Setup Criando User")
  return { responseData : res.json() }
}


export default () => {
  let userIndex = __ITER % data.length;

  let user = data[userIndex];

  const res = baseRest.post('/login', user)

  check(res, {
    'status should be 200': (r) => r.status == 200,
  });
  console.log("Realizando Login")
  sleep(1);
};


export function teardown(data){
  const userId = data.responseData._id

  const res = baseRest.delete(base_uri, userId)

  check(res, {
    'status should be 200': (r) => r.status === 200
  })
  console.log(`Teardown deletando o usuario com ID ${userId}`)
}