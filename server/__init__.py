import os
from flask import Flask
from flask.ext.socketio import SocketIO

from gevent import monkey
monkey.patch_all()


app = Flask(__name__, template_folder=os.path.abspath('client'))
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', "TEST")
app.port = os.getenv('PORT', 5000)
app.debug = True

socketio = SocketIO(app)

import urls
import sockets
