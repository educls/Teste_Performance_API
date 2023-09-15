import http from 'k6/http';
import { check, sleep} from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
    vus: 1,
    duration: '1s',
};

const data = new SharedArray('Usuarios', function () {
    const jsonData = JSON.parse(open('../data/dynamic/Usuarios.json'));
    console.log(jsonData)
    return jsonData;
});


export default () => {
    let userIndex = __ITER % data.length;
  
    let user = data[userIndex];
    console.log(user)
  
    const res = http.post('http://localhost:3000/usuarios', JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json',
                'monitor': 'false'
        }
    });
    console.log(res.body)
    check(res, {
      'status code was 200': (r) => r.status == 200,
    });
    sleep(1);
};
  