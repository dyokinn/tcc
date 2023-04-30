from flask import Flask
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from dotenv import load_dotenv
import os

# carrega as variaveis de ambiente
load_dotenv()

# app e SQLAlchemy
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('CONNECTION_URI')
db = SQLAlchemy(app)
ma = Marshmallow(app)
# main routes
