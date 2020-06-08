const HEAD = "HEAD";
const LEFT_HAND = "LEFT_HAND";
const RIGHT_HAND = "RIGHT_HAND";
const FACE = "FACE";

export const ppeTest = (person) => {
  const results = [head, hands, face].map((test) => test(person));

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
  TestName: "Head Protection",
  Success: hasProtection(person, HEAD),
});

export const hands = (person) => ({
  TestName: "Hand Protection",
  Success:
    hasProtection(person, LEFT_HAND) && hasProtection(person, RIGHT_HAND),
});

export const face = (person) => ({
  TestName: "Face Protection",
  Success: hasProtection(person, FACE),
});
