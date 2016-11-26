import json
from server.log import logger

PINS_JSON = './config/pins.json'


class ConfigLoader():

    def load_json(self):
        try:
            with open(PINS_JSON) as file_data:
                self.pins = json.load(file_data)
            logger.info('Loaded json')
            logger.debug(self.pins)
        except Exception as e:
            logger.error(e)
