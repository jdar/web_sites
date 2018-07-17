from app.wiki import blueprint
from flask import render_template, send_file
from flask import abort, redirect, url_for

import io

# from flask_login import login_required

from werkzeug.routing import BaseConverter
from js9 import j


@blueprint.route('/index')
@blueprint.route('/')
def index():
    return redirect("wiki/foundation")

@blueprint.route('/capacity')
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
        
    

@blueprint.route('/<sub>')
def index_sub(sub):
    return render_template('index_docsify.html')



@blueprint.route('/<path:subpath>')
def wiki_route(subpath):
    
    subpath=subpath.strip("/")
    parts = subpath.split("/")

    if len(parts)<2:
        raise RuntimeError("s")
        return render_template('error_notfound.html',url=subpath)
        
    wikicat = parts[0].lower().strip()

    parts = parts[1:]

    if len(parts)==0: #"readme" in parts[0].lower() or "index" in parts[0].lower()
        #means we are in root of a wiki, need to load the html 
        return render_template('index_docsify.html')

    
    try:
        #at this point we know the docsite

        ds = j.tools.docgenerator.docsite_get(wikicat)

        #if binary file, return
        name = parts[-1]
        if not name.endswith(".md"):
            ds = j.tools.docgenerator.docsite_get(wikicat)
            file_path = ds.file_get(name)
            with open(file_path, 'rb') as bites:
                return send_file(
                            io.BytesIO(bites.read()),
                            attachment_filename=name
                    )                

        content = ds.sidebar_get(parts)

        if content is not None:
            return content

        doc = ds.doc_get(parts,die=False)

    except Exception as e:
        return ("# **ERROR**\n%s\n"%e)

    if doc:
        return doc.content

    return render_template('error_notfound.html')


# @blueprint.route('/<path:subpath>')
# def route_template(subpath):
#     print(65789)
#     from IPython import embed;embed(colors='Linux')

# @blueprint.route('/index/<cat>/<name>.md')
# def route_template(cat,name):
#     from IPython import embed;embed(colors='Linux')
#     s
#     return render_template("%s/%s.md"%(cat,name))



# @blueprint.route('/<template>')
# def route_template(template):
#     return render_template(template + '.md')

