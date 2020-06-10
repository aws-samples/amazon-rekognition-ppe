const AWS = require("aws-sdk");

const { REGION, REKOGNITION_BASE_URL } = process.env;

let endpoint = REKOGNITION_BASE_URL;
if (endpoint && !endpoint.startsWith("https://"))
  endpoint = `https://${endpoint}`;

const rekognition = new AWS.Rekognition({
  region: REGION,
  endpoint: new AWS.Endpoint(endpoint),
});

const respond = (statusCode, response) => ({
  statusCode,
  body: JSON.stringify(response),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const detectPPE = async (imageBytes) => {
  const getPPE = () =>
    rekognition
      .detectProtectiveEquipment({ Image: { Bytes: imageBytes } })
      .promise();

  try {
    const ppe = await getPPE();
    console.log(ppe);
    return "success";
  } catch (e) {
    console.log(e);
    return "error";
  }
};

exports.processHandler = async (event) => {
  const body = JSON.parse(event.body);
  const imageBytes = Buffer.from(body.image, "base64");
  const result = await detectPPE(imageBytes);

  return respond(200, result);
};
