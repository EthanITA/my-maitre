from flask import jsonify, make_response, request

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
    enabled = db.Column(db.Boolean, default=True)
    open_hours = db.Column(db.JSON, default={})
    type = db.Column(db.String(255), default='standard')


class MenuView(CRUD, RouteMethodView):
    route = Menu.__tablename__

    def __init__(self):
        super().__init__(Menu)

    def enable(self, id: int):
        data = request.get_json()
        with self.app.app_context():
            menu_elem = self.db.session.query(Menu).filter_by(id=id).first()
            if menu_elem is None:
                return make_response('Not found', 404)
            try:
                menu_elem.enabled = data['enabled']
                self.db.session.commit()
                menu_elem = self.db.session.query(Menu).filter_by(id=id).first()
                return jsonify(self._to_dict(menu_elem))
            except Exception as e:
                return make_response(jsonify({'result': False, 'error': str(e)}), 500)

    def hide_price(self, id: int):
        data = request.get_json()
        with self.app.app_context():
            menu_elem = self.db.session.query(Menu).filter_by(id=id).first()
            if menu_elem is None:
                return make_response('Not found', 404)
            try:
                menu_elem.hide_price = data['hide_price']
                self.db.session.commit()
                menu_elem = self.db.session.query(Menu).filter_by(id=id).first()
                return jsonify(self._to_dict(menu_elem))
            except Exception as e:
                return make_response(jsonify({'result': False, 'error': str(e)}), 500)

    @property
    def custom_routes(self) -> dict[str, dict[str, any]]:
        return {
            'enable/<int:id>': {
                'methods': ['PUT'],
                'view_func': self.enable
            },
            'hide_price/<int:id>': {
                'methods': ['PUT'],
                'view_func': self.hide_price
            }
        }
