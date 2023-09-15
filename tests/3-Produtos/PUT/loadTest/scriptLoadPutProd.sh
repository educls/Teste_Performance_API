echo "//////////////////////////////////////////"
echo "Inicio do Teste PUT na rota Produtos"
echo "//////////////////////////////////////////"

echo "Load Test"

k6 run loadTest_putProdutos.js

read -p "Pressione Enter para sair......"