
parametro="$1"


cd loadTest/
bash scriptLoadGetUsers.sh "$parametro"


cd ../smokeTest/
bash scriptSmokeGetUsers.sh "$parametro"


cd ../stressTest/
bash scriptStressGetUsers.sh "$parametro"


read -p "Pressione Enter para sair......"