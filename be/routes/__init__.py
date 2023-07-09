from typing import Type

from flask import Flask

from .API import register_api_routes, RouteMethodView
# Import all views
from .Category import CategoryView
from .Dish import DishView
from .Menu import MenuView
from .UnitOfMeasure import UnitOfMeasureView

app = Flask(__name__)

# Register routes
views: list[Type[RouteMethodView]] = [
    MenuView,
    CategoryView,
    UnitOfMeasureView,
    DishView
]

for view in views:
    register_api_routes(app, view)
