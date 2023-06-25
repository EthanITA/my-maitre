from be.routes.API import register_api_routes
from be.routes.Menu import MenuView
from be.routes.app import app

register_api_routes(app, '/menus', MenuView)
