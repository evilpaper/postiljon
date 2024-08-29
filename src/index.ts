import { Hono } from "hono";
import { config } from "dotenv";
import nodemailer from "nodemailer";

config(); // Load .env variables

const app = new Hono();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE_HOST,
  port: parseInt(process.env.EMAIL_SERVICE_PORT!),
  secure: false, // Use SSL if true
  auth: {
    user: process.env.EMAIl_SERVICE_USER,
    pass: process.env.EMAIL_SERVICE_PASS,
  },
});

app.get("/", (c) => {
  return c.text("Welcome to Postiljon!");
});

app.post("/send-email", async (c) => {
  const body = await c.req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return c.json({ error: "All fields are required." }, 400);
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.RECEIVER_EMAIL!,
    subject: `Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return c.json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    return c.json(
      { success: false, message: "Failed to send email.", error: error },
      500
    );
  }
});

export default app;
