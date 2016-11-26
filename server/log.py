# Create a logger object.
import logging
import coloredlogs
import os

os.environ['COLOREDLOGS_LOG_FORMAT'] ='%(asctime)s %(name)s - %(message)s'


logger = logging.getLogger(__name__)
logging.getLogger("engineio").setLevel(logging.WARNING)
logging.getLogger("geventwebsocket").setLevel(logging.WARNING)

coloredlogs.install(level='DEBUG')

# Some examples.
# logger.debug("this is a debugging message")
# logger.info("this is an informational message")
# logger.warn("this is a warning message")
# logger.error("this is an error message")
# logger.critical("this is a critical message")
