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
    from: `"💥 PawLink HQ 💥" <${process.env.EMAIL_USER}>`,
    to,
    subject: "💥 CONFIRM YOUR IDENTITY! 💥",
    html: `
      <div style="font-family: 'Courier New', Courier, monospace, sans-serif; max-width: 480px; margin: 30px auto; padding: 36px 32px; background-color: #fef08a; border: 5px solid #000000; box-shadow: 12px 12px 0px 0px #000000, 16px 16px 20px rgba(0,0,0,0.15); border-radius: 4px;">
        
        <div style="background-color: #c084fc; border: 4px solid #000000; padding: 18px; margin-bottom: 32px; text-align: center; box-shadow: 4px 4px 0px #000000, 8px 8px 0px #000000; transform: rotate(-1.5deg); -webkit-transform: rotate(-1.5deg); -moz-transform: rotate(-1.5deg);">
          <h2 style="color: #000000; margin: 0; font-size: 26px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 0px #ffffff, 4px 4px 0px rgba(0,0,0,0.15);">
            💥 VERIFY EMAIL! 💥
          </h2>
        </div>

        <div style="background-color: #ef4444; border: 3px solid #000000; padding: 6px 16px; display: inline-block; margin-bottom: 24px; box-shadow: 4px 4px 0px #000000; transform: rotate(2deg); -webkit-transform: rotate(2deg); -moz-transform: rotate(2deg);">
          <span style="color: #ffffff; font-weight: 900; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
            ⚠️ CAUTION: 10 MIN EXPIRY!
          </span>
        </div>

        <div style="background-color: #ffffff; border: 3px solid #000000; padding: 16px; margin-bottom: 32px; box-shadow: 5px 5px 0px #000000;">
          <p style="color: #000000; margin: 0; font-size: 14px; font-weight: 800; line-height: 1.6; text-transform: uppercase;">
            USE THE SECRET VERIFICATION CODE ENCLOSED BELOW TO UNLOCK YOUR ACCESS CONTROL AND CONFIRM ACCOUNT INITIALIZATION.
          </p>
        </div>

        <div style="background: #22d3ee; border: 5px solid #000000; padding: 28px 16px; text-align: center; box-shadow: 4px 4px 0px #000000, 8px 8px 0px #f43f5e, 12px 12px 0px #000000; margin-bottom: 36px; transform: scale(1.02); -webkit-transform: scale(1.02); -moz-transform: scale(1.02);">
          <span style="font-family: 'Courier New', Courier, monospace; font-size: 46px; font-weight: 900; letter-spacing: 10px; color: #ffffff; background-color: #000000; padding: 8px 20px 8px 28px; border: 3px solid #ffffff; display: inline-block; box-shadow: inset 4px 4px 0px rgba(255,255,255,0.2), 4px 4px 0px rgba(0,0,0,0.3);">
            ${otp}
          </span>
        </div>

        <div style="border-top: 4px dashed #000000; padding-top: 20px; text-align: center;">
          <p style="color: #18181b; font-size: 11px; font-weight: 900; margin: 0; text-transform: uppercase; background-color: rgba(0,0,0,0.05); padding: 8px; border: 2px dashed #000000;">
            * IF YOU DID NOT TRIGGER THIS TRANSMISSION, DISREGARD PROMPTLY. *
          </p>
        </div>

      </div>
    `,
  });
};
