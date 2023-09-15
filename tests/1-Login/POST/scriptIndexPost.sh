
parametro="$1"

echo "/////////////////////////////////////"
echo "Inicio do Teste Post na rota Login"
echo "/////////////////////////////////////"

echo "Load Test"
cd loadTest/
bash scriptLoad_postLogin.sh "$parametro"

echo "Smoke Test"
cd ../smokeTest/
bash scriptSmoke_postLogin.sh "$parametro"

echo "stressTest"
cd ../stressTest/
bash scriptStress_postLogin.sh "$parametro"


read -p "Pressione Enter para sair......"