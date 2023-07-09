from .API import RouteMethodView
from .CRUD import CRUD
from .db import db


class Allergen(db.Model):
    __tablename__ = 'allergen'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(255))


class AllergenView(CRUD, RouteMethodView):
    route = Allergen.__tablename__

    def __init__(self):
        super().__init__(Allergen)
