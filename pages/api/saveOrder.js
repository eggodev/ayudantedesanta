import { client } from "../../lib/client";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      orderId,
      userId,
      email,
      cartItems,
      totalQuantities,
      totalPrice,
      status,
    } = req.body;
    const items = cartItems.map((item) => {
      return {
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        _key: uuidv4(),
      };
    });
    const doc = {
      _type: "order",
      orderId,
      userId,
      email,
      items,
      totalQuantities,
      totalPrice,
      status,
    };
    try {
      await client.create(doc).then((data) => {
        res.json(data);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
