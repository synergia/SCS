import os
from flask import Flask
from flask_socketio import SocketIO
from flask import render_template
from flask import Response
import pins
from gevent import monkey
import log
from camera import Camera

monkey.patch_all()

client_path = os.path.abspath('client')

app = Flask(__name__, template_folder=client_path, static_folder=client_path)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', "TEST")
app.port = os.getenv('PORT', 5000)
app.debug = True

socketio = SocketIO(app)

@app.route('/', defaults={'path': ''})
def index(path):
    return render_template('index.html')

import sockets

camera.choose_camera_device()

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(Camera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
