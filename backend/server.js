// backend/server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000; // Use port 5000 or whatever is available

// Middleware
app.use(cors()); // Allows requests from your React frontend
app.use(express.json()); // Parses JSON bodies of incoming requests

// Nodemailer transporter setup
// Replace with your actual email service provider details
// For Gmail, you might need to enable "Less secure app access" or use App Passwords
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g., 'smtp.gmail.com'
  port: process.env.EMAIL_PORT, // e.g., 587 for TLS, 465 for SSL
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Test transporter connection (optional, but good for debugging)
transporter.verify(function (error, success) {
  if (error) {
    console.error('Nodemailer transporter verification failed:', error);
  } else {
    console.log('Nodemailer transporter is ready to send messages');
  }
});

// API endpoint to send order email
app.post('/api/send-order-email', async (req, res) => {
  const { orderSummary } = req.body;

  if (!orderSummary) {
    return res.status(400).json({ message: 'Order summary is required.' });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: process.env.RECIPIENT_EMAIL, // Recipient email (e.g., your bakery's email)
      subject: 'New Moli Cakes Order Received!',
      text: orderSummary,
      // html: `<p>${orderSummary.replace(/\n/g, '<br>')}</p>`, // For HTML email
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    res.status(200).json({ message: 'Order email sent successfully!', messageId: info.messageId });
  } catch (error) {
    console.error('Error sending order email:', error);
    res.status(500).json({ message: 'Failed to send order email.', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
