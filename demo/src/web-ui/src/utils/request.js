import Amplify, { API, Auth } from "aws-amplify";
import { retryWrapper } from "./index";

const settings = window.rekognitionSettings || {};
const region = settings.region || "eu-west-1";

let endpoint = settings.baseUrl;
if (!endpoint.startsWith("https://")) endpoint = `https://${endpoint}`;

Amplify.configure({
  Auth: {
    identityPoolId: settings.cognitoIdentityPool,
    region,
    mandatorySignIn: true,
    userPoolId: settings.cognitoUserPoolId,
    userPoolWebClientId: settings.cognitoUserPoolClientId,
  },
  API: {
    endpoints: [
      {
        name: "apiGateway",
        endpoint: settings.apiGateway,
        region,
        custom_header: async () => {
          const session = await Auth.currentSession();
          const token = session.getIdToken().getJwtToken();
          return { Authorization: `Bearer ${token}` };
        },
      },
      {
        name: "rekognitionApi",
        endpoint,
        region,
        service: "rekognition",
      },
    ],
  },
});

// export default (url, method, data) =>
//   retryWrapper(() =>
//   API[method || "get"]("apiGateway", url, {
//       body: data || undefined,
//       headers: { "Content-Type": "application/json" },
//     })
//   );

export default (endpointName, data) =>
  retryWrapper(() =>
    API.post("rekognitionApi", "", {
      body: data || {},
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        "X-Amz-Target": `RekognitionService.${endpointName}`,
      },
    })
  );
