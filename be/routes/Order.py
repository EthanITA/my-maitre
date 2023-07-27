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


class DecryptedTable:
    spot: str
    menu_type: str


class OrderView(CRUD, RouteMethodView):
    route = Order.__tablename__.lower()

    def __init__(self):
        super().__init__(Order)

    def get_encrypted_table(self):
        try:
            spot = request.args.get('spot')
            menu_type = request.args.get('menu_type')
            return Cipher.encrypt(json.dumps({
                'spot': spot,
                'menu_type': menu_type
            }))
        except ValueError:
            return make_response('Bad request', 400)
        except Exception as e:
            return make_response(str(e), 500)

    def get_decrypted_table(self, encrypted_table: str):
        try:
            decrypted_table: DecryptedTable = json.loads(Cipher.decrypt(encrypted_table))
            if 'spot' not in decrypted_table or 'menu_type' not in decrypted_table:
                raise ValueError
            return decrypted_table
        except ValueError:
            return make_response('Bad request', 400)
        except Exception as e:
            return make_response(str(e), 500)

    @property
    def custom_routes(self) -> dict[str, dict[str, any]]:
        return {
            'table': {
                'methods': ['GET'],
                'view_func': self.get_encrypted_table
            },
            'table/<str:encrypted_table>': {
                'methods': ['GET'],
                'view_func': self.get_decrypted_table
            }
        }
