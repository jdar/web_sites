from js9 import j

p = j.tools.prefab.local

def base_install():
    p.runtimes.pip.install("rq-dashboard,rq-scheduler,rq,Flask-Bootstrap4")

def flask_forms_install():
    p.runtimes.pip.install("flask_wtf,flask-appconfig")

base_install()
# flask_forms_install()

