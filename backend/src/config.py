from flask import Flask, make_response, request
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from dotenv import load_dotenv
import os
from flask_cors import CORS
from flask_bcrypt import Bcrypt

# carrega as variaveis de ambiente
load_dotenv()

# app e SQLAlchemy
app = Flask(__name__)
cors = CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('CONNECTION_URI')
app.config["SECRET_KEY"] = os.getenv('SECRET_KEY')

db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app, version="1.0", title="Semantech")
bcrypt = Bcrypt(app)

@app.before_request
def validate_access():
    if (request.method != "OPTIONS"):
        secret = request.headers.get("x-api-key")
        if (secret != app.config["SECRET_KEY"]):
            resp = make_response({"Error": "Unauthorized"}, 401)
            return resp
