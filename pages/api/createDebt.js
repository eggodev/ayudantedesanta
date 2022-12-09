import { v4 as uuidv4 } from "uuid";

function addMinutes(date, amount) {
  const newDate = new Date(date);
  return newDate.setMinutes(newDate.getMinutes() + amount);
}

function toIsoString(date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num) {
      return (num < 10 ? "0" : "") + num;
    };

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ":" +
    pad(Math.abs(tzo) % 60)
  );
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const start = new Date();
    const end = new Date(addMinutes(start, 1));
    const idDeuda = uuidv4();
    const siExiste = "update";
    const apiUrl = "https://staging.adamspay.com/api/v1/debts";
    const apiKey = process.env.ADAMSPAY_API_KEY;
    const description = "Compra realizada en sitio web";
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", apiKey);
    myHeaders.append("x-if-exists", siExiste);

    const deuda = JSON.stringify({
      debt: {
        docId: idDeuda,
        label: description,
        amount: { currency: "PYG", value: req.body.totalPrice },
        validPeriod: {
          start: toIsoString(start),
          end: toIsoString(end),
        },
        target: {
          type: "cip",
          number: req.body.user.cedula,
          label: req.body.user.email,
        },
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: deuda,
      redirect: "follow",
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}
