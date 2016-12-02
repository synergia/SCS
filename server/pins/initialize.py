from server.log import logger

'''
Parsing JSON, saving architecture value to variable, setups pins
'''


class Initialize():

    def initialize_pins(self):
        logger.info('Initialization: started')
        self.load_json()
        try:
            for config_name, config_data in self.configs.items():
                if (config_name == 'architecture'):
                    self.architecture = config_data
                    logger.info(
                        'Initialization: architecture: %s', config_data)
                if (config_name == 'pins'):
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
