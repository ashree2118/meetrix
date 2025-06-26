import SibApiV3Sdk from 'sib-api-v3-sdk';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY; 

const sendMeetingConfirmation = async ({ toEmail, toName, subject, content }) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = {
    to: [{ email: toEmail, name: toName }],
    sender: { email: 'your@email.com', name: 'Meetrix' },
    subject,
    htmlContent: content,
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendMeetingConfirmation;
