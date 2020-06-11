const AWS = require("./aws-sdk");

const { REGION } = process.env;

const rekognition = new AWS.Rekognition({
  region: REGION,
});

const respond = (statusCode, response) => ({
  statusCode,
  body: JSON.stringify(response),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const detectPPE = async (imageBytes) =>
  rekognition
    .detectProtectiveEquipment({ Image: { Bytes: imageBytes } })
    .promise();

exports.processHandler = async (event) => {
  const body = JSON.parse(event.body);
  const imageBytes = Buffer.from(body.image, "base64");

  try {
    const ppe = await detectPPE(imageBytes);
    return respond(200, ppe);
  } catch (e) {
    return respond(500, { error: e });
  }
};
