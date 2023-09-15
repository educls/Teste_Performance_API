
parametro="$1"


cd DELETE/
bash scriptIndexDelete.sh

cd ../GET/
bash scriptIndexGet.sh "$parametro"

cd ../POST/
bash scriptIndexPost.sh


read -p "Pressione Enter para sair......"