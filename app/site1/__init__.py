from flask import Blueprint

SITE = "site1"

blueprint = Blueprint(
    '%s_blueprint'%SITE,
    __name__,
    url_prefix='/%s'%SITE,
    template_folder='templates',
    static_folder='static'
)
