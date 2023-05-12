
from ast import dump
from flask import Blueprint, jsonify, make_response, request
from flask_restx import Namespace, Resource, fields
from controllers.text_controller import TextController
from models import Text, TextSchema
from config import db, ma
from sqlalchemy.orm import Query

# Declaração de módulo
texts = Namespace('texts', description='Text related operations')

# Rotas
@texts.route("/create", methods=["POST"])
class Get(Resource):
    @texts.doc("login route")
    def post(self):
        data = request.get_json()
        texts = TextController.build_texts(data)
        
        db.session.add_all(texts)
        db.session.commit()
        return make_response({"message": "foi"}, 201)
    
@texts.route("/compare-by-text", methods=["GET"])
class Get(Resource):
    @texts.doc("login route")
    def get(self):
        args = request.args.to_dict()
        result = TextController.compare_text_to_text(args)
        
        
        return make_response(result, 201)
    