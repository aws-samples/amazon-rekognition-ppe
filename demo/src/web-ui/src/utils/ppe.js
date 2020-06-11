const HEAD = "HEAD";
const LEFT_HAND = "LEFT_HAND";
const RIGHT_HAND = "RIGHT_HAND";
const FACE = "FACE";

export const ppeTest = (person) => {
  const results = [head, face, leftHand, rightHand].map((test) => test(person));

  return {
    id: person.Id,
    boundingBox: person.BoundingBox,
    results,
  };
};

const getBodyPart = (person, bodyPart) =>
  person.BodyParts.filter((p) => p.Name === bodyPart)[0];

const hasProtection = (person, part) => {
  const bodyPart = getBodyPart(person, part);
  return (
    bodyPart &&
    bodyPart.EquipmentDetections &&
    bodyPart.EquipmentDetections.length >= 1
  );
};

export const head = (person) => ({
  TestName: "Head Covered",
  Success: hasProtection(person, HEAD),
});

export const leftHand = (person) => ({
  TestName: "Left Hand Covered",
  Success: hasProtection(person, LEFT_HAND),
});

export const rightHand = (person) => ({
  TestName: "Right Hand Covered",
  Success: hasProtection(person, RIGHT_HAND),
});

export const face = (person) => ({
  TestName: "Face Covered",
  Success: hasProtection(person, FACE),
});
