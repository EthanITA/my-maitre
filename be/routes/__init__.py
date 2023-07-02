from typing import Type

from flask import Flask

from .API import register_api_routes, RouteMethodView
from .Category import CategoryView
from .Menu import MenuView
from .UnitOfMeasure import UnitOfMeasureView

app = Flask(__name__)

# Register routes
views: list[Type[RouteMethodView]] = [MenuView, CategoryView, UnitOfMeasureView]

for view in views:
    register_api_routes(app, view)
