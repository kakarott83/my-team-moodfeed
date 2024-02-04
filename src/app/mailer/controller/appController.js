const nodemailer = require('nodemailer')
const env = require("./env");
const Mailjet = require("node-mailjet");
const mailjet = Mailjet.apiConnect(
   env.MAILJET_API_KEY,
    env.MAILJET_API_SECRET
);



const signUp = async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();

    let config = {
        service: "Gmail",
        auth: {
          user: MAIL,
          pass: PASSWORD,
        },
      };

    const transporter = nodemailer.createTransport(config);

    let message ={
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      };

    transporter.sendMail(message)
    .then(() => {
        return res.status(201).json({msg: "send sucessfully"})
    })
    .catch(error => {
        return res.status(500).json({error})
    })


    //res.status(201).json("SignUp sucessfully")
}

const getBill = (req, res) => {
    res.status(201).json("GetBill sucessfully")
}

const sendMail = (req, res) => {
  const receiver = req.body.receiver

  console.log(req.body)

  sendEmail(req.body);
  res.status(201).json("Send Mail");
}

module.exports = {
    signUp,
    getBill,
    sendMail
}

function sendEmail(body) {
  console.log(body,'Body')
  return mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
          {
              From: {
                Email: body.sender,
                Name: body.senderName,
              },
              To: [
                {
                  Email: body.receiver,
                  Name: body.receiverName,
                },
              ],
              Subject: body.subject,
              HTMLPart: body.data,
            },
      ],
    })
    .then((result) => {
      //console.log("🚀 ~ .then ~ result:", result)
    })
    .catch((err) => {
      //console.log("🚀 ~ sendEmail ~ err:", err)
    });
}