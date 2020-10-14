# Detect Protective Equipment with Rekognition

Amazon Rekognition is a machine learning based image and video analysis service that enables developers to
build smart applications using computer vision. Developers can quickly take advantage of different APIs to
identify objects, people, text, scene and activities in images and videos, as well as inappropriate content.

With the new Personal protective equipment (PPE) detection API, Amazon Rekognition can now detect
personal protective equipment such as masks, gloves and helmets worn by people. You can use PPE detection
for example to determine if workers on construction site are wearing helmets, or if medical workers are
wearing masks and gloves. You can then use this information to improve workplace compliance for example
by posting notices reinforcing the need for wearing protective equipment in the required areas. By taking
advantage of the machine learning to generate anonymized reports of non-compliance incidents you can
maintain workplace compliance requirements while protecting the privacy of employees and customers.

## Amazon Rekognition DetectProtectiveEquipment API

To detect personal protective equipment in an image you call the DetectProtectiveEquipment API and pass an input image. You can provide the input image (JPG or PNG format) either as raw bytes or as an object stored in Amazon S3 bucket. The response of DetectProtectiveEquipment API is a JSON structure that include the people detected in the image, the body parts (face, head, left-hand, right-hand) where PPE is detected, and the type of PPE detected. The type of PPE detected are masks, gloves and helmets. For each identified element, Amazon Rekognition also returns additional information such as a confidence score and bounding box.

# Navigate

|                                       |                                                                                                           |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [Demo](/demo)                         | Web app that uses a webcam to extract frames and process them for PPE detection                           |
| [Frame Extraction](/frame-extraction) | Script for using lightweight components at the edge to extract frames from cameras at a desired frequency |
| [Smart Edge](/smart-edge)             | Script leveraging Tensorflow to detect faces in frames to be processed using Amazon Rekognition           |
| [Stored Video](/stored-video)         | Script for frame analysis to be used with stored videos                                                   |

# License Summary

This library is licensed under the MIT-0 License. See the LICENSE file.
