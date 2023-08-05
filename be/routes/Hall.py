from flask import request, jsonify, make_response
from sqlalchemy.exc import IntegrityError

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

    def post(self):
        try:
            print(request.data)
            data = request.get_json()
            data['name'] = (data.get('name') or '').strip().lower()
            if not data.get('name'):
                raise ValueError('Name cannot be empty')
            with self.app.app_context():
                model_elem = self.model(**{field: data.get(field) for field in self.fields})
                db.session.add(model_elem)
                db.session.commit()  # commit the transaction
                model_elem = db.session.query(self.model).filter_by(name=model_elem.name).first()
                return make_response(jsonify(self._to_dict(model_elem)), 201)
        except ValueError:
            return make_response('Bad request', 400)
        except IntegrityError:
            return make_response('Duplicate entry', 409)
        except Exception as e:
            return make_response(str(e), 500)

    def put(self, name: str):
        data = request.get_json()

        with self.app.app_context():
            model_elem = db.session.query(self.model).filter_by(name=name).first()
            if model_elem is None:
                return make_response('Not found', 404)
            for field in self.fields:
                setattr(model_elem, field, data.get(field))
            db.session.commit()
            model_elem = db.session.query(self.model).filter_by(name=name).first()
            return jsonify(self._to_dict(model_elem))

    def delete(self, name: str):
        with self.app.app_context():
            model_elem = db.session.query(self.model).filter_by(name=name).first()
            if model_elem is None:
                return make_response('Not found', 404)
            try:
                db.session.delete(model_elem)
                db.session.commit()
                return make_response(jsonify({'result': True}), 204)
            except IntegrityError:
                return make_response(jsonify({'result': False}), 409)
