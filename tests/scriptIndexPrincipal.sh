
parametro="$1"


cd 1-Login/
bash scriptIndexLogin.sh "$parametro"


cd ../2-Usuarios/
bash scriptIndexUsuarios.sh "$parametro"


cd ../3-Produtos/
bash scriptIndexProdutos.sh "$parametro"


cd ../4-Carrinhos/
bash scriptIndexCarrinhos.sh

cd ../5-Fluxo/
bash scriptIndexFluxo.sh


read -p "Pressione Enter para sair......"