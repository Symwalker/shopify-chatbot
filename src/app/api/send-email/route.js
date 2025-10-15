import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    const message = Object.entries(data)
      .map(([question, answer]) => `<b>${question}</b>: ${answer}`)
      .join("<br/>");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "yourtargetemail@gmail.com", // ✅ replace with the fixed email
      subject: "New Chatbot Order Details",
      html: `<h3>New Order Information</h3>${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ success: false });
  }
}
