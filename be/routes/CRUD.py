import inspect

from flask import request, jsonify, make_response

from .db import db, app


class CRUD:
    def __init__(self, model: db.Model):
        self.model = model

    def get(self, id: int):
        result = None
        with app.app_context():
            if id is None:
                model_elems = db.session.query(self.model).all()
                if len(model_elems) >= 0:
                    result = [self._to_dict(el) for el in model_elems]
            else:
                model_elem = db.session.query(self.model).filter_by(id=id).first()
                if model_elem is not None:
                    result = self._to_dict(model_elem)

        return make_response('Not found', 404) if result is None else jsonify(result)

    def post(self):
        data = request.get_json()
        with app.app_context():
            model_elem = self.model(**{field: data[field] for field in self.fields})
            db.session.add(model_elem)
            db.session.commit()  # commit the transaction
            model_elem = db.session.query(self.model).filter_by(id=model_elem.id).first()
            return make_response(jsonify(self._to_dict(model_elem)), 201)

    def put(self, id: int):
        data = request.get_json()

        with app.app_context():
            model_elem = db.session.query(self.model).filter_by(id=id).first()
            if model_elem is None:
                return make_response('Not found', 404)
            for field in self.fields:
                setattr(model_elem, field, data[field])
            db.session.commit()
            model_elem = db.session.query(self.model).filter_by(id=id).first()
            return jsonify(self._to_dict(model_elem))

    def delete(self, id: int):
        with app.app_context():
            model_elem = db.session.query(self.model).filter_by(id=id).first()
            if model_elem is None:
                return make_response('Not found', 404)
            db.session.delete(model_elem)
            db.session.commit()
            return make_response(jsonify({'result': True}), 204)

    @property
    def fields(self) -> list[str]:
        def filter_function(dict_item: tuple[str, any]):
            k, v = dict_item
            return not k.startswith('_') and not inspect.isroutine(v)

        fields_value = filter(filter_function, self.model.__dict__.items())
        return [k for k, v in fields_value]

    def _to_dict(self, model_elem: db.Model):
        return {field: getattr(model_elem, field) for field in self.fields}
