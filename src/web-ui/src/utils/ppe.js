export const ppeTest = (person) => {
  const HEAD = "Head";
  const LEFT_HAND = "Left Hand";
  const RIGHT_HAND = "Right Hand";
  const FACE = "Face";

  const getBodyPart = (person, bodyPart) =>
    person.BodyParts.filter((p) => p.Name === bodyPart)[0];

  // hasProtection is true of a bodypart has any equipment
  const hasProtection = (person, part) => {
    const bodyPart = getBodyPart(person, part);
    return bodyPart.Equipments.length >= 1;
  };

  const head = (person) => {
    const success = hasProtection(person, HEAD);
    return {
      TestName: "Head Protection",
      Success: success,
    };
  };

  const hands = (person) => {
    const success =
      hasProtection(person, LEFT_HAND) && hasProtection(person, RIGHT_HAND);
    return {
      TestName: "Hand Protection",
      Success: success,
    };
  };

  const face = (person) => {
    const success = hasProtection(person, FACE);
    return {
      TestName: "Face Protection",
      Success: success,
    };
  };

  const tests = [head, hands, face];
  const results = tests.map((test) => {
    return test(person);
  });

  return {
    id: person.Id,
    results: results,
  };
};
