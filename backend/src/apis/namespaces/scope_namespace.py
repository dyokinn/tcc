
from ast import dump
from flask import Blueprint, jsonify, make_response, request
from flask_restx import Namespace, Resource
from controllers.scope_controller import ScopeController
from models import Scope, ScopeSchema
from config import db, ma
from sqlalchemy.orm import Query

# Declaração de módulo
scopes = Namespace('scopes', description='Scope related operations')

# Rotas
@scopes.route("/<int:id>", methods=["GET", "PUT"])
@scopes.route("/", methods=["GET"])
class Get(Resource):
    @scopes.doc("route designed to retrieve all scopes from database")
    def get(self, id:int=None):
        resp = None
        try:
            scopes = ScopeController.get(id)
            resp =  make_response(scopes, 200)
        except Exception as e:
            resp =  make_response(e, 500)
        return resp
    
    @scopes.doc("route designed to edit scope from database")
    def put(self, id:int=None):
        resp = None
        data = request.get_json()
        
        try:
            scopes = ScopeController.update(id, data)
            resp =  make_response(scopes, 200)
        except Exception as e:
            resp =  make_response(e, 500)
        return resp
    
@scopes.route("/", methods=["POST"])
class Create(Resource):
    @scopes.doc("scope creation route")
    def post(self):
        data = request.get_json()
        scope = ScopeController.create(data)
        return make_response(scope, 201)
    
@scopes.route("/<int:id>", methods=["DELETE"])
class Delete(Resource):
    @scopes.doc("scope deletion route")
    def delete(self, id: int):
        is_deleted = ScopeController.delete(id)
        result = ScopeController.get(None)
        return make_response(result, 200)