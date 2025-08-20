import SibApiV3Sdk from "sib-api-v3-sdk";

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const sendMeetingConfirmation = async ({ toEmail, toName, subject, content }) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    to: [{ email: toEmail, name: toName }],
    sender: { email: "ashree2118@gmail.com", name: "Meetrix" }, // must be a verified sender in Brevo
    subject,
    htmlContent: content,
  };

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent result:", result);
  } catch (error) {
    console.error("❌ Brevo email error:", error.response?.body || error.message);
  }
};

export default sendMeetingConfirmation;
