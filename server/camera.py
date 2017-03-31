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

PORT = '4000'
HTTP = 'output_http.so'

OUTPUT = HTTP + ' -p ' + PORT
INPUT = RASPICAM + ' -x ' + WIDTH + ' -y ' + HEIGHT + ' -fps ' + FPS + ' -ex ' + EX + '-quality ' + QUALITY

env = dict(os.environ)   # Make a copy of the current environment
env["LD_LIBRARY_PATH"] = '/home/pi/mjpg-streamer/mjpg-streamer-experimental/'

# call(['mjpg_streamer', '-o "output_http.so -p "', INPUT],  stdout=True, stderr=True)
# print os.environ['LD_LIBRARY_PATH']

class MjpgStreamer(object):
    def __init__(self):
        if not self.verification():
            subprocess.Popen(["mjpg_streamer", "-i", INPUT, "-o", OUTPUT], env=env)


    def verification(self):
        for pid in psutil.pids():
            p = psutil.Process(pid)
            if p.name() == "mjpg_streamer":
                logger.info("Camera: mjpg_streamer is running")
                return True

MjpgStreamer()
