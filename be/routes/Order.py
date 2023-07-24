from .API import RouteMethodView
from .CRUD import CRUD
from .db import db


class Order(db.Model):
    __tablename__ = 'Order'

    id = db.Column(db.Integer, primary_key=True)
    menu_id = db.Column(db.Integer, db.ForeignKey('menus.id'))
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    date = db.Column(db.Date)
    order_type = db.Column(db.Text, nullable=False, default='standard')
    spot = db.Column(db.String(255))
    order_details = db.Column(db.ARRAY(db.JSON), nullable=False, default=[])
    notes = db.Column(db.Text)
    status = db.Column(db.Text)


class OrderView(CRUD, RouteMethodView):
    route = Order.__tablename__.lower()

    def __init__(self):
        super().__init__(Order)
