from app.api import blueprint
from flask import render_template, send_file
from flask import abort, redirect, url_for

import io

# from flask_login import login_required

from werkzeug.routing import BaseConverter
from js9 import j


@blueprint.route('/index')
@blueprint.route('/')
def index():
    return redirect("api/capacity.csv")

@blueprint.route('/capacity.csv')
def capacity():

    q=j.clients.grid_capacity.get()

    data = q.api.ListCapacity()[0]

    def fix(row):
        row2=[]
        for item in row:
            item=str(item)
            item = item.replace(",",";")
            row2.append(item)
        return row2

    out= "farmer_id, country, node_id, cru, hru, mru, sru, cat\n"

    for item in data:
        d = item.as_dict()
        row=[]
        row.append(d["farmer_id"])
        row.append(d["location"]["country"])
        row.append(d["node_id"])
        row.append(d["total_resources"]["cru"])
        row.append(d["total_resources"]["hru"])
        row.append(d["total_resources"]["mru"])
        row.append(d["total_resources"]["sru"])
        os_version = d["os_version"]
        cat = ""
        for version in ["1.4.1","1.3.0","development","master"]:
            if version in os_version:
                cat = version
        if cat == "":
            cat = os_version
        row.append(cat)
        row = fix(row)
        out+= ",".join(row)+"\n"

    return out
        
    # j.sal.fs.writeFile("report.csv",out)
        