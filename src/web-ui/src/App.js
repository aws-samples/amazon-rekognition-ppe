import React, { useEffect, useRef, useState } from "react";
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import Webcam from "react-webcam";
import { Col, Row } from "react-bootstrap";

import gateway from "./utils/gateway";

import CameraHelp from "./components/CameraHelp";
import ProtectionSummary from "./components/ProtectionSummary";
import Header from "./components/Header";
import SettingsHelp from "./components/SettingsHelp";

export default () => {
  const [authState, setAuthState] = useState(undefined);
  const [readyToStream, setReadyToStream] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const iterating = useRef(false);
  const webcam = useRef(undefined);

  const addUser = (params) => gateway.addUser(params);

  const getSnapshot = () => {
    const image = webcam.current.getScreenshot();
    const b64Encoded = image.split(",")[1];

    gateway.processImage(b64Encoded).then((response) => {
      var people = response[0].Persons.map(gateway.makePerson);
      console.log(people);
      if (response) setTestResults(people);
      if (iterating.current) setTimeout(getSnapshot, 300);
      else setTestResults([]);
    });
  };

  const setupWebcam = (instance) => {
    webcam.current = instance;

    const checkIfReady = () => {
      if (
        webcam.current &&
        webcam.current.state &&
        webcam.current.state.hasUserMedia
      ) {
        setReadyToStream(true);
      } else setTimeout(checkIfReady, 250);
    };

    checkIfReady();
  };

  const toggleRekognition = () => {
    iterating.current = !iterating.current;

    if (iterating.current) {
      getSnapshot();
    } else setTestResults([]);
  };

  useEffect(() => {
    return onAuthUIStateChange((s) => setAuthState(s));
  }, []);

  const signedIn = authState === "signedin";

  return (
    <div className="App">
      <Header
        addUser={addUser}
        readyToStream={readyToStream}
        signedIn={signedIn}
        toggleRekognition={toggleRekognition}
      />
      {signedIn ? (
        <>
          <SettingsHelp show={!window.rekognitionSettings} />
          <CameraHelp show={!readyToStream} />
          <Row>
            <Col md={8} sm={6}>
              <Webcam
                ref={setupWebcam}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 1280,
                  height: 640,
                  facingMode: "user",
                }}
                style={{ width: "100%", marginTop: "10px" }}
              />
            </Col>
            <Col md={4} sm={6}>
              <ProtectionSummary testResults={testResults} />
            </Col>
          </Row>
        </>
      ) : (
        <div className="amplify-auth-container">
          <AmplifyAuthenticator usernameAlias="email">
            <AmplifySignIn
              slot="sign-in"
              usernameAlias="email"
              formFields={[
                {
                  type: "email",
                  label: "Username *",
                  placeholder: "Enter your username",
                  required: true,
                  inputProps: { autoComplete: "off" },
                },
                {
                  type: "password",
                  label: "Password *",
                  placeholder: "Enter your password",
                  required: true,
                  inputProps: { autoComplete: "off" },
                },
              ]}
            >
              <div slot="secondary-footer-content"></div>
            </AmplifySignIn>
          </AmplifyAuthenticator>
        </div>
      )}
    </div>
  );
};
