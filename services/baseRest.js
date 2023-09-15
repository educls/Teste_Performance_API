import http from 'k6/http';
import { BaseService } from "./baseService.js";

export class BaseRest extends BaseService{
    constructor(base_uri){
        super(base_uri);
    }
    get(endpoint, id = '', body = {}, headers = {}, params = {}){
        let uri = this.base_uri + endpoint + id;
        let options  = this.buildOptions(headers, params)
        return http.get(uri, JSON.stringify(body), options)
    }
    post(endpoint, body, token = '', headers = {}, params = {}){
        let uri = this.base_uri + endpoint;
        let options = this.buildOptions(headers = {}, params, token)
        return http.post(uri, JSON.stringify(body), options)
    }
    delete(endpoint, id = '', token = '', body = {}, headers = {}, params = {}){
        let uri = this.base_uri + endpoint + id;
        let options = this.buildOptions(headers = {}, params, token)
        return http.del(uri, JSON.stringify(body), options)
    }
    put(endpoint, id, token = '', body, headers = {}, params = {}){
        let uri = this.base_uri + endpoint + id;
        let options = this.buildOptions(headers = {}, params, token)
        return http.put(uri, JSON.stringify(body), options)
    }
    buildOptions(headers = {}, params = {}, token){
        return {
            headers: Object.assign({'Content-Type': 'application/json', 'monitor': 'false', 'Authorization': token}, headers),
            params: Object.assign({}, params)
        }
    }
}
