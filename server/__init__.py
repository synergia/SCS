import os
from flask import Flask
from flask_socketio import SocketIO
from flask import render_template
from flask import Response
from .pins import *
from gevent import monkey
from .log import *
from .camera import *

monkey.patch_all(thread=False)

client_path = os.path.abspath('client')

app = Flask(__name__, template_folder=client_path, static_folder=client_path)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', "TEST")
app.port = os.getenv('PORT', 5000)
app.debug = True

socketio = SocketIO(app)

@app.route('/', defaults={'path': ''})
def index(path):
    return render_template('index.html')

from .sockets import *
