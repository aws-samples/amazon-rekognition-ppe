# Detect Protective Equipment with Amazon Rekognition

Amazon Rekognition is a machine learning based image and video analysis service that enables developers to
build smart applications using computer vision. Developers can quickly take advantage of different APIs to
identify objects, people, text, scene and activities in images and videos, as well as inappropriate content.

With Amazon Rekognition PPE detection, you can analyze images from your on-premises cameras at scale to automatically detect if people are wearing the required protective equipment, such as face covers (surgical masks, N95 masks, cloth masks), head covers (hard hats or helmets), and hand covers (surgical gloves, safety gloves, cloth gloves). Using these results, you can trigger timely alarms or notifications to remind people to wear PPE before or during their presence in a hazardous area to help improve or maintain everyone’s safety.

You can also aggregate the PPE detection results and analyze them by time and place to identify how safety warnings or training practices can be improved or generate reports for use during regulatory audits. For example, a construction company can check if construction workers are wearing head covers and hand covers when they’re on the construction site and remind them if one or more PPE isn’t detected to support their safety in case of accidents. A food processing company can check for PPE such as face covers and hand covers on employees working in non-contamination zones to comply with food safety regulations. Or a manufacturing company can analyze PPE detection results across different sites and plants to determine where they should add more hazard warning signage and conduct additional safety training.

With Amazon Rekognition PPE detection, you receive a detailed analysis of an image, which includes bounding boxes and confidence scores for persons (up to 15 per image) and PPE detected, confidence scores for the body parts detected, and Boolean values and confidence scores for whether the PPE covers the corresponding body part. The following image shows an example of PPE bounding boxes for head cover, hand covers, and face cover annotated using the analysis provided by the Amazon Rekognition PPE detection feature.

## [Demo]()

The PPE Demo shows how you can have a serverless architecture to process frames from cameras for PPE detection.

## Samples

This repository contains Python samples for different usecases of the Rekognition Detect PPE Operation.

### [Frame Extraction](frame-extraction/fextractor.py)

This sample demonstrates how to extract frames from a video and upload them to an S3 Bucket

### [Image Detection](image-detection/ppe-image.py)

This sample demonstrates how to detect protective equipment in an image.

### [Stored Video](stored-video/frame_analysis.py)

This sample demonstrates how to detect protective equipment in a stored video

### [Stream Processing](stream-processing/ppe-stream.py)

This sample demonstrates how to detect protective equipment on a streamed video

## Amazon Rekognition DetectProtectiveEquipment API

To detect PPE in an image, you call the DetectProtectiveEquipment API and pass an input image. You can provide the input image (in JPG or PNG format) either as raw bytes or as an object stored in an Amazon Simple Storage Service (Amazon S3) bucket. You can optionally use the SummarizationAttributes (ProtectiveEquipmentSummarizationAttributes) input parameter to request summary information about persons that are wearing the required PPE, not wearing the required PPE, or are indeterminate.

# License Summary

This library is licensed under the MIT-0 License. See the LICENSE file.
