import { faker } from '@faker-js/faker';
import fs from 'fs'
import path from 'path';

const parametro = process.argv[2];

export function geraProducts(nroProducts){

    const DiretorioPath = 'C:/Users/edufi/Desktop/Proj_Sprint7/Proj_Base_K6/data/dynamic/'
    const ArquivoNome = 'Produtos.json'
    const Products = []

    for(let i = 0 ; i < nroProducts ; i++){
        const nome = `${faker.person.fullName()}${i}`
        const preco = i
        const descricao = `description`
        const quantidade = i

        const Product = {
            nome, preco, descricao, quantidade
        }
        Products.push(Product)
    }
    const JsonProdutos = JSON.stringify(Products, null, 2)

    const PathComplete = path.join(DiretorioPath, ArquivoNome)

    
    fs.writeFileSync(PathComplete, JsonProdutos)
        console.log('Usuarios salvos em massas/Usuarios.json')

    return Products
}

geraProducts(30)