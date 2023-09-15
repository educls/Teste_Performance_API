[![NPM](https://img.shields.io/npm/l/react)](https://gitlab.com/edu_compass/sprints_compass/-/blob/pb_sprint7/Proj_Base_K6/LICENSE?ref_type=heads) 

<h1>Teste de Performance para API - K6</h1>

> Status: 🚦 Desenvolvendo


Se concentra em testar os diversos verbos de uma API (_GET, POST, PUT, DELETE_)<br>
o projeto está configurado para os seguintes tipos de teste,
_**Smoke Test / Load Test / Stress Test**_.<br>
Projeto desenvolvido exclusivamente para estudo próprio


## Instalação

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

## Oque cada pasta armazena

_`📁/data` é onde deve ser armazenado todas as massas de dados geradas pelo faker **sendo filtrados por static ou dynamic**_

_`📁/functions` estão as funções executadas nos scripts de teste_

_`📁/services` possue a classe dos respectivos serviços/verbos da API como o GET e POST_

_`📁/support/base` onde estão os checks das possiveis response dos testes e tambem armazena algumas constantes do projeto como os ENDPOINTS_

_`📁/support/config` contem todas as options de environment desde a url padrão usada, até as options dos tipos de teste SMOKE,LOAD,STRESS_

_`📁/tests` está todos os testes do projeto com todas as rotas possiveis da API_

## Configuração



















