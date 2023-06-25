from flask import request, jsonify
from flask.views import MethodView

from be.models.Menu import Menu
from be.models.db import db, app


class MenuView(MethodView):
    def get(self, id):
        if id is None:
            with app.app_context():
                menu = db.session.query(Menu).all()
            return jsonify([m.to_dict() for m in menu])

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

            # Query for the menu you just added and print it
            added_menu = Menu.query.filter_by(name=data['name']).first()
            print(added_menu)
        return 'Menu added'  # return a response in all code paths

    def put(self):
        return 'Hello, World!'

    def delete(self):
        return 'Hello, World!'
