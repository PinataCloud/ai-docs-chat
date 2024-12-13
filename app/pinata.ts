const { PinataSDK } = require("pinata");

export const pinata = new PinataSDK({
  pinataJwt:
    process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY_URL
});

// export const GROUP_ID = "0193ac7e-9f0c-7b06-9792-a60e565d7395"
export const GROUP_ID = process.env.GROUP_ID
