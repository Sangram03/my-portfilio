const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer'); // For email functionality (optional)

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Replace with your main HTML file
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Simple form validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Optionally, send an email (you can configure a mail service here)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-email-password', // Replace with your email password or use OAuth
    },
  });

  const mailOptions = {
    from: email,
    to: 'your-email@gmail.com', // Replace with your email
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.json({ message: 'Form submitted successfully!' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
