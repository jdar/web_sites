from flask import Flask
import rq_dashboard

app = Flask(__name__)
app.config.from_object(rq_dashboard.default_settings)
app.register_blueprint(rq_dashboard.blueprint, url_prefix="/rq")

from flask_bootstrap import Bootstrap

Bootstrap(app)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":

    app.run()