
from ast import dump
from flask import Blueprint, jsonify, make_response, request
from flask_restx import Namespace, Resource, fields
from controllers.text_controller import TextController
from models import Text, TextResultSchema, TextSchema
from config import db, ma
from sqlalchemy.orm import Query

# Declaração de módulo
texts = Namespace('texts', description='Text related operations')

# Rotas
@texts.route("/", methods=["POST"])
class Texts(Resource):
    @texts.doc("add texts to a scope")
    def post(self):
        data = request.get_json()
        texts = TextController.create_many(data)
    
        return make_response(texts, 201)
    
@texts.route("/<int:text_id>", methods=["DELETE"])
class Delete(Resource):
    @texts.doc("delete text")
    def delete(self, text_id: int):
        result = TextController.delete(text_id)
        return make_response({"message": result}, 200)
    
@texts.route("/compare-by-text", methods=["GET"])
class CompareByText(Resource):
    @texts.doc("login route")
    def get(self):
        args = request.args.to_dict()
        result = TextController.compare_text_to_text(args)
        return make_response(result, 200)
    
@texts.route("/compare-by-concept", methods=["GET"])
class CompareByConcept(Resource):
    @texts.doc("login route")
    def get(self):
        args = request.args.to_dict()
        result = TextController.compare_text_to_concept(args)
        return make_response(result, 200)
    