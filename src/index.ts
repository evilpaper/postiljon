import { Hono } from "hono";
import { config } from "dotenv";

config(); // Load .env variables

const app = new Hono();

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_SERVICE,
//   port: parseInt(process.env.EMAIL_PORT!),
//   secure: false, // Use SSL if true
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

app.get("/", (c) => {
  return c.text("Welcome to Postiljon!");
});
app.post("/send-email", async (c) => {
  const body = await c.req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return c.json({ error: "All fields are required." }, 400);
  }

  // try {
  //   await transporter.sendMail(mailOptions);
  //   return c.json({ success: true, message: "Email sent successfully." });
  // } catch (error) {
  //   return c.json({ success: false, message: "Failed to send email." }, 500);
  // }
});

export default app;
