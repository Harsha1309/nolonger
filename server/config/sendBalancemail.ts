const nodemailer = require("nodemailer");
import { OAuth2Client } from "google-auth-library";
import { IBalance } from "./interface";
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;
const formData = require("form-data");
const Mailgun = require("mailgun.js");

const sendBalancemail = async (
  mobilenumber: string,
  withdraw: number,
  balance: IBalance
) => {
  const API_KEY = "d74b6832fc682bc2d1ba5faa95a5e0da-523596d9-c177f734";
  const DOMAIN = "pediageek.com";
  const mailgun = new Mailgun(formData);
  const client = mailgun.client({ username: "api", key: API_KEY });

  const messageData = {
    from: "PediaGeek <balance@pediageek.com>",
    to: "contact@pediageek.com",
    subject: "Withdraw",
    html: `<p>Mobile Number: ${mobilenumber}</p>
   <p>Profile url: pediagek.com/profile/${balance.user}</p>
    <p>balance: ${balance.balance}</p>
    <p>Withdraw: ${withdraw}</p>
            `,
  };

  client.messages
    .create(DOMAIN, messageData)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.error(err);
    });
};

export default sendBalancemail;
