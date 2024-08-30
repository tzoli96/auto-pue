#!/bin/bash

# Determine the host IP address
HOST_IP=$(ip addr show docker0 | grep 'inet ' | awk '{ print $2 }' | cut -d/ -f1)

# Export the HOST_IP variable for Docker Compose to use
export HOST_IP

# Run Docker Compose with the extra_hosts setting
docker-compose down -v --remove-orphans &&
docker-compose build --no-cache &&
docker-compose up -d
