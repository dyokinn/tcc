from flask import Blueprint
from flask_cors import CORS
from flask_restx import Api
from apis.namespaces.user_namespace import users
from apis.namespaces.scope_namespace import scopes
from apis.namespaces.text_namespace import texts
from config import db, ma

# Declaração do blueprint e a API para funcionalidades do RestX
blueprint = Blueprint('v1', __name__, url_prefix="/api/v1")
api = Api(blueprint)

# Adição dos namespaces com as funcionalidades
api.add_namespace(users)
api.add_namespace(scopes)
api.add_namespace(texts)