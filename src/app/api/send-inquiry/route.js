// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req) {
//   try {
//     const data = await req.json();

//     // Configure transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER, // your gmail
//         pass: process.env.EMAIL_PASS, // app password
//       },
//     });

//     const message = Object.entries(data)
//       .map(([question, answer]) => `<b>${question}</b>: ${answer}`)
//       .join("<br/>");

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: "yourtargetemail@gmail.com", // ✅ replace with the fixed email
//       subject: "New Chatbot Order Details",
//       html: `<h3>New Order Information</h3>${message}`,
//     });

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Email error:", err);
//     return NextResponse.json({ success: false });
//   }
// }


import formidable from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    try {
      // Configure nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail', // or your email service
        auth: {
          user: process.env.EMAIL_USER, // your email
          pass: process.env.EMAIL_PASSWORD, // your email password or app password
        },
      });

      // Prepare email content
      const emailContent = `
        New Product Inquiry
        
        Name: ${fields.name}
        Product Type: ${fields.productType}
        Size: ${fields.size}
        Quantity: ${fields.quantity}
        Phone: ${fields.phone}
        Email: ${fields.email}
        Shipping Address: ${fields.address}
      `;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL, // where you want to receive inquiries
        subject: 'New Product Inquiry from Chatbot',
        text: emailContent,
        attachments: []
      };

      // Add file attachment if exists
      if (files.file) {
        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        mailOptions.attachments.push({
          filename: file.originalFilename,
          path: file.filepath
        });
      }

      // Send email
      await transporter.sendMail(mailOptions);

      // Clean up uploaded file
      if (files.file) {
        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        fs.unlinkSync(file.filepath);
      }

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  });
}