from flask import request
from flask.views import MethodView


class MenuView(MethodView):
    def get(self, id):
        return 'Hello, World!'

    def post(self):
        data = request.get_json()
        return data

    def put(self):
        return 'Hello, World!'

    def delete(self):
        return 'Hello, World!'
