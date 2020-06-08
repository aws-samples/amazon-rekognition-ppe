export const ppeTest = (person) => {
  const HEAD = "HEAD";
  const LEFT_HAND = "LEFT HAND";
  const RIGHT_HAND = "RIGHT HAND";
  const FACE = "FACE";

  const getBodyPart = (person, bodyPart) =>
    person.BodyParts.filter((p) => p.Name === bodyPart)[0];

  // hasProtection is true of a bodypart has any equipment
  const hasProtection = (person, part) => {
    const bodyPart = getBodyPart(person, part);
    return (
      bodyPart &&
      bodyPart.EquipmentDetections &&
      bodyPart.EquipmentDetections.length >= 1
    );
  };

  const head = (person) => ({
    TestName: "Head Protection",
    Success: hasProtection(person, HEAD),
  });

  const hands = (person) => ({
    TestName: "Hand Protection",
    Success:
      hasProtection(person, LEFT_HAND) && hasProtection(person, RIGHT_HAND),
  });

  const face = (person) => ({
    TestName: "Face Protection",
    Success: hasProtection(person, FACE),
  });

  const results = [head, hands, face].map((test) => test(person));

  return {
    id: person.Id,
    boundingBox: person.BoundingBox,
    results,
  };
};
