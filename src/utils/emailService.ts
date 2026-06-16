import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password (not your normal password)
  },
});

export const sendOtpEmail = async (to: string, otp: string): Promise<void> => {
  await transporter.sendMail({
    from: `"Pet Finder" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your email verification code",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
        <h2 style="color: #111827; margin: 0 0 8px;">Verify your email</h2>
        <p style="color: #6b7280; margin: 0 0 24px; font-size: 14px;">
          Use the code below to confirm your email change. It expires in <strong>10 minutes</strong>.
        </p>
        <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; text-align: center;">
          <span style="font-size: 36px; font-weight: 700; letter-spacing: 10px; color: #2563eb;">${otp}</span>
        </div>
        <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
};
