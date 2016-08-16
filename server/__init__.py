import os
from flask import Flask
from flask_socketio import SocketIO

from gevent import monkey
monkey.patch_all()

client_path = os.path.abspath('client')

app = Flask(__name__, template_folder=client_path, static_folder=client_path)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', "TEST")
app.port = os.getenv('PORT', 5000)
app.debug = True

socketio = SocketIO(app)

import urls
import sockets
