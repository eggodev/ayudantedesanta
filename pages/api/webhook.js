import crypto from "crypto";
import getRawBody from "raw-body";
import md5 from "md5";

export default async function handler(req, res) {
  const body = await getRawBody(req);
  const hmacHeader = req.headers["x-adams-notify-hash"];
  const digest = md5("adams" + body + process.env.ADAMSPAY_API_SECRET);
  if (digest === hmacHeader) {
    const json = JSON.parse(rawBody.toString("utf-8"));

    if (json.notify.type === "debtStatus") {
      switch (json.debt.payStatus) {
        case "pending":
          console.log("email pending, include debt.payUrl");
        case "paid":
          console.log("email debt paid!");
        //update debt in sanity
        default:
          if (
            json.debt.objStatus.status !== "active" &&
            json.debt.objStatus.status !== "active"
          ) {
            console.log("something happened, send status");
          }
      }
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
