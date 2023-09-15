[![NPM](https://img.shields.io/npm/l/react)](https://gitlab.com/edu_compass/sprints_compass/-/blob/pb_sprint7/Proj_Base_K6/LICENSE?ref_type=heads) 

<h1 align="center">Teste de Performance para API - K6</h1>

> Status: 🚦 Desenvolvendo


Se concentra em testar os diversos verbos de uma API (_GET, POST, PUT, DELETE_)<br>
o projeto está configurado para os seguintes tipos de teste,
_**Smoke Test / Load Test / Stress Test**_.<br>
Projeto desenvolvido exclusivamente para estudo próprio

## Instalação da API <img src="https://user-images.githubusercontent.com/29241659/115161869-6a017e80-a076-11eb-9bbe-c391eff410db.png" width=150px>

#### A Api deve ser executada localmente via NodeJS
<p> Possue versões - Windows - Linux - Mac</p>

+ <a href="https://nodejs.org/en/download/">Instalação NodeJS</a>
<br>

```bash
# Após a instalação execute em qualquer termimal:
$ npx serverest@latest
# Para Iniciar a API
```


## Instalação do Projeto

Requisito: 

+ chocolatey<br>
<a href="https://chocolatey.org/install">Installing Chocolatey</a>

```bash
# clonar repositório 
git clone https://gitlab.com/edu_compass/sprints_compass.git
git checkout pb_sprint7
```

_Instale o K6 usando o:_ `choco install`

```bash
# Começe instalando o K6
$ choco install k6
```

_Instale as dependências do projeto usando o:_ `npm install`
```bash
# Instalar o Faker, para geração de massa de dados
$ npm install --save-dev @faker-js/faker
```

_Ou se Preferir_
```bash
$ npm intall
# Que irá instalar todas dependências do projeto
```

## Oque cada pasta armazena

_`📁/data` é onde deve ser armazenado todas as massas de dados geradas pelo faker **sendo filtrados por static ou dynamic**_

_`📁/functions` estão as funções executadas nos scripts de teste_

_`📁/services` possue a classe dos respectivos serviços/verbos da API como o GET e POST_

_`📁/support/base` onde estão os checks das possiveis response dos testes e tambem armazena algumas constantes do projeto como os ENDPOINTS_

_`📁/support/config` contem todas as options de environment desde a url padrão usada, até as options dos tipos de teste SMOKE,LOAD,STRESS_

_`📁/tests` está todos os testes do projeto com todas as rotas possiveis da API_

## Configuração

## _Em /services/baseRest.js_

#### **Pode-se adicionar mais verbos a gama de testes, seguindo o mesmo padrão dos demais**

```javascript
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
    buildOptions(headers = {}, params = {}, token){
        return {
            headers: Object.assign({'Content-Type': 'application/json', 'monitor': 'false', 'Authorization': token}, headers),
            params: Object.assign({}, params)
        }
    }
}
```

## _Em /support/config/environment.js_

#### **Pode-se editar a baseUrl e as opitions dos tipos de testes**

```javascript
export const testConfig = {
    environment: {
        hml: {
            url: "http://localhost:3000"
        }
    },
    options: {
        smokeThresholdsLogin: {
            vus: 1,
            duration: '10s',
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01'],
                http_req_waiting: ['p(95)<1500'],
                http_req_connecting: ['p(95)<500'],
                iteration_duration: ['p(95)<2000'],
                checks: ['rate>0.9']
            }
        }
    }
}

```
#### **É possivel adicionar mais thresholds seguindo a documentação do k6**

+ <a href="https://k6.io/docs/using-k6/thresholds/">Thresholds - documentation</a>
<br>

## **_Em /support/base/baseChecks.js_**

#### **Estão as checagens dos testes Ex: status code**

```javascript
export class BaseChecks{
    checkStatusCode(response, expectedStatus = 200){
        check(response, {
            'status code check' : (r) => r.status === expectedStatus,
        })
    }
}

```
#### **Tambem é possivel adicionar mais checks seguindo a documentação do k6**

+ <a href="https://k6.io/docs/using-k6/checks/">Checks - documentation</a>
<br>

## **_Em /support/base/constants.js_**

#### **Estão os ENDPOINTS da API**
#### **Pode-se edita-los ou adicionar novos de acordo com os ENDPOINTS da API que irá ser testada**
```javascript
export const ENDPOINTS = {
    LOGIN_ENDPOINT: '/login',
    USER_ENDPOINT: '/usuarios',
    PRODUCTS_ENDPOINT: '/produtos',
    CARTS_ENDPOINTS: '/carrinhos'
}
```
## **_Exemplo de uma chamada da API_**

```javascript
const payloadLogin = {
        "email": user.email,
        "password": user.password
    }

    const resLogin = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payloadLogin)

```
#### `payloadLogin{ }` **contem um body com os campos email e senha que serão enviados para a API**

### **Em seguida é chamada a classe baseRest com o metodo `post`**
### **Passando como parametro o ENDPOINT e o payloadLogin ambos separados por virgula**

## Execução dos testes

## **_Caso queira executar toda a bateria de testes do projeto_**

```bash
# Para entrar na pasta correta
$ /Proj_Base_K6/tests/

# Para executar o script
$ ./scriptIndexPrincipal.sh {parametro}
# Este parametro é para a geração de massa de dados do faker
# Que representa a quantidade de usuarios que o faker irá gerar na lista
```
## **_Se preferir executar apenas uma rota especifica_**

```bash
# Para entrar na pasta correta
$ /Proj_Base_K6/tests/{endpoint}/
                      1-Login
                      2-Usuarios
                      3-Produtos
                      4-Carrinhos

# Para executar o script
$ ./scriptIndex{endpoint}.sh {parametro}
                Login
                Usuarios
                Produtos
                Carrinhos
```
## **_Se quiser executar diretamente pelo k6 use o comando_**

```bash
$ k6 run {nome_do_arquivo.js}
```
#### **Não esqueça da extensão do arquivo na hora da execução .sh ou .js**

### _Assim que o(s) teste(s) forem finalizados serão gerados arquivos index.html com todas as metricas registrada durante a execução, podendo ser visualizada abrindo o arquivo .html que está localizado dentro da pasta de cada arquivo executado_

