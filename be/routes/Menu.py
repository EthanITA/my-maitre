from .API import RouteMethodView
from .CRUD import CRUD
from .db import db


class Menu(db.Model):
    __tablename__ = 'menus'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    icon = db.Column(db.String(255))
    hide_price = db.Column(db.Boolean, default=False)
    # JSONB
    visibility = db.Column(db.JSON, default={})


class MenuView(CRUD, RouteMethodView):
    route = Menu.__tablename__

    def __init__(self):
        super().__init__(Menu)
