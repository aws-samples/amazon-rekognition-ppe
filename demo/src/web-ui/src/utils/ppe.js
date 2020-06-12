const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const percentageToString = (percentage) => Math.floor(percentage * 10) / 10;

export const ppeMapper = (person) => {
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

  return {
    id: person.Id,
    boundingBox: person.BoundingBox,
    results,
  };
};
