echo "//////////////////////////////////////////"
echo "Inicio do Teste DELETE na rota Usuarios"
echo "//////////////////////////////////////////"

echo "Load Test"

k6 run loadTest_delUsuarios.js

read -p "Pressione Enter para sair......"