import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import BoundingBox from "./BoundingBox";
import Icon from "./Icon";

const ProtectionCard = ({ person, webcamCoordinates }) => (
  <Card style={{ marginTop: "20px", textAlign: "left" }}>
    <Card.Header>{`Person #${person.id}`}</Card.Header>
    <BoundingBox
      label={`Person #${person.id}`}
      coordinates={person.boundingBox}
      webcamCoordinates={webcamCoordinates}
    />
    <Card.Body>
      {person.results.map((r, index) => (
        <ListGroup key={index} className="detection-part">
          <BoundingBox
            label={r.type}
            coordinates={r.boundingBox}
            webcamCoordinates={webcamCoordinates}
            color="#28a745"
          />
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

export default ProtectionCard;
