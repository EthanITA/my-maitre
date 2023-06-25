import os

from dotenv import load_dotenv
from flask import Flask

from be.routes.API import register_api_routes
from be.routes.Menu import MenuView

app = Flask(__name__)

load_dotenv()
assert os.getenv('DATABASE_URL') is not None
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

register_api_routes(app, '/menus', MenuView)
