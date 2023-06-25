from flask import Flask

from be.routes.API import register_api_routes
from be.routes.Menu import MenuView

app = Flask(__name__)

register_api_routes(app, '/menus', MenuView)
