from app import create_app, db
from flask_migrate import Migrate
# from werkzeug.routing import BaseConverter
import rq_dashboard
from js9 import j

# wiki_includes="""
# https://github.com/threefoldfoundation/info_foundation
# https://github.com/threefoldfoundation/info_grid
# https://github.com/threefoldfoundation/info_tokens
# https://github.com/threefoldfoundation/info_tech
# https://github.com/threefoldfoundation/info_tools

# """

# for line in wiki_includes.split("\n"):
#     url = line.strip()
#     if url is not "":
#         path = j.clients.git.getContentPathFromURLorPath(url)
#         if not j.sal.fs.exists(path):
#             j.clients.git.pullGitRepo(url=url)
#         name=url.split("/")[-1].strip().lower()
#         if name.startswith("info_") or name.startswith("info-"):
#             name=name[5:]
#         j.tools.docgenerator.load(pathOrUrl=path,name=name)
#         j.tools.docgenerator.process()

# loc = "/Users/kristofdespiegeleer/synctf/"

# for item in j.sal.fs.listDirsInDir(loc):
#     name =  j.sal.fs.getBaseName(item)
#     if not name.startswith("."):
#         if name.startswith("info_") or name.startswith("info-"):
#             name=name[5:]
#         j.tools.docgenerator.load(pathOrUrl=item,name=name)

j.tools.docgenerator.process()

app = create_app()


# app = Flask(__name__)

Migrate(app, db)

app.config.from_object(rq_dashboard.default_settings)
app.register_blueprint(rq_dashboard.blueprint, url_prefix="/rq")

# app.run()