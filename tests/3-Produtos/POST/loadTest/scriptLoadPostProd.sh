
echo "//////////////////////////////////////////"
echo "Inicio do Teste POST na rota Produtos"
echo "//////////////////////////////////////////"

echo "Load Test"

k6 run loadTest_postProdutos.js

read -p "Pressione Enter para sair......"