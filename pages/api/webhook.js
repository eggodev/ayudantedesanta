import crypto from "crypto";
import getRawBody from "raw-body";

export default async function handler(req, res) {
  const rawBody = await getRawBody(req);
  const bodySignature = sha1("adams", rawBody, process.env.ADAMSPAY_API_SECRET);

  if (bodySignature !== req.headers["x-adams-notify-hash"]) {
    return res.status(403).json({
      code: "invalid_signature",
      error: "signature didn't match",
    });
  }

  const json = JSON.parse(rawBody.toString("utf-8"));

  switch (json.type) {
    case "project.created":
    // ...
  }

  res.status(200).end("OK");
}

function sha1(data, secret) {
  return crypto.createHmac("sha1", secret).update(data).digest("hex");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
