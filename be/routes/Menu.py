from flask import request, jsonify
from flask.views import MethodView

from .models.Menu import Menu
from .models.db import db, app


class MenuView(MethodView):
    def get(self, id: int):
        if id is None:
            with app.app_context():
                menu = db.session.query(Menu).all()
            return jsonify([m.to_dict() for m in menu])
        else:
            with app.app_context():
                menu = db.session.query(Menu).filter_by(id=id).first()
            return jsonify(menu.to_dict())

    def post(self):
        data = request.get_json()
        with app.app_context():
            menu = Menu(
                name=data['name'],
                description=data['description'],
                icon=data['icon'],
                hide_price=data['hide_price'],
                visibility=data['visibility'],
            )
            db.session.add(menu)
            db.session.commit()  # commit the transaction
            menu = db.session.query(Menu).filter_by(id=menu.id).first()
            return jsonify(menu.to_dict())

    def put(self, id: int):
        data = request.get_json()
        print(data)
        print(id)
        with app.app_context():
            menu = db.session.query(Menu).filter_by(id=id).first()
            menu.name = data['name']
            menu.description = data['description']
            menu.icon = data['icon']
            menu.hide_price = data['hide_price']
            menu.visibility = data['visibility']
            db.session.commit()
            menu = db.session.query(Menu).filter_by(id=id).first()
            return jsonify(menu.to_dict())

    def delete(self, id: int):
        with app.app_context():
            menu = db.session.query(Menu).filter_by(id=id).first()
            db.session.delete(menu)
            db.session.commit()
            return jsonify(menu.to_dict())
