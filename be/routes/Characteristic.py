from .API import RouteMethodView
from .CRUD import CRUD
from .db import db


class Characteristic(db.Model):
    __tablename__ = 'characteristic'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(255))


class CharacteristicView(CRUD, RouteMethodView):
    route = Characteristic.__tablename__

    def __init__(self):
        super().__init__(Characteristic)
