
from ast import dump
from flask import Blueprint, jsonify, make_response, request
from flask_restx import Namespace, Resource, fields
from controllers.user_controller import UserController
from models import User, UserSchema
from config import db, ma
from sqlalchemy.orm import Query

# Declaração de módulo
users = Namespace('users', description='User related operations')

# Rotas
@users.route("/login", methods=["POST"])
class Get(Resource):
    @users.doc("login route")
    def post(self):
        data = request.get_json()
        user = UserController.login(data)
        parsed_user = UserSchema().dump(user)
        try:
            del parsed_user["password"]
        except Exception as e:
            pass
        return make_response({"user": parsed_user}, 200) if user != 0 else make_response({"message": "Wrong credentials!"}, 400)
    
@users.route("/register", methods=["POST"])
class Register(Resource):
    @users.doc("route designed to create an user in the database")
    def post(self):
        data = request.get_json()
        user = UserController.signup(data)
        parsed_user = UserSchema().dump(user)
        try:
            del parsed_user["password"]
        except Exception as e:
            pass
        return make_response({"user": parsed_user}, 200) if user != 0 else make_response({"message": "User already exists!"}, 400)