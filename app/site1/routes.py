from app.site1 import blueprint
from flask import render_template, send_file
from flask import abort, redirect, url_for

import io

# from flask_login import login_required

from werkzeug.routing import BaseConverter
from js9 import j

SITE = "site1"

@blueprint.route('/')
def index():
    return redirect("%s/index_"%SITE)

@blueprint.route('/css/<url>')
def css(url):
    # print('CSS:%s/static/css/%s'%(SITE,url))
    return redirect('%s/static/css/%s'%(SITE,url))

#REDIRCT THE ROUTES FOR VENDOR
@blueprint.route('/vendor/<url>')
@blueprint.route('/vendor/<url>/<url2>')
@blueprint.route('/vendor/<url>/<url2>/<url3>')
def vendor1(**args):
    url='%s/static/vendor'%SITE
    for key,arg in args.items():
        url+="/%s"%arg
    # print("vendor:%s"%url)
    return redirect(url)

@blueprint.route('/<sub>')
@blueprint.route('/<sub>/*.html')
def templates(sub):
    # print("templ:'%s'"%sub)
    sub=sub.lower()
    if sub.endswith(".html"):
        sub=sub[:-5]
    if sub=="index":
        sub="index_"
    return render_template('%s.html'%sub)



## BELOW DID NOT WORK, WAS WRONG BOOTSTRAP

# @blueprint.route('/vendor/bootstrap/css/<url>')
# def css2(url):
#     return redirect(url_for('static', filename='vendors/bootstrap/dist/css/%s'%url))

# @blueprint.route('/vendor/jquery/<url>')
# def jquery(url):
#     return redirect(url_for('static', filename='vendors/jquery/dist/%s'%url))

# @blueprint.route('/vendor/bootstrap/js/bootstrap.bundle.min.js')
# def bootstrapjs():
#     return redirect(url_for('static', filename='vendors/bootstrap/dist/js/bootstrap.min.js'))
