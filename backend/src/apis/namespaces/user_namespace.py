
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
        user_id = UserController.login(data)
        print(data)
        return make_response({"userId": user_id}, 200) if user_id != 0 else make_response({"message": "wrong credentials"}, 400)
    
@users.route("/register", methods=["POST"])
class Register(Resource):
    @users.doc("route designed to create an user in the database")
    def post(self):
        data = request.get_json()
        user = UserController.signup(data)
        
        db.session.add(user)
        db.session.commit()
        return make_response({"message": "foi"}, 201)