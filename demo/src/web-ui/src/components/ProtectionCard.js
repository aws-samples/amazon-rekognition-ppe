import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import Icon from "./Icon";

export default ({ person, webcamCoordinates }) => (
  <Card style={{ marginTop: "20px", textAlign: "left" }}>
    <Card.Header>{`Person #${person.id}`}</Card.Header>
    <div
      key={`bb-${person.id}`}
      className={`bb-${person.id} bounding-box`}
      style={{
        height: webcamCoordinates.height * person.boundingBox.Height,
        left:
          webcamCoordinates.left +
          person.boundingBox.Left * webcamCoordinates.width,
        top:
          webcamCoordinates.top +
          person.boundingBox.Top * webcamCoordinates.height,
        width: webcamCoordinates.width * person.boundingBox.Width,
      }}
    >
      <span className="box-label">Person #{person.id}</span>
    </div>
    <Card.Body>
      {person.results.map((r, index) => (
        <ListGroup key={index} className="detection-part">
          <ListGroup.Item>
            {r.type} detected
            <span className="confidence">{r.confidence}%</span>
          </ListGroup.Item>
          <ListGroup.Item key={index}>
            {r.type} on {r.bodyPart}:{" "}
            <Icon type={r.coversBodyPart ? "success" : "fail"} />{" "}
            <span style={{ color: r.coversBodyPart ? "#1d8102" : "#d13212" }}>
              {r.coversBodyPart.toString()}
            </span>
            <span className="confidence">{r.coversBodyPartConfidence}%</span>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </Card.Body>
  </Card>
);
