# http://abyz.co.uk/rpi/pigpio/python.html#write
import pigpio
from read import Read
from update import Update
from initialize import Initialize
from server.log import logger

class PinManager(object, Initialize, Read, Update,):

    def __init__(self):
        super(PinManager, self).__init__()
        self.gpio = pigpio.pi('0.0.0.0', 3000)
        self.initialize_pins()


    # def log(self, msg, num):
    #     try:
    #         dutycycle = self.gpio.get_PWM_dutycycle(num)
    #     except Exception as e:
    #         dutycycle = e
    #     print msg, num, self.gpio.get_mode(num), self.gpio.read(num), dutycycle

PIN_MANAGER = PinManager()
