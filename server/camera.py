import os
import os.path
from server.log import logger

import time
import io
import threading
import picamera


# https://zarvox.org/shortlog/static/recorder.py


def choose_camera_device():
    videodevs = [
        "/dev/" + x for x in os.listdir("/dev/") if x.startswith("video")]
    # print videodevs
    if len(videodevs) >= 1:
        logger.info("Camera: Found camera devices: %s", videodevs)
        return videodevs[0]
    if len(videodevs) == 0:
        logger.warning("Camera: No camera devices")

import gi
from gi.repository import Gst
gi.require_version('Gst', '1.0')
Gst.init(None)
pipeline = Gst.Pipeline()
rpicamsrc = Gst.ElementFactory.make("rpicamsrc", "rpicam")
