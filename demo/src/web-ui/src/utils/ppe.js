const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const percentageToString = (percentage) => Math.floor(percentage * 10) / 10;
const formatText = (t) => t.replace(/_/gi, " ").toLowerCase();

export const ppeMapper = (person) => {
  const bodyParts = (person.BodyParts || []).filter(
    (x) => x.EquipmentDetections && x.EquipmentDetections.length > 0
  );

  const results = bodyParts
    .map((p) =>
      p.EquipmentDetections.map((eq) => ({
        bodyPart: formatText(p.Name),
        confidence: percentageToString(p.Confidence),
        type: capitalize(formatText(eq.Type)),
        coversBodyPart: eq.CoversBodyPart.Value,
        coversBodyPartConfidence: percentageToString(
          eq.CoversBodyPart.Confidence
        ),
        boundingBox: eq.BoundingBox,
      }))
    )
    .flat();

  return {
    id: person.Id,
    boundingBox: person.BoundingBox,
    results,
  };
};
