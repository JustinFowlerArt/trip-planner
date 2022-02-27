export const schema = {
    type: "object",
    properties: {
      trips: {
        type: "array",
        minItems: 3,
        maxItems: 5,
        items: {
          type: "object",
          properties: {
            id: {
              type: "integer",
  
              minimum: 1,
            },
            name: {
              type: "string",
              faker: "address.country",
            },
            expenses: {
              type: "array",
              minItems: 3,
              maxItems: 5,
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      faker: "commerce.productName",
                    },
                    price: {
                      type: "integer",
                      faker: "commerce.price",
                    },
                  },
                  required: ["name", "price"],
                },
            },
            total: {
              type: "integer",
              faker: "finance.amount",
            },
          },
          required: ["id", "name", "expenses", "total"],
        },
      },
    },
    required: ["trips"],
  };