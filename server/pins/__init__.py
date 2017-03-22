#!/usr/bin/python3
# http://abyz.co.uk/rpi/pigpio/python.html#write
import pigpio
from .read import Read
from .update import Update
from .initialize import Initialize
from server.log import logger

class PinManager(Initialize, Read, Update):

    def __init__(self):
        super(PinManager, self).__init__()
        self.gpio = pigpio.pi('0.0.0.0', 3000)
        self.initialize_pins()

PIN_MANAGER = PinManager()
