import crypto from "crypto";
import { User } from "../models/user.model.js";
import sendMeetingConfirmation from "../services/emailService.js"; 


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min expiry

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `
      <p>You requested a password reset.</p>
      <p>Click below to reset your password:</p>
      <a href="${resetUrl}" style="color:#4F46E5; font-weight:bold;">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `;

    await sendMeetingConfirmation({
      toEmail: user.email,
      toName: user.name || "",
      subject: "Password Reset Request",
      content: message,
    });

    res.json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
