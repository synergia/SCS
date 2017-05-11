from update import Update
from server.log import logger

# Sets all pins to INPUT


class Passive():

    def setPassiveMode(self, state):
        logger.info('Initiating Passive Mode: %s', state)
        mode = 'INPUT'
        if state is False:
            mode = 'OUTPUT'
        try:
            for config_name, config_data in self.configs.items():
                if (config_name == 'pins'):
                    self.pins = config_data
                    for pin_num, pin_config in config_data.items():
                        role = pin_config.get('role', None)
                        value = pin_config.get('value', 'LOW')
                        self.update(pin_num, value, role, mode)
            logger.info('Initiating Passive Mode: done')
            return True
        except ValueError as e:
            logger.error('Initiating Passive Mode: error: %s', e)
            return False
