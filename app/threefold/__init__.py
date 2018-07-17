from flask import Blueprint

# from werkzeug.routing import BaseConverter

# class WikiConverter(BaseConverter):
    
#     def to_python(self, value):
#         print(4561178)
#         from IPython import embed;embed(colors='Linux')
#         s
#         return value.split('+')

#     def to_url(self, values):
#         print(45678)
#         from IPython import embed;embed(colors='Linux')
#         s        
#         return '+'.join(BaseConverter.to_url(value)
#                         for value in values)

# def add_url_converter(self, func):
#     """
#     Register a custom URL map converters, available application wide.
#     """
#     def register_converter(state):
#         state.app.url_map.converters["wiki"] = func

#     self.record_once(register_converter)

# # monkey-patch the Blueprint object to allow addition of URL map converters
# Blueprint.add_url_converter = add_url_converter


blueprint = Blueprint(
    'threefold_blueprint',
    __name__,
    url_prefix='/threefold',
    template_folder='docs',
    static_folder='static'
)

# blueprint.add_url_converter(WikiConverter)