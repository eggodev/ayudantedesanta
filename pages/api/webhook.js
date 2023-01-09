import crypto from "crypto";
import getRawBody from "raw-body";
import md5 from "md5";

export default async function handler(req, res) {
  const body = await getRawBody(req);
  const hmacHeader = req.headers["x-adams-notify-hash"];
  const digest = md5("adams" + body + process.env.ADAMSPAY_API_SECRET);
  if (digest === hmacHeader) {
    const json = JSON.parse(body.toString("utf-8"));
    console.log(json);

    if (json.notify.type === "debtStatus") {      
      let message = "";
      switch (json.debt.payStatus.status) {
        case "pending":
          message = `Su pedido aun esta pendiente de pago, ingrese al siguiente enlace para finalizar su compra!: ${json.debt.payUrl}`;
          break;
        case "paid":
          message = `Muchas gracias por su compra!. Ya nos disponemos a realizar el envío! Feliz Navidad! :)`;
          //update debt in sanity
          break;        
        default:
          message = `La compra no fue procesada, por favor contacte con nuestro soporte: El estado de la deuda cambió a: ${json.debt.objStatus.status}`;
      }
      const email = json.debt.target.label;      
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.USERMAIL,
            pass: process.env.PASSMAIL,
        }
      });
      let info = await transporter.sendMail({
        from: 'info@ayudantedesanta.com',
        to: email,
        subject: "Compra realizada en ayudantedesanta.com",
        text:message
      })
      .then((response)=>{console.log(response)})
      .catch((error)=>{console.log(error)});
    }

    res.status(200).end("OK");
  } else {
    // INVALID - Respond with 401 Unauthorized
    res.status(401).end();
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
