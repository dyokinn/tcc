
from ast import dump
from flask import Blueprint, jsonify, make_response, request
from flask_restx import Namespace, Resource, fields
from controllers.scope_controller import ScopeController
from models import Scope, ScopeSchema
from config import db, ma
from sqlalchemy.orm import Query

# Declaração de módulo
scopes = Namespace('scopes', description='Scope related operations')

# Rotas
@scopes.route("/create", methods=["POST"])
class Get(Resource):
    @scopes.doc("scope creation route")
    def post(self):
        data = request.get_json()
        scope = ScopeController.build_scope(data)
        
        db.session.add(scope)
        db.session.commit()
        return make_response({"message": "foi"}, 201)
    
@scopes.route("/<id>", methods=["POST"])
class Register(Resource):
    @scopes.doc("route designed to create an user in the database")
    def post(self):
        return make_response({"message": "foi"}, 201)