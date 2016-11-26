from server.log import logger

class Initialize():

    logger.info('Pins initialization')
    def initialize_pins(self):
        for pin_num, pin_config in self.pins.items():
            name = pin_config.get('name', None)
            initial = pin_config.get('initial', 'LOW')
            resistor = pin_config.get('resistor', None)
            dutycycle = pin_config.get('dutycycle', None)
            mode = pin_config.get('mode', 'OUTPUT')
            self.setup_pin(pin_num, name, mode, initial, resistor, dutycycle)
