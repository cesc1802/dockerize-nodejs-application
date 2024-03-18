#!/bin/bash

# Replace these variables with your own values
EC2_PUBLIC_IP="publib ip"
EC2_USER="user"
SSH_KEY_PATH="/path/to/ssh-key"
DOCKER_COMPOSE_FILE="docker-compose.yml"


echo "Copying nessecery file to deploy ..."
ssh -i "$SSH_KEY_PATH" $EC2_USER@$EC2_PUBLIC_IP "mkdir -p dockerize-nodejs-application"
scp -i "$SSH_KEY_PATH" app.js docker-compose.yml Dockerfile .env.example package.json package-lock.json  $EC2_USER@$EC2_PUBLIC_IP:dockerize-nodejs-application
scp -i "$SSH_KEY_PATH" -r ./init-scripts $EC2_USER@$EC2_PUBLIC_IP:dockerize-nodejs-application


# SSH into EC2 instance and deploy
ssh -i "$SSH_KEY_PATH" $EC2_USER@$EC2_PUBLIC_IP << EOF
    # Move to the directory containing the Docker Compose file
    cd dockerize-nodejs-application

    # Stop any running containers (optional)
    docker compose -f "$DOCKER_COMPOSE_FILE" down

    # Start Docker Compose
    docker compose -f "$DOCKER_COMPOSE_FILE" up -d
EOF

echo "Deployment complete."