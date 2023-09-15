
echo "//////////////////////////////////////////"
echo "Inicio do Teste GET na rota Carrinhos"
echo "//////////////////////////////////////////"

echo "Load Test"

k6 run loadTest_getCarrinho.js

read -p "Pressione Enter para sair......"