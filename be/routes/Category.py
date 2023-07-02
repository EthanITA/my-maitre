from .API import RouteMethodView
from .CRUD import CRUD
from .db import db


class Category(db.Model):
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(255))


class CategoryView(CRUD, RouteMethodView):
    route = Category.__tablename__

    def __init__(self):
        super().__init__(Category)
