from update import Update
from server.log import logger

# Sets all pins to INPUT


class Passive():

    def setPassiveMode(self, state):
        logger.info('Passive Mode: Initiating state %s', state)
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
                        role = pin_config.get('role', None)
                        if state is True and role == "heartbeat":
                            value = 0
                        elif state is False and role == "heartbeat":
                            value = 1500
                        self.update(pin_num, value, role, mode)
            logger.info('Passive Mode: done')
            return self.read_config()
        except ValueError as e:
            logger.error('Passive Mode: error: %s', e)
            return False
