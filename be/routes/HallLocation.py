import json
import random

from flask import request, make_response, jsonify

from .API import RouteMethodView
from .CRUD import CRUD
from .db import db
from .utilities import Cipher

HallLocationPair = tuple[str, str]


class HallLocation(db.Model):
    __tablename__ = 'hallLocation'

    id = db.Column(db.String(6), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    hall_id = db.Column(db.String, db.ForeignKey('hall.name'), nullable=False)
    __table_args__ = (
        db.UniqueConstraint('name', 'hall_id'),
    )

    def generate_id(self) -> None:
        encryption = Cipher.encrypt(json.dumps({
            'name': self.name,
            'hall_id': self.hall_id
        }))
        rand_i = random.randint(0, len(encryption) - 6)
        self.id = encryption[rand_i:rand_i + 6]


class HallLocationView(CRUD, RouteMethodView):
    route = HallLocation.__tablename__

    def __init__(self):
        super().__init__(HallLocation)

    def post(self):
        data = request.get_json()
        try:
            with self.app.app_context():
                hall_location_elem = HallLocation(**{field: data.get(field) for field in self.fields})
                hall_location_elem.generate_id()
                db.session.add(hall_location_elem)
                db.session.commit()  # commit the transaction
                model_elem = db.session.query(self.model).filter_by(id=hall_location_elem.id).first()
                return make_response(jsonify(self._to_dict(model_elem)), 201)
        except ValueError:
            return make_response('Bad request', 400)
        except Exception as e:
            return make_response(str(e), 500)

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
            decrypted_table = json.loads(Cipher.decrypt(encrypted_table))
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
            'table/<string:encrypted_table>': {
                'methods': ['GET'],
                'view_func': self.get_decrypted_table
            }
        }
