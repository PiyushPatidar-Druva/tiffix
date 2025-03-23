import nodemailer from 'nodemailer';
import { config } from '../config';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass
  }
});

export const sendOTP = async (email: string, otp: string) => {
  try {
    await transporter.sendMail({
      from: `"Tiffix" <${config.smtp.user}>`,
      to: email,
      subject: 'OTP for Tiffix Account Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Tiffix!</h2>
          <p>Your OTP for account verification is:</p>
          <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return false;
  }
};

export const sendSubscriptionConfirmation = async (email: string, subscriptionDetails: any) => {
  try {
    await transporter.sendMail({
      from: `"Tiffix" <${config.smtp.user}>`,
      to: email,
      subject: 'Subscription Confirmation - Tiffix',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for subscribing to Tiffix!</h2>
          <p>Your subscription details:</p>
          <ul>
            <li>Plan: ${subscriptionDetails.planName}</li>
            <li>Duration: ${subscriptionDetails.duration} days</li>
            <li>Start Date: ${new Date(subscriptionDetails.startDate).toLocaleDateString()}</li>
            <li>End Date: ${new Date(subscriptionDetails.endDate).toLocaleDateString()}</li>
            <li>Amount Paid: ₹${subscriptionDetails.totalAmount}</li>
          </ul>
          <p>Your meals will be delivered to:</p>
          <p>${subscriptionDetails.deliveryAddress.street}, ${subscriptionDetails.deliveryAddress.city}, ${subscriptionDetails.deliveryAddress.state} - ${subscriptionDetails.deliveryAddress.pincode}</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error('Error sending subscription confirmation:', error);
    return false;
  }
}; 