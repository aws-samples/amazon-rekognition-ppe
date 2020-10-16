const AWS = require("aws-sdk");

const { REGION, TOPIC_ARN } = process.env;

const rekognition = new AWS.Rekognition({
  region: REGION,
});

const sns = new AWS.SNS({ region: REGION });

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const percentageToString = (percentage) => Math.floor(percentage * 10) / 10;

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
  const shouldSendSNSNotifications = TOPIC_ARN !== "false";

  try {
    const ppe = await detectPPE(imageBytes);

    if (shouldSendSNSNotifications && ppe.Persons && ppe.Persons.length > 0) {
      const people = ppe.Persons.map((person) => {
        const bodyParts = (person.BodyParts || []).filter(
          (x) => x.EquipmentDetections && x.EquipmentDetections.length > 0
        );

        const results = bodyParts
          .map((p) =>
            p.EquipmentDetections.map((eq) => ({
              bodyPart: p.Name.replace(/_/gi, " ").toLowerCase(),
              confidence: percentageToString(p.Confidence),
              type: capitalize(eq.Type),
              coversBodyPart: eq.CoversBodyPart.Value,
              coversBodyPartConfidence: percentageToString(
                eq.CoversBodyPart.Confidence
              ),
            }))
          )
          .flat();

        return { id: person.Id, results };
      }).filter((person) => person.results.length > 0);

      await Promise.all(
        people.map((person) =>
          sns
            .publish({ Message: JSON.stringify(person), TopicArn: TOPIC_ARN })
            .promise()
        )
      );
    }

    return respond(200, ppe);
  } catch (e) {
    console.log(e);
    return respond(500, { error: e });
  }
};
