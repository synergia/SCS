# It starts mjpg_streamer
import subprocess
import os
import sys
import psutil
from server.log import logger


class MjpgStreamer(object):

    def __init__(self):
        self.plugin_path = '/home/pi/mjpg-streamer/mjpg-streamer-experimental/'

        self.height = '480'
        self.width = '640'
        self.fps = '15'
        self.ex = 'sports'
        self.quality = '10'
        self.raspicam = 'input_raspicam.so'
        self.uvc = 'input_uvc.so'
        # the resolution of the video device, can be one of the following strings:
        # QSIF QCIF CGA QVGA CIF VGA SVGA XGA SXGA or a custom value like the
        # following example: 640x480
        self.resolution = "VGA"
        self.port = '4000'
        self.http = 'output_http.so'

        self.output = self.http + ' -p ' + self.port
        self.input_rasp = self.raspicam + ' -x ' + self.width + ' -y ' + self.height + \
            ' -fps ' + self.fps + ' -ex ' + self.ex + '-quality ' + self.quality

        self.env = dict(os.environ)   # Make a copy of the current environment
        self.env["LD_LIBRARY_PATH"] = self.plugin_path

        try:
            self.input_uvc = self.uvc + ' -d ' + self.videoDev() + ' -fps ' + self.fps

            if not self.verification():
                if not self.startRaspCam():
                    logger.warn("Camera: trying to start UVC camera")
                    self.startUVCCam()
        except Exception as e:
            logger.error("Camera: %s", e)

    def verification(self):
        for pid in psutil.pids():
            p = psutil.Process(pid)
            if p.name() == "mjpg_streamer":
                logger.info("Camera: mjpg_streamer is running")
                return True

    def startRaspCam(self):
        process = subprocess.Popen(["mjpg_streamer", "-i", self.input_rasp, "-o", self.output, "&"],
                                   env=self.env, stdout=subprocess.PIPE, universal_newlines=True, stderr=subprocess.PIPE)
        for line in iter(process.stderr.readline, ''):
            output = str(line).rstrip()
        if "error create camera" in output:
            logger.error(
                "Camera: failed to start stream from Raspberry Camera")
            return False
        return True

    def startUVCCam(self):
        subprocess.Popen(["mjpg_streamer", "-i", self.input_uvc, "-o", self.output, "&"],
                         env=self.env, stdout=subprocess.PIPE, universal_newlines=True, stderr=subprocess.PIPE)
        # for line in iter(process.stderr.readline, ''):
        #     output = str(line).rstrip()
        # if "error create camera" in output:
        #     logger.error("Camera: failed to start stream from UVC Camera")
        #     return False
        # return True

    def videoDev(self):
        all_devices = os.listdir("/dev")
        try:
            video_device = filter(lambda video: 'video' in video, all_devices)[0]
            logger.info("Camera: found device: %s", video_device)
            return "/dev/" + video_device
        except Exception as e:
            logger.error("Camera: no device found: %s", e)


MjpgStreamer()
