from time import sleep
from picamera import PiCamera

camera = PiCamera()


def capture():
    camera.resolution = (1024, 768)
    # Camera warm-up time
    sleep(2)
    camera.capture('client/foo.jpg')
    print 'Captured'
