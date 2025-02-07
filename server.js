import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Allow requests from localhost:8000
const corsOptions = {
  origin: 'http://localhost:8000',  // Update this to match your frontend's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));  // Apply CORS configuration
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 't2605128@gmail.com',  // Replace with your email
        pass: 'bumcisxcnmvsetqb',  // Replace with your email password
      },
    });

    const mailOptions = {
      from: email,
      to: 'itmate07@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `You have a new message from the contact form:\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
