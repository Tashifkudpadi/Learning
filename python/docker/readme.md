docker build -t fastapi . <!--to build the image-->
docker images <!--to list images-->
docker run --rm -it -p 8000:8000 fastapi bash <!--to run the container-->
docker ps -a <!--to list all containers (running and stopped)-->
docker rmi $(docker images -q) -f <!--to remove all images-->

<!-- after creating compose.yml -->

docker compose up --build <!--to start the app-->

<!-- or -->

docker compose up -d <!--to start the app in detached mode-->

<!-- to stop the app -->

docker compose down

<!-- to stop all containers -->

docker stop $(docker ps -q)

<!-- to remove all containers -->

docker rm $(docker ps -a -q)

docker --version <!--to check docker version-->
docker ps <!--to list running containers-->
uname -m <!--to check architecture m1/m2/m3 chip or intel-->
ls -l /var/run/docker.sock <!--to check permissions-->
