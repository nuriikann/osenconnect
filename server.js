const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');



const app = express();
const PORT = 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

// Nodemailer için bağlantı ayarları
const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net", 
    port: 465, 
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // doğru şifrenizi buraya ekleyin
    },
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP connection error:", error);
    } else {
        console.log("SMTP server is ready to take messages.");
    }
});

// Serve the form
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index-tr.html");
});

// Email sending route
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    // E-posta seçenekleri
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: "sales@osenconnect.com",
        subject: "New Contact Form Submission",
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
    };

    try {
        // E-posta gönderimi
        await transporter.sendMail(mailOptions);
        res.status(200).send("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send(`Error sending email: ${error.message}`);
    }
});

