

echo "//////////////////////////////////////////"
echo "Inicio do Teste POST na rota Usuarios"
echo "//////////////////////////////////////////"

echo "Load Test"

k6 run loadTest_postUsuarios.js

read -p "Pressione Enter para sair......"