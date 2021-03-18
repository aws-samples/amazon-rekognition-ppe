import cv2
import boto3
import time


def processFrame(videoStreamUrl):
    cap = cv2.VideoCapture(videoStreamUrl)
    ret, frame = cap.read()
    if ret:
        hasFrame, imageBytes = cv2.imencode(".jpg", frame)
        if hasFrame:
            session = boto3.session.Session()
            rekognition = session.client('rekognition')
            response = rekognition.detect_protective_equipment(
                    Image={
                        'Bytes': imageBytes.tobytes(),
                    }
                )
            print(response)
    cap.release()

# Video stream
videoStreamUrl = "rtsp://@192.168.10.100"
frameCaptureThreshold = 300

while (True):
    try:
        processFrame(videoStreamUrl)
    except Exception as e:
        print("Error: {}.".format(e))

    time.sleep(frameCaptureThreshold)