# http://abyz.co.uk/rpi/pigpio/python.html#write
import pigpio
from read import Read
from update import Update
from initialize import Initialize
from passive import Passive
from camera import MjpgStreamer
from server.log import logger

class HardwareManager(object, Initialize, Read, Update, Passive):

    def __init__(self):
        super(HardwareManager, self).__init__()
        self.gpio = pigpio.pi('0.0.0.0', 3000)
        self.initialize_pins()
        MjpgStreamer()


PIN_MANAGER = HardwareManager()
