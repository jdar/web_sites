export FLASK_ENV=development
export FLASK_APP=main.py
# flask db upgrade
export FLASK_DEBUG=1
flask run -h 0.0.0.0 --debugger --eager-loading --without-threads