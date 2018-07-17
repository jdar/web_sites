from app.home import blueprint
from flask import render_template
from flask_login import login_required


# @login_required

@blueprint.route('/index')
def index():
    return render_template('index.html')


@blueprint.route('/<template>')
def route_template(template):
    return render_template(template + '.html')
