import os

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    if os.getenv('FLASK_ENV') != 'production':
        app.run(host='0.0.0.0', port=3000)
