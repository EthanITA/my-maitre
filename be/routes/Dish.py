import os

from flask import request, make_response, jsonify, send_from_directory

from .API import RouteMethodView
from .CRUD import CRUD
from .db import db


class Dish(db.Model):
    __tablename__ = 'dish'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    price = db.Column(db.Numeric(10, 2))
    unit_of_measure_id = db.Column(db.Integer, db.ForeignKey('unitofmeasure.id'))
    image = db.Column(db.String(255))
    allergens_id = db.Column(db.ARRAY(db.Integer), default=[])
    characteristics_id = db.Column(db.ARRAY(db.Integer), default=[])


class DishView(CRUD, RouteMethodView):
    route = Dish.__tablename__
    path = '/public/dish' if os.getenv('FLASK_ENV') == 'production' else os.path.join(os.getcwd(), 'dish')

    def __init__(self):
        super().__init__(Dish)

    def upload_image(self, id: int):
        if 'image' not in request.files:
            return make_response('Bad request', 400)
        file = request.files['image']
        filename = f'image_{id}' if file.filename != '' else ''
        if not filename:
            return make_response('Bad request', 400)

        try:
            if not os.path.exists(self.path):
                os.makedirs(self.path)
            file.save(os.path.join(self.path, filename))
            with self.app.app_context():
                dish_elem = self.db.session.query(Dish).filter_by(id=id).first()
                dish_elem.image = filename
                self.db.session.commit()
                return filename, 201
        except Exception as e:
            return make_response(jsonify({'result': False, 'error': str(e)}), 500)

    def serve_image(self, id: int):
        with self.app.app_context():
            dish_elem = self.db.session.query(Dish).filter_by(id=id).first()
            if not dish_elem:
                return make_response('Not found', 404)
            if not dish_elem.image:
                return make_response('', 204)
            return send_from_directory(self.path, dish_elem.image)

    def delete_image(self, id: int):
        with self.app.app_context():
            dish_elem = self.db.session.query(Dish).filter_by(id=id).first()
            if not dish_elem:
                return make_response('Not found', 404)
            os.remove(os.path.join(self.path, dish_elem.image))
            dish_elem.image = ''
            self.db.session.commit()
            return make_response('', 204)

    def image(self, id: int):
        method_func = {
            'POST': self.upload_image,
            'GET': self.serve_image,
            'DELETE': self.delete_image,
        }
        if request.method not in method_func:
            return make_response('Method not allowed', 405)
        return method_func[request.method](id)
    @property
    def custom_routes(self) -> dict[str, dict[str, any]]:
        return {
            'image/<int:id>': {
                'methods': ['POST', 'GET', 'DELETE'],
                'view_func': self.image,
            },
        }
