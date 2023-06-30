from flask import Flask

from .API import register_api_routes
from .Menu import MenuView

app = Flask(__name__)

register_api_routes(app, '/menus', MenuView)
