const AWS = require("aws-sdk");
const uuid = require("uuid").v4;

const { REGION } = process.env;

const rekognition = new AWS.Rekognition({ region: REGION });

const respond = (statusCode, response) => ({
  statusCode,
  body: JSON.stringify(response),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const fetchFaces = async (imageBytes) => {
  /*
    Detect Faces
    Uses Rekognition's DetectFaces functionality
  */

  const facesTest = {
    TestName: "Face Detection",
  };

  const detectFaces = () =>
    rekognition.detectFaces({ Image: { Bytes: imageBytes } }).promise();

  try {
    const faces = await detectFaces();
    const nFaces = faces.FaceDetails.length;
    facesTest.Success = nFaces === 1;
    facesTest.Details = nFaces;
  } catch (e) {
    console.log(e);
    facesTest.Success = false;
    facesTest.Details = "Server error";
  }
  return facesTest;
};

const detectPPE = async (imageBytes) => {
  return {
    PersonalSafetyModelVersion: "1.0",
    Persons: [
      {
        Id: 0,
        BoundingBox: {
          Width: 0.14000000059604645,
          Height: 0.10000000149011612,
          Left: 0.6700000166893005,
          Top: 0.18000000715255737,
        },
        Confidence: 99.91668701171875, // likelihood of the bbox containing a person
        BodyParts: [
          //This list contains detected body parts. It would be empty otherwise
          {
            Name: "Face", //enum: Face, Nose, Head, Left Hand, Right Hand
            Confidence: 99.44324232, // score for body part visibility
            Equipments: [
              //This list would be empty, if no equipments are detected
              {
                EquipmentType: "Mask", // enum: Mask, Glove, Helmet
                Confidence: 99.91668701171875, // likelihood of the bbox contains an equipment
                BoundingBox: {
                  Width: 0.14000000059604645,
                  Height: 0.10000000149011612,
                  Left: 0.6700000166893005,
                  Top: 0.18000000715255737,
                },
                CoversBodyPart: {
                  Confidence: 50,
                },
              },
            ],
          },
          {
            BodyPart: "Head",
            Confidence: 99.44324232,
            Equipments: [
              {
                EquipmentType: "Helmet",
                Confidence: 99.91668701171875,
                BoundingBox: {
                  Width: 0.14000000059604645,
                  Height: 0.10000000149011612,
                  Left: 0.6700000166893005,
                  Top: 0.18000000715255737,
                },
                CoversBodyPart: {
                  Value: true,
                  Confidence: 98.32423234,
                },
              },
            ],
          },
          {
            BodyPart: "Left Hand",
            Confidence: 99.898934,
            Equipments: [
              {
                EquipmentType: "Glove",
                Confidence: 99.91668701171875,
                BoundingBox: {
                  Width: 0.14000000059604645,
                  Height: 0.10000000149011612,
                  Left: 0.6700000166893005,
                  Top: 0.18000000715255737,
                },
                CoversBodyPart: {
                  Value: true,
                  Confidence: 98.32423234,
                },
              },
            ],
          },
          {
            BodyPart: "Right Hand",
            Confidence: 98.32423234,
            Equipments: [
              {
                EquipmentType: "Glove",
                Confidence: 99.91668701171875,
                BoundingBox: {
                  Width: 0.14000000059604645,
                  Height: 0.10000000149011612,
                  Left: 0.6700000166893005,
                  Top: 0.18000000715255737,
                },
                CoversBodyPart: {
                  Value: true,
                  Confidence: 98.32423234,
                },
              },
            ],
          },
        ],
      },
    ],
  };
};
exports.processHandler = async (event) => {
  const body = JSON.parse(event.body);
  const imageBytes = Buffer.from(body.image, "base64");
  const result = await Promise.all([detectPPE(imageBytes)]);

  return respond(200, result.flat());
};
