from .API import RouteMethodView
from .CRUD import CRUD
from .db import db


class Hall(db.Model):
    __tablename__ = 'hall'

    name = db.Column(db.Text, primary_key=True)


class HallView(CRUD, RouteMethodView):
    route = Hall.__tablename__

    def __init__(self):
        super().__init__(Hall)
