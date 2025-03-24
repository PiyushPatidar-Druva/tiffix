#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Start MongoDB if not running
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${GREEN}Starting MongoDB...${NC}"
    brew services start mongodb-community
    sleep 5
fi

# Start backend
echo -e "${GREEN}Starting backend server...${NC}"
cd backend
yarn dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start frontend
echo -e "${GREEN}Starting frontend server...${NC}"
cd ../frontend
yarn start &
FRONTEND_PID=$!

# Function to handle script termination
cleanup() {
    echo -e "${GREEN}Shutting down servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID
    brew services stop mongodb-community
    exit 0
}

# Register cleanup function
trap cleanup SIGINT SIGTERM

# Keep script running
wait
