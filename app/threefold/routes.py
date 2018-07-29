from app.threefold import blueprint
from flask import render_template, send_file
from flask import abort, redirect, url_for

import io

# from flask_login import login_required

from werkzeug.routing import BaseConverter
from js9 import j


@blueprint.route('/index')
@blueprint.route('/')
def index():
    return redirect("threefold/home")


