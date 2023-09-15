

echo "Executando o arquivo GeraUsers.js e criando a massa de dados"

node GeraUsers.js

echo "Criando......"
sleep 2

echo "Massa de dados criada"

sleep 1

echo "Executando script k6"

cd C:/Users/edufi/Desktop/Proj_Sprint7/Proj_Base_K6/tests/1-Login/POST

k6 run smokeTest_postLogin.js

pause