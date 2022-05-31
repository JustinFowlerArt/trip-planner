export const schema = {
    type: "object",
    properties: {
      trips: {
        type: "object",
        properties: {
          data: {
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
                  minItems: 4,
                  maxItems: 8,
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
              
                          minimum: 1,
                        },
                        name: {
                          type: "string",
                          faker: "commerce.productName",
                        },
                        price: {
                          type: "integer",
                          faker: "commerce.price",
                        },
                      },
                      required: ["id", "name", "price"],
                    },
                },
              },
              required: ["id", "name", "expenses"],
            },
          },
        },
        required: ["data"],
      },
    },
    required: ["trips"],
  };