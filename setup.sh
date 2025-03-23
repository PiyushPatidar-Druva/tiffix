#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    print_message "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    print_message "Homebrew is already installed"
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    print_message "Installing MongoDB..."
    brew tap mongodb/brew
    brew install mongodb-community
else
    print_message "MongoDB is already installed"
fi

# Start MongoDB service
print_message "Starting MongoDB service..."
brew services start mongodb-community

# Wait for MongoDB to start
sleep 5

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    print_error "MongoDB failed to start"
    exit 1
fi

print_message "MongoDB is running"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_message "Installing Node.js..."
    brew install node
else
    print_message "Node.js is already installed"
fi

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    print_message "Installing Yarn..."
    npm install -g yarn
else
    print_message "Yarn is already installed"
fi

# Create environment files
print_message "Creating environment files..."

# Backend .env
cat > backend/.env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tiffix
JWT_SECRET=your_secure_jwt_secret_key_here
PHONEPE_MERCHANT_ID=your_phonepe_merchant_id
PHONEPE_API_KEY=your_phonepe_api_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
EOL

# Frontend .env
cat > frontend/.env << EOL
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_PHONEPE_MERCHANT_ID=your_phonepe_merchant_id
EOL

# Install backend dependencies
print_message "Installing backend dependencies..."
cd backend
yarn install

# Install frontend dependencies
print_message "Installing frontend dependencies..."
cd ../frontend
yarn install

cd ..

# Create a start script
cat > start.sh << EOL
#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Start MongoDB if not running
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "\${GREEN}Starting MongoDB...\${NC}"
    brew services start mongodb-community
    sleep 5
fi

# Start backend
echo -e "\${GREEN}Starting backend server...\${NC}"
cd backend
yarn dev &
BACKEND_PID=\$!

# Wait for backend to start
sleep 5

# Start frontend
echo -e "\${GREEN}Starting frontend server...\${NC}"
cd ../frontend
yarn start &
FRONTEND_PID=\$!

# Function to handle script termination
cleanup() {
    echo -e "\${GREEN}Shutting down servers...\${NC}"
    kill \$BACKEND_PID \$FRONTEND_PID
    brew services stop mongodb-community
    exit 0
}

# Register cleanup function
trap cleanup SIGINT SIGTERM

# Keep script running
wait
EOL

# Make scripts executable
chmod +x setup.sh start.sh

print_message "Setup completed successfully!"
print_message "To start the application, run: ./start.sh"
print_message "Note: Please update the environment variables in backend/.env and frontend/.env with your actual values before starting the application." 