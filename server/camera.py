# It starts mjpg_streamer
import subprocess
import os
import sys
import psutil
from server.log import logger

PLUGIN_PATH = '/home/pi/mjpg-streamer/mjpg-streamer-experimental/'

HEIGHT = '480'
WIDTH = '640'
FPS = '15'
EX = 'sports'
QUALITY = '10'
RASPICAM = 'input_raspicam.so'
UVC = 'input_uvc.so'
DEVICE = '/dev/video1'
# the resolution of the video device, can be one of the following strings:
# QSIF QCIF CGA QVGA CIF VGA SVGA XGA SXGA or a custom value like the following example: 640x480
RESOLUTION = "VGA"

PORT = '4000'
HTTP = 'output_http.so'

OUTPUT = HTTP + ' -p ' + PORT
INPUT_RASP = RASPICAM + ' -x ' + WIDTH + ' -y ' + HEIGHT + ' -fps ' + FPS + ' -ex ' + EX + '-quality ' + QUALITY
INPUT_UVC = UVC + ' -d '+ DEVICE +' -fps ' + FPS

env = dict(os.environ)   # Make a copy of the current environment
env["LD_LIBRARY_PATH"] = '/home/pi/mjpg-streamer/mjpg-streamer-experimental/'

class MjpgStreamer(object):
    def __init__(self):
        if not self.verification():
            if not self.startRaspCam():
                logger.warn("Camera: trying to start UVC camera")
                self.startUVCCam()


    def verification(self):
        for pid in psutil.pids():
            p = psutil.Process(pid)
            if p.name() == "mjpg_streamer":
                logger.info("Camera: mjpg_streamer is running")
                return True

    def startRaspCam(self):
        process = subprocess.Popen(["mjpg_streamer", "-i", INPUT_RASP, "-o", OUTPUT, "&"], env=env, stdout=subprocess.PIPE, universal_newlines=True,stderr=subprocess.PIPE)
        for line in iter(process.stderr.readline, ''):
            output = str(line).rstrip()
        if "error create camera" in output:
            logger.error("Camera: failed to start stream from Raspberry Camera")
            return False
        return True

    def startUVCCam(self):
        subprocess.Popen(["mjpg_streamer", "-i", INPUT_UVC, "-o", OUTPUT, "&"], env=env, stdout=subprocess.PIPE, universal_newlines=True,stderr=subprocess.PIPE)
        # for line in iter(process.stderr.readline, ''):
        #     output = str(line).rstrip()
        # if "error create camera" in output:
        #     logger.error("Camera: failed to start stream from UVC Camera")
        #     return False
        # return True



MjpgStreamer()
