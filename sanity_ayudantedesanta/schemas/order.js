export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "orderId",
      title: "OrderId",
      type: "string",
    },
    {
      name: "userId",
      title: "UserId",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          title: "Item",
          type: "object",
          fields: [
            {
              name: "id",
              title: "Id",
              type: "string",
            },
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "totalQuantities",
      title: "TotalQuantities",
      type: "number",
    },
    {
      name: "totalPrice",
      title: "TotalPrice",
      type: "number",
    },
    {
      name: "status",
      title: "Status",
      type: "string",
    },
  ],
};
