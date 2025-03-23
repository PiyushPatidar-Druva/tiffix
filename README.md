# Tiffix - Meal Subscription Platform

A modern meal subscription platform connecting customers with tiffin service providers.

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/PiyushPatidar-Druva/tiffix.git
   cd tiffix
   ```

2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
   This script will:
   - Install Homebrew (if not installed)
   - Install MongoDB (if not installed)
   - Install Node.js (if not installed)
   - Install Yarn (if not installed)
   - Create necessary environment files
   - Install all dependencies for both frontend and backend

3. Update environment variables:
   
   Backend (`backend/.env`):
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tiffix
   JWT_SECRET=your_secure_jwt_secret_key_here
   PHONEPE_MERCHANT_ID=your_phonepe_merchant_id
   PHONEPE_API_KEY=your_phonepe_api_key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_specific_password
   ```

   Frontend (`frontend/.env`):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_PHONEPE_MERCHANT_ID=your_phonepe_merchant_id
   ```

4. Start the application:
   ```bash
   ./start.sh
   ```
   This script will:
   - Start MongoDB service
   - Start the backend server
   - Start the frontend development server
   - Handle graceful shutdown of all services on exit (Ctrl+C)

## Project Structure

```
tiffix/
├── frontend/     # React frontend application
├── backend/      # Node.js backend API
└── docs/         # Project documentation
```

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios

### Backend
- Node.js with Express
- TypeScript
- MongoDB
- JWT Authentication
- PhonePe API
- Nodemailer

## Features

- User authentication with OTP
- Meal plan subscription management
- PhonePe payment integration
- Vendor dashboard
- Admin panel
- Real-time order tracking
- Feedback system
- Email notifications

## Development

To manually start individual components:

1. Start MongoDB:
   ```bash
   brew services start mongodb-community
   ```

2. Start Backend:
   ```bash
   cd backend
   yarn dev
   ```

3. Start Frontend:
   ```bash
   cd frontend
   yarn start
   ```

## Troubleshooting

1. If MongoDB fails to start:
   ```bash
   brew services stop mongodb-community
   brew services start mongodb-community
   ```

2. If ports are already in use:
   - Backend: Change PORT in `backend/.env`
   - Frontend: Run on different port: `PORT=3001 yarn start`

3. Reset MongoDB:
   ```bash
   brew services stop mongodb-community
   rm -rf /usr/local/var/mongodb
   brew services start mongodb-community
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 