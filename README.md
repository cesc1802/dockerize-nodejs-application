# Prerequisite
- Docker version 20.0.4 or above
- EC2 instance (you can follow infra folder to provision an EC2 machine)

# How to run?
- clone this repo to your ec2 machine.
- change directory to project folder.
- rename `.env.example` to `.env` file.
- run `docker compose up -d` to run application in backgroud mode.

# Test
- to make sure the server is running. execute this command
```
curl --location 'localhost:3000/ping' \
--header 'Content-Type: application/json'
```
- run this command to get list todo
```curl
curl --location 'localhost:3000/api/v1/todos' \
--header 'Content-Type: application/json'
```
- run this command to create a new todo
```
curl --location 'localhost:3000/api/v1/todos' \
--header 'Content-Type: application/json' \
--data '{
    "description": "demo description",
    "status": "todo"
}'
```