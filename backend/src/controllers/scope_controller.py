from models import Scope, TextSchema, ScopeSchema
from config import db
from sqlalchemy.orm import Query

class ScopeController:

    @staticmethod
    def get(id:int) -> dict | list[dict]:
        scope_schema = ScopeSchema(many = id == None)

        query: Query = db.session.query(Scope).join(Scope.texts, isouter=True)
        result = query.filter(Scope.id == id).first() if id != None else query.all()
        return scope_schema.dump(result)

    @staticmethod
    def create(data) -> dict:
        scope_schema = ScopeSchema()

        scope = Scope(
            name=data["name"],
            description=data["description"],
            user_id=data["user_id"]
        )

        db.session.add(scope)
        db.session.commit()

        return scope_schema.dump(scope)
    
    @staticmethod
    def update(id, data) -> dict:
        scope_schema = ScopeSchema()

        query: Query = db.session.query(Scope)
        scope: Scope = query.filter(Scope.id == id).first()
        
        scope.name = data["name"]
        scope.description = data["description"]

        db.session.commit()

        return scope_schema.dump(scope)
    
    @staticmethod
    def delete(id:int) -> bool:
        query: Query = db.session.query(Scope)
        result = query.filter(Scope.id == id).first()
        db.session.delete(result)
        db.session.commit()
        return True if result else False
