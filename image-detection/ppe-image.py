import boto3
import json

# Image
# imageName = "ppe-image-single.jpg"
imageName = "ppe-image-group.jpg"

# Read image content
with open(imageName, 'rb') as document:
    imageBytes = bytearray(document.read())

# Amazon Rekognition client
rekognition = boto3.client('rekognition')

# Call Amazon Rekognition
response = rekognition.detect_protective_equipment(
        Image={'Bytes': imageBytes},
        SummarizationAttributes={
            'MinConfidence': 90,
            'RequiredEquipmentTypes': [
                'FACE_COVER',
                'HEAD_COVER',
                'HAND_COVER',
            ]
        }
    )

# print(response)

# Summary
print(response["Summary"])

with open("ppe-image.json", "w") as f:
    f.write(json.dumps(response))
