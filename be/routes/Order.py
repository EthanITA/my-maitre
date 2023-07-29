import json

from flask import make_response, request, jsonify

from .API import RouteMethodView
from .CRUD import CRUD
from .db import db
from .utilities import Cipher


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

    def customer_post(self):
        try:
            data = request.get_json()
            if 'table' not in data or 'order' not in data:
                return make_response('Bad request', 400)

            decrypted_table = json.loads(Cipher.decrypt(data['table']))
            with self.app.app_context():
                model_elem = self.model(**{field: data.get(field) for field in self.fields})
                delattr(model_elem, 'id')
                setattr(model_elem, 'spot', decrypted_table.spot)
                setattr(model_elem, 'order_type', decrypted_table.menu_type)
                db.session.add(model_elem)
                db.session.commit()
                model_elem = db.session.query(self.model).filter_by(id=model_elem.id).first()
                return make_response(jsonify(self._to_dict(model_elem)), 201)
        except ValueError:
            return make_response('Bad request', 400)
        except Exception as e:
            return make_response(str(e), 500)

    @property
    def custom_routes(self) -> dict[str, dict[str, any]]:
        return {
            'customer': {
                'methods': ['POST'],
                'view_func': self.customer_post
            },
        }
