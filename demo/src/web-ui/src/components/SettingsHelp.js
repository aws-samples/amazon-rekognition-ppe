import React from "react";
import { Alert } from "react-bootstrap";

const SettingsHelp = () => (
  <Alert variant="danger">
    There is an issue with your settings configuration. If you are running the
    front-end code from your local machine, you may need to follow{" "}
    <a
      href="https://github.com/aws-samples/amazon-rekognition-ppe/blob/master/CONTRIBUTING.md#working-with-the-web-ui"
      rel="noopener noreferrer"
      target="_blank"
    >
      this guide
    </a>
    .
  </Alert>
);

export default SettingsHelp;
