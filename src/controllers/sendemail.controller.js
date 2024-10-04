import nodemailer from 'nodemailer'
// import nodemailer from "nodemailer";

export const emailHelper = async (name,to,from, subject, message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: to,
      pass: "dcmq pxel brby lyys",
    },
  });

  let mailOptions = {
    from: `${name} ${from}`,
    to: to,
    subject: subject,
    text: message,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const sendEmail = async (req, res) => {
  const {name, to, from, subject, message } = req.body;
  try {
    const response = await emailHelper(name, to, from, subject, message);
   res.status(200).json({error: null, message: "Send message successfully!"})
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Send message failed" });
  }
};