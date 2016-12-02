import pigpio
from server.log import logger
'''
http://stackoverflow.com/a/17166144/1589989
'''

class Setup():

    def setup_pin(self, pin_num, name, role, mode, owner, value):
        num = int(pin_num)
        mode = pigpio.__getattribute__(mode)
        roles = {
            'servo': self.gpio.set_servo_pulsewidth,
            'propulsion': self.gpio.set_PWM_dutycycle
        }
        self.gpio.set_mode(num, mode)

        for r in roles:
            if role in roles:
                roles[role](num, value)
            else:
                self.gpio.write(num, value)


        logger.info('Initialization: %s %s %s value: %s mode: %s', num, name, role, value, mode)
