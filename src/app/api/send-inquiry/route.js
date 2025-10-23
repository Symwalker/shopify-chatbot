// // import nodemailer from 'nodemailer';

// // export default async function POST(req, res) {
// //   console.log(req);
  
// //   if (req.method !== 'POST') {
// //     return res.status(405).json({ message: 'Method not allowed' });
// //   }

// //   try {
// //     const { name, phone, email, address, products } = req.body;
// //     console.log(name, phone, email, address, products);
    
// //     const transporter = nodemailer.createTransport({
// //       service: 'gmail',
// //       auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASSWORD,
// //       },
// //     });

// //     // Build product details HTML
// //     let productDetailsHTML = '';
    
// //     products.forEach((product, index) => {
// //       let fileHTML = '';
      
// //       if (product.fileImage) {
// //         // Check if it's an image URL (most Cloudinary images)
// //         const isImage = product.fileImage.includes('/image/') || 
// //                        product.fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i);
        
// //         if (isImage) {
// //           fileHTML = `
// //             <div style="margin: 15px 0;">
// //               <img src="${product.fileImage}" style="max-width: 400px; border-radius: 8px; border: 1px solid #ddd; display: block;" alt="${product.fileName}">
// //               <p style="margin: 5px 0; font-size: 12px; color: #666;">
// //                 <a href="${product.fileImage}" style="color: #16a34a; text-decoration: none;" target="_blank">🔗 View Full Size</a>
// //               </p>
// //             </div>
// //           `;
// //         } else {
// //           fileHTML = `
// //             <div style="margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px;">
// //               <p style="margin: 0;">📎 File: ${product.fileName}</p>
// //               <a href="${product.fileImage}" style="color: #16a34a; text-decoration: none; font-weight: bold;" target="_blank">📥 Download File</a>
// //             </div>
// //           `;
// //         }
// //       }

// //       productDetailsHTML += `
// //         <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #16a34a;">
// //           <h3 style="color: #16a34a; margin: 0 0 10px 0;">Product ${index + 1}: ${product.productName}</h3>
// //           ${fileHTML}
// //           <p style="margin: 8px 0;"><strong>📏 Size:</strong> ${product.size}</p>
// //           <p style="margin: 8px 0;"><strong>🔢 Quantity:</strong> ${product.quantity}</p>
// //         </div>
// //       `;
// //     });

// //     const emailHTML = `
// //       <!DOCTYPE html>
// //       <html>
// //       <head>
// //         <meta charset="UTF-8">
// //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //         <style>
// //           body { 
// //             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
// //             line-height: 1.6; 
// //             color: #333; 
// //             margin: 0;
// //             padding: 0;
// //             background-color: #f5f5f5;
// //           }
// //           .container { 
// //             max-width: 600px; 
// //             margin: 20px auto; 
// //             background: white;
// //             border-radius: 12px;
// //             overflow: hidden;
// //             box-shadow: 0 4px 6px rgba(0,0,0,0.1);
// //           }
// //           .header { 
// //             background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); 
// //             color: white; 
// //             padding: 30px 20px; 
// //             text-align: center; 
// //           }
// //           .header h1 {
// //             margin: 0 0 10px 0;
// //             font-size: 28px;
// //           }
// //           .header p {
// //             margin: 0;
// //             opacity: 0.9;
// //           }
// //           .content { 
// //             padding: 30px 20px; 
// //           }
// //           .info-section { 
// //             background: #f8fffe; 
// //             padding: 20px; 
// //             border-left: 4px solid #16a34a; 
// //             margin-bottom: 25px;
// //             border-radius: 4px;
// //           }
// //           .info-section h2 {
// //             color: #16a34a; 
// //             margin-top: 0;
// //             font-size: 20px;
// //           }
// //           .info-section p {
// //             margin: 10px 0;
// //             font-size: 15px;
// //           }
// //           .products-title {
// //             color: #16a34a;
// //             font-size: 22px;
// //             margin: 30px 0 20px 0;
// //             padding-bottom: 10px;
// //             border-bottom: 2px solid #16a34a;
// //           }
// //           .footer { 
// //             text-align: center; 
// //             padding: 20px; 
// //             background: #f8f9fa;
// //             color: #666; 
// //             font-size: 13px; 
// //           }
// //           .footer p {
// //             margin: 5px 0;
// //           }
// //           a {
// //             color: #16a34a;
// //             text-decoration: none;
// //           }
// //           a:hover {
// //             text-decoration: underline;
// //           }
// //         </style>
// //       </head>
// //       <body>
// //         <div class="container">
// //           <div class="header">
// //             <h1>🛍️ New Product Inquiry</h1>
// //             <p>Fashion in Every Patch</p>
// //           </div>
          
// //           <div class="content">
// //             <div class="info-section">
// //               <h2>Customer Information</h2>
// //               <p><strong>👤 Name:</strong> ${name}</p>
// //               <p><strong>📞 Phone:</strong> ${phone}</p>
// //               <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
// //               <p><strong>📍 Address:</strong> ${address}</p>
// //             </div>

// //             <h2 class="products-title">🛍️ Product Details</h2>
// //             ${productDetailsHTML}
// //           </div>

// //           <div class="footer">
// //             <p><strong>Customer Service Assistant</strong></p>
// //             <p>This inquiry was submitted through the chatbot</p>
// //             <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
// //           </div>
// //         </div>
// //       </body>
// //       </html>
// //     `;

// //     const mailOptions = {
// //       from: process.env.EMAIL_USER,
// //       to: process.env.RECIPIENT_EMAIL,
// //       subject: `🛍️ New Product Inquiry from ${name}`,
// //       html: emailHTML,
// //     };

// //     await transporter.sendMail(mailOptions);

// //     res.status(200).json({ message: 'Email sent successfully' });
// //   } catch (error) {
// //     console.error('Error sending email:', error);
// //     res.status(500).json({ error: 'Error sending email' });
// //   }
// // }

// // src/app/api/send-inquiry/route.js
// import nodemailer from 'nodemailer';

// export async function POST(request) {
//   try {
//     const contentType = (request.headers.get('content-type') || '').toLowerCase();
//     let name = '';
//     let phone = '';
//     let email = '';
//     let address = '';
//     let products = [];
//     const attachments = []; // will hold nodemailer attachments (buffers)

//     if (contentType.includes('multipart/form-data')) {
//       // parse FormData (files come here as File web-API objects)
//       const formData = await request.formData();

//       name = formData.get('name') || '';
//       phone = formData.get('phone') || '';
//       email = formData.get('email') || '';
//       address = formData.get('address') || '';

//       const totalProducts = parseInt(formData.get('total_products') || '0', 10) || 0;
//       for (let i = 0; i < totalProducts; i++) {
//         const productName = formData.get(`product_${i}_name`) || `Product ${i + 1}`;
//         const size = formData.get(`product_${i}_size`) || '';
//         const quantity = formData.get(`product_${i}_quantity`) || '';

//         // file may exist as a File object
//         const file = formData.get(`product_${i}_file`);
//         let fileImage = ''; // no URL available for raw file
//         let fileName = '';

//         if (file && typeof file === 'object' && 'name' in file) {
//           const arrayBuffer = await file.arrayBuffer();
//           const buffer = Buffer.from(arrayBuffer);
//           fileName = file.name || `attachment-${i}`;
//           // add as attachment
//           attachments.push({
//             filename: fileName,
//             content: buffer,
//             contentType: file.type || 'application/octet-stream',
//           });
//         }

//         products.push({
//           productName,
//           size,
//           quantity,
//           fileName,
//           fileImage, // empty because we only have the raw file
//         });
//       }
//     } else {
//       // assume JSON payload (Option B: client uploaded files to Cloudinary and sent URLs)
//       const json = await request.json();
//       ({ name = '', phone = '', email = '', address = '', products = [] } = json);
//       // products expected as array with { productName, size, quantity, fileImage, fileName }
//     }

//     // Build productDetailsHTML similar to your current implementation
//     let productDetailsHTML = '';

//     products.forEach((product, index) => {
//       let fileHTML = '';

//       if (product.fileImage) {
//         // If we have a URL (Cloudinary), embed it
//         const isImage = /\\.(jpg|jpeg|png|gif|webp)$/i.test(product.fileName || product.fileImage);
//         if (isImage) {
//           fileHTML = `
//             <div style="margin: 15px 0;">
//               <img src="${product.fileImage}" style="max-width: 400px; border-radius: 8px; border: 1px solid #ddd; display: block;" alt="${product.fileName || ''}">
//               <p style="margin: 5px 0; font-size: 12px; color: #666;">
//                 <a href="${product.fileImage}" style="color: #16a34a; text-decoration: none;" target="_blank">🔗 View Full Size</a>
//               </p>
//             </div>
//           `;
//         } else {
//           fileHTML = `
//             <div style="margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px;">
//               <p style="margin: 0;">📎 File: ${product.fileName || 'attachment'}</p>
//               <a href="${product.fileImage}" style="color: #16a34a; text-decoration: none; font-weight: bold;" target="_blank">📥 Download File</a>
//             </div>
//           `;
//         }
//       } else if (product.fileName) {
//         // show filename if we have an attachment (no URL)
//         fileHTML = `
//           <div style="margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px;">
//             <p style="margin: 0;">📎 File attached: ${product.fileName}</p>
//           </div>
//         `;
//       }

//       productDetailsHTML += `
//         <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #16a34a;">
//           <h3 style="color: #16a34a; margin: 0 0 10px 0;">Product ${index + 1}: ${product.productName}</h3>
//           ${fileHTML}
//           <p style="margin: 8px 0;"><strong>📏 Size:</strong> ${product.size}</p>
//           <p style="margin: 8px 0;"><strong>🔢 Quantity:</strong> ${product.quantity}</p>
//         </div>
//       `;
//     });

//     const emailHTML = `<!doctype html>...` // use the same HTML you already had, inserting ${productDetailsHTML} and customer fields

//     // Create transporter — ensure env vars are set in your runtime (Vercel, Docker, .env local)
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD, // use an App Password for Gmail when 2FA enabled
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.RECIPIENT_EMAIL,
//       subject: `🛍️ New Product Inquiry from ${name || 'Customer'}`,
//       html: emailHTML,
//       attachments: attachments.length ? attachments : undefined,
//     };

//     await transporter.sendMail(mailOptions);

//     return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (err) {
//     console.error('send-inquiry error', err);
//     return new Response(JSON.stringify({ error: String(err) }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }


// ...existing code...
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const contentType = (request.headers.get('content-type') || '').toLowerCase();
    let name = '';
    let phone = '';
    let email = '';
    let address = '';
    let products = [];
    const attachments = []; // will hold nodemailer attachments (buffers)

    if (contentType.includes('multipart/form-data')) {
      // ...existing code...
    } else {
      const json = await request.json();
      ({ name = '', phone = '', email = '', address = '', products = [] } = json);
    }

    console.log('send-inquiry payload:', { name, phone, email, address, products });

    // Build productDetailsHTML similar to your current implementation
    let productDetailsHTML = '';

    products.forEach((product, index) => {
      let fileHTML = '';

      if (product.fileImage) {
        const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(product.fileName || product.fileImage);
        if (isImage) {
          fileHTML = `
            <div style="margin: 15px 0;">
              <img src="${product.fileImage}" style="max-width: 400px; border-radius: 8px; border: 1px solid #ddd; display: block;" alt="${product.fileName || ''}">
              <p style="margin: 5px 0; font-size: 12px; color: #666;">
                <a href="${product.fileImage}" style="color: #16a34a; text-decoration: none;" target="_blank">🔗 View Full Size</a>
              </p>
            </div>
          `;
        } else {
          fileHTML = `
            <div style="margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px;">
              <p style="margin: 0;">📎 File: ${product.fileName || 'attachment'}</p>
              <a href="${product.fileImage}" style="color: #16a34a; text-decoration: none; font-weight: bold;" target="_blank">📥 Download File</a>
            </div>
          `;
        }
      } else if (product.fileName) {
        fileHTML = `
          <div style="margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px;">
            <p style="margin: 0;">📎 File attached: ${product.fileName}</p>
          </div>
        `;
      }

      productDetailsHTML += `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #16a34a;">
          <h3 style="color: #16a34a; margin: 0 0 10px 0;">Product ${index + 1}: ${product.productName}</h3>
          ${fileHTML}
          <p style="margin: 8px 0;"><strong>📏 Size:</strong> ${product.size}</p>
          <p style="margin: 8px 0;"><strong>🔢 Quantity:</strong> ${product.quantity}</p>
        </div>
      `;
    });

    // --- Replace placeholder with full HTML (this is the important fix) ---
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height:1.6; color:#333; margin:0; padding:0; background:#f5f5f5; }
          .container { max-width:600px; margin:20px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 6px rgba(0,0,0,0.08); }
          .header { background:linear-gradient(135deg,#16a34a 0%,#15803d 100%); color:white; padding:30px 20px; text-align:center; }
          .header h1 { margin:0 0 6px 0; font-size:24px; }
          .content { padding:24px; }
          .info { background:#f8fffe; padding:16px; border-left:4px solid #16a34a; border-radius:6px; margin-bottom:18px; }
          .info p { margin:6px 0; font-size:14px; }
          .products-title { color:#16a34a; font-size:18px; margin:12px 0; }
          .footer { text-align:center; padding:16px; background:#f8f9fa; color:#666; font-size:12px; }
          a { color:#16a34a; text-decoration:none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛍️ New Product Inquiry</h1>
            <p>Fashion in Every Patch</p>
          </div>
          <div class="content">
            <div class="info">
              <h2 style="margin:0 0 8px 0;color:#16a34a">Customer Information</h2>
              <p><strong>👤 Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>📞 Phone:</strong> ${escapeHtml(phone)}</p>
              <p><strong>📧 Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              <p><strong>📍 Address:</strong> ${escapeHtml(address)}</p>
            </div>

            <h3 class="products-title">🛍️ Product Details</h3>
            ${productDetailsHTML || '<p>No products provided.</p>'}
          </div>
          <div class="footer">
            <p><strong>Customer Service Assistant</strong></p>
            <p>This inquiry was submitted through the chatbot</p>
            <p>© ${new Date().getFullYear()} Your Company</p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log('email HTML length:', emailHTML.length);

    // Create transporter — ensure env vars are set in your runtime
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `🛍️ New Product Inquiry from ${name || 'Customer'}`,
      html: emailHTML,
      attachments: attachments.length ? attachments : undefined,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-inquiry error', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// small helper to avoid basic HTML injection in interpolated fields
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
// ...existing code...