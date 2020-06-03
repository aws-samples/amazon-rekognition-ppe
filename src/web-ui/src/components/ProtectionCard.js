import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import Icon from "./Icon";

const TestResult = ({ testResult }) => {
  return (
    <ListGroup.Item>
      <Icon type={testResult.Success ? "success" : "fail"} />
      {testResult.TestName}
    </ListGroup.Item>
  );
};
export default ({ person }) => {
  const result = person.results.map((test) => {
    return <TestResult testResult={test}></TestResult>;
  });
  console.log("person", person);
  return (
    <Card style={{ marginTop: "20px", textAlign: "left" }}>
      <Card.Header>{`Person #${person.id}`}</Card.Header>
      <Card.Body>
        <ListGroup>{result}</ListGroup>
      </Card.Body>
    </Card>
  );
};
