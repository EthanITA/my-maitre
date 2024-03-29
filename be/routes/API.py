from flask import Flask
from flask.views import MethodView


class RouteMethodView(MethodView):
    route: str = ""

    @property
    def custom_routes(self) -> dict[str, dict[str, any]]:
        """Override in subclasses to define custom routes."""
        return {}


def route_exists(app: Flask, route: str):
    for rule in app.url_map.iter_rules():
        if route == str(rule):
            return True
    return False


def register_api_routes(app: Flask, view: type[RouteMethodView]):
    route = view.route
    if bool(route) and not route_exists(app, route):
        route = route if route.startswith('/') else f'/{route}'
        view_func = view.as_view(route)

        app.add_url_rule(route, view_func=view_func, defaults={'id': None}, methods=['GET'])
        app.add_url_rule(f'{route}/<int:id>', view_func=view_func, methods=['GET', 'PUT', 'DELETE'])
        app.add_url_rule(route, view_func=view_func, methods=['POST'])

        for custom_route, options in view().custom_routes.items():
            custom_route = custom_route if custom_route.startswith('/') else f'/{custom_route}'
            app.add_url_rule(f'{route}{custom_route}', **options)
