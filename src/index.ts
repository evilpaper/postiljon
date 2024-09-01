import { Hono } from "hono";
import { config } from "dotenv";
import { Resend } from "resend";

config(); // Load .env variables

const resend = new Resend(process.env.RESEND_API_KEY);
const app = new Hono();

const senderEmail = process.env.SENDER_EMAIL || "<onboarding@resend.dev>";

app.get("/", (c) => {
  return c.text("Welcome to Postiljon!");
});

app.post("/send-email", async (c) => {
  const body = await c.req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return c.json({ error: "All fields are required." }, 400);
  }

  try {
    await resend.emails.send({
      from: `${name} ${senderEmail}`, // The domain need to be verified at Resend
      to: [process.env.RECEIVER_EMAIL!],
      subject: `Message from ${name}`,
      text: `Message: ${message} Contact email: ${email}`,
    });
    return c.json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    return c.json(
      { success: false, message: "Failed to send email.", error: error },
      500
    );
  }
});

export default app;
