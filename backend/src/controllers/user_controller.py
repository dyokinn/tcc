from models import User
from models import Scope, TextSchema, UserSchema
from config import db, bcrypt
from sqlalchemy.orm import Query

class UserController:

    def signup(data) -> int:
        pw_hash = bcrypt.generate_password_hash(data["password"]).decode('utf-8')

        user = User (
            username = data["username"],
            password = pw_hash
        )
        db.session.add(user)
        db.session.flush()

        db.session.commit()

        return user.id

    def login(data) -> int:
        pw_hash = bcrypt.generate_password_hash(data["password"])
        query: Query = db.session.query(User)
        result: User = query.filter(User.username == data["username"]).first()

        is_valid = bcrypt.check_password_hash(result.password, data["password"])
        
        return result.id if is_valid else 0
