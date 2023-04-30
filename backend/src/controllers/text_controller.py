from typing import List
from models import Text

class TextController:
    @staticmethod
    def build_text(data) -> Text:
        Text = Text(
            content=data["content"],
            scope_id=data["user_id"]
        )

        return Text
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
        Text = Text(
            content=data["content"],
            scope_id=data["user_id"]
        )

        return Text
