from time import sleep
from picamera import PiCamera

camera = PiCamera()


def capture():
    camera.resolution = (1024, 768)
    # Camera warm-up time
    sleep(2)
    camera.capture('foo.jpg')
    print 'Captured'
