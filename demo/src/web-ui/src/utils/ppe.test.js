import { ppeMapper } from "./ppe";

const testData = {
  Persons: [
    {
      BodyParts: [
        {
          Confidence: 99.99930572509766,
          EquipmentDetections: [
            {
              BoundingBox: {
                Height: 0.3095385730266571,
                Left: 0.2645637094974518,
                Top: 0.29297786951065063,
                Width: 0.1740061491727829,
              },
              Confidence: 98.30194854736328,
              CoversBodyPart: {
                Confidence: 79.82731628417969,
                Value: true,
              },
              Type: "MASK",
            },
            {
              BoundingBox: {
                Height: 0.3095385730266571,
                Left: 0.2645637094974518,
                Top: 0.29297786951065063,
                Width: 0.1740061491727829,
              },
              Confidence: 98.30194854736328,
              CoversBodyPart: {
                Confidence: 79.82731628417969,
                Value: true,
              },
              Type: "FOO",
            },
          ],
          Name: "FACE",
        },
        {
          Confidence: 99.99846649169922,
          EquipmentDetections: [
            {
              BoundingBox: {
                Height: 0.37994688749313354,
                Left: 0.342035174369812,
                Top: 0.16647937893867493,
                Width: 0.2135859727859497,
              },
              Confidence: 85.8783187866211,
              CoversBodyPart: {
                Confidence: 84.20125579833984,
                Value: true,
              },
              Type: "HELMET",
            },
          ],
          Name: "HEAD",
        },
        {
          Confidence: 99.72054290771484,
          EquipmentDetections: [
            {
              BoundingBox: {
                Height: 0.33101364970207214,
                Left: 0.5892353653907776,
                Top: 0.23174917697906494,
                Width: 0.18587328493595123,
              },
              Confidence: 96.79559326171875,
              CoversBodyPart: {
                Confidence: 100,
                Value: true,
              },
              Type: "GLOVE",
            },
          ],
          Name: "LEFT_HAND",
        },
        {
          Confidence: 99.87159729003906,
          EquipmentDetections: [
            {
              BoundingBox: {
                Height: 0.32489436864852905,
                Left: 0.20085042715072632,
                Top: 0.2759649455547333,
                Width: 0.18243715167045593,
              },
              Confidence: 78.28016662597656,
              CoversBodyPart: {
                Confidence: 100,
                Value: true,
              },
              Type: "GLOVE",
            },
          ],
          Name: "RIGHT_HAND",
        },
      ],
      BoundingBox: {
        Height: 0.7783375382423401,
        Left: 0.062234796583652496,
        Top: 0.20151133835315704,
        Width: 0.7751060724258423,
      },
      Confidence: 96.86412811279297,
      Id: 0,
    },
  ],
  ProtectiveEquipmentModelVersion: "1.0",
};

describe("ppe Mapper", () => {
  test("maps with body parts and confidence", () => {
    const mapped = testData.Persons.map(ppeMapper);
    expect(mapped).toMatchSnapshot();
  });
});
