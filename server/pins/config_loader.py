import json
from server.log import logger

PINS_JSON = './config/pins.json'


class ConfigLoader():

    def load_json(self):
        try:
            with open(PINS_JSON) as file_data:
                self.configs = json.load(file_data)
            logger.info('Initialization: JSON loaded')
            logger.debug(self.configs)
        except ValueError as e:
            logger.error("JSON error: %s", e)
