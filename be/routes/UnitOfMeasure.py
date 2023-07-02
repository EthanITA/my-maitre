from .API import RouteMethodView
from .CRUD import CRUD
from .db import db


class UnitOfMeasure(db.Model):
    __tablename__ = 'unitofmeasure'

    id = db.Column(db.Integer, primary_key=True)
    measure = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)


class UnitOfMeasureView(CRUD, RouteMethodView):
    route = UnitOfMeasure.__tablename__

    def __init__(self):
        super().__init__(UnitOfMeasure)
