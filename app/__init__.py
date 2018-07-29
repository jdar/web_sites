from app.config import DebugConfig
from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from importlib import import_module
from logging import basicConfig, DEBUG, getLogger, StreamHandler
from js9 import j

db = SQLAlchemy()
login_manager = LoginManager()


def register_extensions(app):
    db.init_app(app)
    login_manager.init_app(app)


def register_blueprints(app):
    apps = j.sal.fs.listDirsInDir("app", recursive=False, dirNameOnly=True, findDirectorySymlinks=True, followSymlinks=True)
    apps = [item for item in apps if item[0] is not "_"]
    for module_name in apps:
        module = import_module('app.{}.routes'.format(module_name))
        print("blueprint register:%s"%module_name)
        app.register_blueprint(module.blueprint)


def configure_database(app):

    @app.before_first_request
    def initialize_database():
        db.create_all()

    @app.teardown_request
    def shutdown_session(exception=None):
        db.session.remove()


def configure_logs(app):
    basicConfig(filename='error.log', level=DEBUG)
    logger = getLogger()
    logger.addHandler(StreamHandler())


def app_load(app,selenium=False):
    # app = Flask(__name__, static_folder='base/static')
    app.config.from_object(DebugConfig)
    if selenium:
        app.config['LOGIN_DISABLED'] = True
    register_extensions(app)
    register_blueprints(app)
    configure_database(app)
    configure_logs(app)
    return app


def create_app(selenium=False):
    app = Flask(__name__, static_folder='base/static')
    app.config.from_object(DebugConfig)
    if selenium:
        app.config['LOGIN_DISABLED'] = True
    register_extensions(app)
    register_blueprints(app)
    configure_database(app)
    configure_logs(app)
    return app