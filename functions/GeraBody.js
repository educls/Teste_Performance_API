export function geraBody(length, tipo) {
    const caracteres = '1A2BCD1EFGH2t2u3vwxfgh43IJKL365MNOPQbcd4efghijk5lW0XYZa6bcdef6ghij9kl563mnopqrs577tuv8wxfghijklm8no8pz01234P35Q4R5STUV3WXYZabcdefghij56789';
    let nome = '';
    let email = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        nome += caracteres.charAt(randomIndex);
    }

    if (tipo == 'usuario') {
        email = nome + '@exemplo.com';
        let resultUsuario = {
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        };
        return resultUsuario;
    } else if(tipo == 'put'){
        let resultPut = nome
        return resultPut
        
    } else {
        let resultProduto = {
            "nome": nome,
            "preco": 123,
            "descricao": "desc",
            "quantidade": 123
        };
        return resultProduto;
    }
}
