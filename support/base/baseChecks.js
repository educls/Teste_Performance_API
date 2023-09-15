import { check } from 'k6';

export class BaseChecks{
    checkStatusCode(response, expectedStatus = 200){
        check(response, {
            'status code check' : (r) => r.status === expectedStatus,
        })
    }
    checkResponseSize(response, size, size2){
        // console.log(response.body.length)
        check(response, {
            'body size check': (r) => r.body.length == size || r.body.length == size2
        })
    }
    checkResponseMessage(response, message, message2){
        const res = JSON.parse(response.body)
        check(res, {
            'verify text body check': (r) => r.message.includes(message) || r.message.includes(message2)
        })
    }
    checkResponseTime(response, timing){
        check(response, {
            'timing response check': (r) => r.timings.duration < timing
        })
    }
}
