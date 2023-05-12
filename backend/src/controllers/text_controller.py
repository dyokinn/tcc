from typing import List
from flask import jsonify

from sqlalchemy import select
from models import Text, TextResultSchema
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

    def build_texts(data) -> List[Text]:
        scope_id = data["scope_id"]
        json_texts = data["texts"]
        text_object_list = []

        for json_text in json_texts: 
            text_object = Text(
                content=json_text,
                scope_id=scope_id
            )
            text_object_list.append(text_object)

        return text_object_list
    
    @staticmethod
    def compare_text_to_text(data) -> Text:

        with db.engine.connect() as con:
            if data["near_options"] == None:
                statement = text("""
                    SELECT content, score FROM SEMANTICSIMILARITYTABLE  
                        (  
                            [tcc-dev].dbo.texts,
                            content,  
                            :text_id
                        ) AS KEY_TBL  
                        LEFT JOIN dbo.texts AS t
                    ON KEY_TBL.matched_document_key = t.id
                    WHERE scope_id = :scope_id
                    AND SCORE > :min_score
                    ORDER BY KEY_TBL.score DESC;
                """).bindparams(text_id = data["text_id"], scope_id = data["scope_id"], min_score = data["min_score"])

            else:
                optionals_text = "and "
                filters = str(data["near_options"]).split("&")
                parsed_filters = [f"CONTAINS(content, 'NEAR(({near_filter.split('|')[0]}, { near_filter.split('|')[1] } ), 2, TRUE)')" for near_filter in filters]
                parsed_filters_string = optionals_text + " and ".join(parsed_filters)

                statement = text("""
                    SELECT content, score FROM SEMANTICSIMILARITYTABLE  
                        (  
                            [tcc-dev].dbo.texts,
                            content,  
                            :text_id
                        ) AS KEY_TBL  
                        LEFT JOIN dbo.texts AS t
                    ON KEY_TBL.matched_document_key = t.id
                    WHERE scope_id = :scope_id
                    AND SCORE > :min_score
                    :near_options
                    ORDER BY KEY_TBL.score DESC;
                """).bindparams(text_id = data["text_id"], scope_id = data["scope_id"], min_score = data["min_score"], near_options = parsed_filters_string)
                
            rs = con.execute(statement)
            return TextResultSchema().dump(rs, many=True)

# DECLARE @conteudo_ref_id VARCHAR(MAX)
# SET @conteudo_ref_id = (SELECT Id
# FROM dbo.texts
# WHERE id = :id)