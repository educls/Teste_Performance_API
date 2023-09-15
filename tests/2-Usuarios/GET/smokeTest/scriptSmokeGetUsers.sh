
parametro="$1"

echo "Executando o arquivo GeraUsers.js e criando a massa de dados"

if [ -z "$parametro" ]; then
    echo "Nenhum parâmetro foi passado para o script."
else
    echo "Criando......"
    node C:/Users/edufi/Desktop/Proj_Sprint7/Proj_Base_K6/functions/GeraUsers.js "$parametro"
fi

sleep 2

echo "Executando script k6"

echo "Smoke Test"

k6 run smokeTest_GetUsuario.js

read -p "Pressione Enter para sair......"