from .API import RouteMethodView
from .CRUD import CRUD
from .db import db


class Dish(db.Model):
    __tablename__ = 'dish'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    price = db.Column(db.Numeric(10, 2))
    unit_of_measure_id = db.Column(db.Integer, db.ForeignKey('unitofmeasure.id'))
    image = db.Column(db.String(255))
    allergens_id = db.Column(db.ARRAY(db.Integer), default=[])
    characteristics_id = db.Column(db.ARRAY(db.Integer), default=[])


class DishView(CRUD, RouteMethodView):
    route = Dish.__tablename__

    def __init__(self):
        super().__init__(Dish)
