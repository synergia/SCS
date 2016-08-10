from server import app
from flask.ext import restful
from flask import render_template
from handlers import PinList, PinDetail

api = restful.Api(app)
api.add_resource(PinList, '/api/v1/pin')
api.add_resource(PinDetail, '/api/v1/pin/<string:pin_num>')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')
