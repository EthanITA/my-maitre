from typing import Type

from flask import Flask

from .API import register_api_routes, RouteMethodView
from .Allergen import AllergenView
# Import all views
from .Category import CategoryView
from .Characteristic import CharacteristicView
from .Dish import DishView
from .Menu import MenuView
from .UnitOfMeasure import UnitOfMeasureView

app = Flask(__name__)

# Register routes
views: list[Type[RouteMethodView]] = [
    MenuView,
    CategoryView,
    UnitOfMeasureView,
    DishView,
    AllergenView,
    CharacteristicView,
]

for view in views:
    register_api_routes(app, view)
