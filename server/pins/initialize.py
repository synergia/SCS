import json
import pigpio
from server.log import logger

PINS_JSON = './config/pins.json'

'''
Parsing JSON, saving architecture value to variable, setup pins
http://stackoverflow.com/a/17166144/1589989
'''


class Initialize():
    def load_json(self):
        try:
            with open(PINS_JSON) as file_data:
                self.configs = json.load(file_data)
            logger.info('Initialization: JSON loaded')
            logger.debug(self.configs)
        except ValueError as e:
            logger.error("JSON error: %s", e)

    def setup_pin(self, pin_num, name, role, mode, owner, value):
        num = int(pin_num)
        mode = pigpio.__getattribute__(mode)
        roles = {
            'servo': self.gpio.set_servo_pulsewidth,
            'propulsion': self.gpio.set_PWM_dutycycle
        }
        self.gpio.set_mode(num, mode)

        # If current pin role is the same role that is in `roles` object
        # than do things
        for r in roles:
            if role in roles:
                roles[role](num, value)
            else:
                self.gpio.write(num, value)
        logger.info('Initialization: %s %s %s value: %s mode: %s', num, name, role, value, mode)

    def initialize_pins(self):
        logger.info('Initialization: started')
        self.load_json()
        try:
            for config_name, config_data in self.configs.items():
                if (config_name == 'architecture'):
                    self.architecture = config_data
                    logger.info('Initialization: architecture: %s', config_data)
                if (config_name == 'pins'):
                    self.pins = config_data
                    for pin_num, pin_config in config_data.items():
                        name = pin_config.get('name', None)
                        role = pin_config.get('role', None)
                        mode = pin_config.get('mode', 'OUTPUT')
                        owner = pin_config.get('owner', None)
                        value = pin_config.get('value', 'LOW')
                        self.setup_pin(pin_num, name, role, mode, owner, value)
            logger.info('Initialization: done')
        except ValueError as e:
            logger.error('Initialization: error: %s', e)
