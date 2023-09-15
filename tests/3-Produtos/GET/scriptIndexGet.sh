
parametro="$1"


cd loadTest/
bash scriptLoadGetProd.sh "$parametro"

cd ../smokeTest/
bash scriptSmokeGetProd.sh "$parametro"

cd ../stressTest/
bash scriptStressGetProd.sh "$parametro"


read -p "Pressione Enter para sair......"