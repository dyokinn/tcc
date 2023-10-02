from typing import List
from flask import jsonify
from sqlalchemy.orm import Query

from sqlalchemy import Integer, String, bindparam, select
from models import Text, TextResultSchema, TextSchema
from sqlalchemy.sql import text
from config import db

class TextController:
    @staticmethod
    def build_text(data) -> Text:
        text_obj = Text(
            content=data["content"],
            scope_id=data["user_id"]
        )

        return text_obj
    
    @staticmethod
    def read_by_scope(scope_id: int) -> List[Text]:
        text_schema = TextSchema(many=True)
        query: Query = db.session.query(Text)
        texts = query.filter(Text.scope_id == scope_id).all()
        return text_schema.dump(texts)

    @staticmethod
    def create_many(data) -> List[Text]:
        scope_id = data["scope_id"]
        json_texts = data["texts"]
        text_object_list = []

        for json_text in json_texts: 
            text_object = Text(
                content=json_text,
                scope_id=scope_id
            )
            text_object_list.append(text_object)

        db.session.add_all(text_object_list)
        db.session.commit()
        
        return TextController.read_by_scope(scope_id)
    

    @staticmethod
    def delete(text_id:int) -> int:
        query: Query = db.session.query(Text)
        result = query.filter(Text.id == text_id).delete()
        db.session.commit()
        return result

    @staticmethod
    def compare_text_to_text(data) -> Text:
        print(data)
        with db.engine.connect() as con:
            statement = """SELECT id, content, score FROM SEMANTICSIMILARITYTABLE ( [tcc-dev].dbo.texts, content, :text_id) AS KEY_TBL LEFT JOIN dbo.texts AS t ON KEY_TBL.matched_document_key = t.id WHERE scope_id = :scope_id AND SCORE > :min_score AND SCORE < :max_score """ 
            
            if (data["near_options"] != ""):
                optionals_text = "and "
                filters = str(data["near_options"]).split("&")
                parsed_filters = [f"""CONTAINS(content, 'NEAR(("{near_filter.split('|')[0]}", "{ near_filter.split('|')[1] }" ), 2, TRUE)')""" for near_filter in filters]
                parsed_filters_string = optionals_text + " and ".join(parsed_filters)

                statement = statement + parsed_filters_string
            
            parsed = text(statement).bindparams(
                bindparam("text_id", type_= Integer, value=data["text_id"]),
                bindparam("scope_id", type_= Integer, value=data["scope_id"]),
                bindparam("min_score", value=data["min_score"]),
                bindparam("max_score", value=data["max_score"]),
            )

            rs = con.execute(parsed)
            return TextResultSchema().dump(rs, many=True)
        
    @staticmethod
    def compare_text_to_concept(data) -> Text:
        with db.engine.connect() as con:
            statement = """SELECT FT_TBL.id, FT_TBL.content, KEY_TBL.RANK as score FROM [tcc-dev].dbo.texts AS FT_TBL INNER JOIN FREETEXTTABLE([tcc-dev].dbo.texts, content, :concept) AS KEY_TBL ON FT_TBL.id = KEY_TBL.[KEY] where scope_id = :scope_id ORDER by KEY_TBL.RANK  """ 
            print((data))
            parsed = text(statement).bindparams(
                bindparam("scope_id", type_= Integer, value=data["scope_id"]),
                bindparam("concept", type_= String, value=data["concept"])
            )

            rs = con.execute(parsed)
            return TextResultSchema().dump(rs, many=True)

# DECLARE @conteudo_ref_id VARCHAR(MAX)
# SET @conteudo_ref_id = (SELECT Id
# FROM dbo.texts
# WHERE id = :id)