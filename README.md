# demo

#### Usage

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