import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import Icon from "./Icon";

const TestResult = ({ testResult }) => (
  <ListGroup.Item>
    <Icon type={testResult.Success ? "success" : "fail"} />
    {testResult.TestName}
  </ListGroup.Item>
);

export default ({ person, webcamCoordinates }) => {
  const result = person.results.map((test, index) => (
    <TestResult testResult={test} key={index}></TestResult>
  ));

  return (
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
        <ListGroup>{result}</ListGroup>
      </Card.Body>
    </Card>
  );
};
