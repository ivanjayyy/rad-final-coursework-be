import nodemailer from "nodemailer";

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password (not your normal password)
  },
});

// Function to send an email
export const sendEmailToUser = async (
  to: string,
  subject: string,
  body: string,
): Promise<void> => {
  await transporter.sendMail({
    from: `"💥 PawLink HQ 💥" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: body,
  });
};

// Function to send a welcome email
export const sendWelcomeEmail = async (
  to: string,
  username: string,
): Promise<void> => {
  await transporter.sendMail({
    from: `"💥 PawLink HQ 💥" <${process.env.EMAIL_USER}>`,
    to,
    subject: "💥 WELCOME TO THE RESCUE SQUAD, HERO! 💥",
    html: `
      <div style="font-family: 'Courier New', Courier, monospace, sans-serif; max-width: 480px; margin: 30px auto; padding: 36px 32px; background-color: #c084fc; border: 5px solid #000000; box-shadow: 12px 12px 0px 0px #000000, 16px 16px 20px rgba(0,0,0,0.15); border-radius: 4px;">
        
        <div style="background-color: #fef08a; border: 4px solid #000000; padding: 18px; margin-bottom: 32px; text-align: center; box-shadow: 4px 4px 0px #000000, 8px 8px 0px #000000; transform: rotate(-1deg); -webkit-transform: rotate(-1deg); -moz-transform: rotate(-1deg);">
          <h2 style="color: #000000; margin: 0; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; text-shadow: 2px 2px 0px #ffffff, 4px 4px 0px rgba(0,0,0,0.15);">
            💥 JOINED THE PACK! 💥
          </h2>
        </div>

        <div style="background-color: #22d3ee; border: 3px solid #000000; padding: 8px 16px; display: inline-block; margin-bottom: 24px; box-shadow: 4px 4px 0px #000000; transform: rotate(1.5deg); -webkit-transform: rotate(1.5deg); -moz-transform: rotate(1.5deg);">
          <span style="color: #000000; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
            📡 HANDLER: @${username || "NEW_HERO"}
          </span>
        </div>

        <div style="background-color: #ffffff; border: 3px solid #000000; padding: 20px; margin-bottom: 32px; box-shadow: 6px 6px 0px #000000;">
          <h3 style="color: #000000; margin: 0 0 12px 0; font-size: 16px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">
            ⚡ PET RADAR IS NOW ONLINE
          </h3>
          <p style="color: #000000; margin: 0; font-size: 13px; font-weight: 800; line-height: 1.6; text-transform: uppercase;">
            YOUR PATROL PROFILE IS OFFICIALLY LIVE IN OUR PET RECOVERY NETWORK. YOU ARE NOW EQUIPPED TO REPORT SIGHTINGS, TRACK LOST PETS, AND HELP REUNITE FURRY FRIENDS WITH THEIR FAMILIES.
          </p>
        </div>

        <div style="text-align: center; margin-bottom: 36px; transform: scale(1.02); -webkit-transform: scale(1.02); -moz-transform: scale(1.02);">
          <a href="${process.env.FRONTEND_URL || "https://pawlink-flame.vercel.app"}" style="text-decoration: none; display: inline-block;">
            <span style="font-family: 'Courier New', Courier, monospace; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #ffffff; background-color: #000000; padding: 14px 28px; border: 3px solid #ffffff; box-shadow: 4px 4px 0px #22d3ee, 8px 8px 0px #000000; transition: all 0.2s;">
              LAUNCH RADAR 🐾
            </span>
          </a>
        </div>

        <div style="border-top: 4px dashed #000000; padding-top: 20px; text-align: center;">
          <p style="color: #000000; font-size: 11px; font-weight: 900; margin: 0; text-transform: uppercase; background-color: rgba(255,255,255,0.4); padding: 8px; border: 2px dashed #000000;">
            * PREPARE FOR DISPATCH. THANK YOU FOR HELPING US PROTECT THE COMMUNITY. *
          </p>
        </div>

      </div>
    `,
  });
};

// Function to send an email with OTP
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
