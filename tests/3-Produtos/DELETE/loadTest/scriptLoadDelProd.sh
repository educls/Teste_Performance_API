


echo "//////////////////////////////////////////"
echo "Inicio do Teste DELETE na rota Produtos"
echo "//////////////////////////////////////////"

echo "Load Test"

k6 run loadTest_delProdutos.js

read -p "Pressione Enter para sair......"