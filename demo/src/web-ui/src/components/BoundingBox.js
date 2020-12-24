import React from "react";

const BoundingBox = ({
  coordinates,
  label,
  color = "#000",
  webcamCoordinates,
}) => (
  <div
    style={{
      height: webcamCoordinates.height * coordinates.Height,
      left: webcamCoordinates.left + coordinates.Left * webcamCoordinates.width,
      top: webcamCoordinates.top + coordinates.Top * webcamCoordinates.height,
      width: webcamCoordinates.width * coordinates.Width,
      border: `1px solid ${color}`,
      color: "#fff",
      fontWeight: "bold",
      position: "fixed",
    }}
  >
    <span style={{ backgroundColor: color, padding: "2px" }}>{label}</span>
  </div>
);

export default BoundingBox;
