# Tiffix - Meal Subscription Platform

A modern meal subscription platform connecting customers with tiffin service providers.

## Project Structure

```
tiffix/
├── frontend/     # React frontend application
├── backend/      # Node.js backend API
└── docs/         # Project documentation
```

## Prerequisites

- Node.js (v20.17.0 or higher)
- MongoDB (v6.0 or higher)
- yarn package manager

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tiffix
   JWT_SECRET=your_jwt_secret
   PHONEPE_MERCHANT_ID=your_phonepe_merchant_id
   PHONEPE_API_KEY=your_phonepe_api_key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email
   SMTP_PASS=your_app_specific_password
   ```

4. Start the development server:
   ```bash
   yarn dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env` file with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_PHONEPE_MERCHANT_ID=your_phonepe_merchant_id
   ```

4. Start the development server:
   ```bash
   yarn start
   ```

## Features

- User authentication with OTP
- Meal plan subscription management
- PhonePe payment integration
- Vendor dashboard
- Admin panel
- Real-time order tracking
- Feedback system
- Email notifications

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

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 