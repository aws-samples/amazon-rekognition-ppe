import cv2
import boto3
import time
from datetime import datetime
import json
from threading import Thread

class CameraSettings():
    @property
    def area(self):
        return self._area

    @property
    def subarea(self):
        return self._subarea

    @property
    def videoStreamUrl(self):
        return self._videoStreamUrl

    @property
    def s3Bucket(self):
        return self._s3Bucket

    @property
    def isFisheye(self):
        return self._isFisheye

    @property
    def frameCaptureThreshold(self):
        return self._frameCaptureThreshold        

    def __init__(self, cameraSettings):
        self._area = cameraSettings["area"]
        self._subarea = cameraSettings["subarea"]
        self._videoStreamUrl = cameraSettings["videoStreamUrl"]
        self._s3Bucket = cameraSettings["s3Bucket"]
        self._isFisheye = cameraSettings["isFisheye"]
        self._frameCaptureThreshold = cameraSettings["frameCaptureThreshold"]

class Camera(Thread):
    @property
    def cameraSettings(self):
        return self._cameraSettings

    def __init__(self, cameraSettings):
        Thread.__init__(self)
        self._cameraSettings = cameraSettings

    def pushFrame(self):
        cap = cv2.VideoCapture(self.cameraSettings.videoStreamUrl)
        ret, frame = cap.read()
        if ret:
            hasFrame, imageBytes = cv2.imencode(".jpg", frame)
            if hasFrame:
                session = boto3.session.Session()
                s3Client = session.client('s3')
                now = datetime.now()
                objectName = "images/{}/{}/{}_{}_{}_{:0=2d}_{:0=2d}_{:0=2d}_{:0=2d}_{:0=2d}.jpg".format(self.cameraSettings.area, self.cameraSettings.subarea,
                                    self.cameraSettings.area, self.cameraSettings.subarea,
                                    now.year, now.month, now.day, now.hour, now.minute, now.second)
                print("Uploading:\t{}".format(objectName))
                if(self.cameraSettings.isFisheye):
                    md = {"isfisheye" : "1", "camera_model": "0000"}
                else:
                    md = {"isfisheye" : "0", "camera_model": "0000"}    
                s3Client.put_object(Body=imageBytes.tobytes(), Bucket=self.cameraSettings.s3Bucket, Key=objectName, ContentType="image/jpg", Metadata=md)
                print("Uploaded:\t{}".format(objectName))

        cap.release()

    def run(self):
        print("Starting camera {}_{}".format(self.cameraSettings.area, self.cameraSettings.subarea))

        while (True):
            try:
                self.pushFrame()                
            except Exception as e:
                print("Error: {}.".format(e))

            time.sleep(self.cameraSettings.frameCaptureThreshold)

        print("Closing camera...")

def getCameras():
    cameras = []
    with open('config.json') as conf:
        jCameraSettings = json.load(conf)
        for jCameraSetting in jCameraSettings:
            cameraSettings = CameraSettings(jCameraSetting)
            camera = Camera(cameraSettings)
            cameras.append(camera)
    return cameras

def start():
    cameras = getCameras()
    for camera in cameras:
        camera.start()
    for camera in cameras:
        camera.join()

start()