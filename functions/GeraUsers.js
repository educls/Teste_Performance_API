import { faker } from '@faker-js/faker';
import fs from 'fs'
import path from 'path';

const parametro = process.argv[2];

export function geraUsers(nroUsers){

    const DiretorioPath = 'C:/Users/edufi/Desktop/Proj_Sprint7/Proj_Base_K6/data/dynamic/'
    const ArquivoNome = 'Usuarios.json'
    const Users = []

    for(let i = 0 ; i < nroUsers ; i++){
        const nome = `${faker.person.fullName()}${i}`
        const email = `${i}${faker.internet.email()}`
        const password = faker.internet.password()
        const adm = faker.datatype.boolean()
        const administrador = adm.toString()

        const User = {
            nome, email, password, administrador
        }
        Users.push(User)
    }
    const JsonUsuarios = JSON.stringify(Users, null, 2)

    const PathComplete = path.join(DiretorioPath, ArquivoNome)

    
    fs.writeFileSync(PathComplete, JsonUsuarios)
        console.log('Usuarios salvos em massas/Usuarios.json')

    return Users
}

geraUsers(parametro)
