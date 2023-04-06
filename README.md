# demo


#### Install Docker using the convenience script🔗

- https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script

```sh
 curl -fsSL https://get.docker.com -o get-docker.sh
 sudo sh get-docker.sh
 ```

#### Generate and Link SSH Keys to your GitHub

```sh
ssh-keygen
cat ~/.ssh/id_rsa.pub
```

- https://github.com/settings/keys

#### Clone the repository

```sh
git clone git@github.com:joshxyzhimself/playground.git
```

#### Running with Docker Compose

```sh
# For redis
sudo sysctl vm.overcommit_memory=1

# Create .env file
bash ./env.sh

# Start Docker containers: PostgreSQL, PostgREST, Redis, Crestfall Authentication API
sudo docker compose up --build --force-recreate

# Start Docker containers as detached
sudo docker compose up --build --force-recreate --detach

# Cleanup
sudo rm -rf ./docker/volumes/
```