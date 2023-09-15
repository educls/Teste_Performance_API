echo "//////////////////////////////////////////"
echo "Inicio do Teste PUT na rota Usuarios"
echo "//////////////////////////////////////////"

echo "Load Test"

k6 run loadTest_putUsuarios.js

read -p "Pressione Enter para sair......"