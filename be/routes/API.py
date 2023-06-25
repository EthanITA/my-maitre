from flask import Flask
from flask.views import MethodView


def register_api_routes(app: Flask, route: str, view: type[MethodView]):

    view_func = view.as_view(route)

    app.add_url_rule(route, view_func=view_func, defaults={'id': None}, methods=['GET'])
    app.add_url_rule(f'{route}/<int:id>', view_func=view_func, methods=['GET', 'PUT', 'DELETE'])
    app.add_url_rule(route, view_func=view_func, methods=['POST'])
    return app
