import { Router } from "express";
import { sendOtp, verifyOtpController } from "../controller/mailController";

const mailRoutes = Router();

// POST /api/v1/mail/otp/send
mailRoutes.post("/send-otp", sendOtp);

// GET /api/v1/mail/otp/verify
mailRoutes.post("/verify-otp", verifyOtpController);

export default mailRoutes;
