import nodemailer from "nodemailer";

export const sendEmail = async (
  from: string,
  to: string,
  name: string,
  phone: string,
  businessType: string,
) => {
  try {
    // Create a reusable transporter object
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: Bun.env.EMAIL, // Authenticated Email
        pass: Bun.env.EMAIL_PASSWORD,
      },
      connectionTimeout: 10000, // 10 seconds timeout for SMTP connection
    });

    console.log(`🔄 Sending email to: ${to}`);

    // Email Template
    const mailOptions = {
      from: Bun.env.EMAIL,
      replyTo: from,
      to,
      subject: `New Business Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${from}\nPhone: ${phone}\nBusiness Type: ${businessType}`,
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${from}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Type:</strong> ${businessType}</p>
        <hr>
        <p style="font-size: 14px; text-align: center; color: #777;">Maintained by <a href="https://webcre8tech.com" style="color:#0073e6; text-decoration: none;">WebCre8Tech</a></p>
      </div>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return {
      success: false,
      message: "Error sending email",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
