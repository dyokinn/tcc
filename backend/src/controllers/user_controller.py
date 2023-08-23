from models import User
from models import Scope, TextSchema, UserSchema
from config import db, bcrypt
from sqlalchemy.orm import Query

class UserController:

    def signup(data) -> User:
        pw_hash = bcrypt.generate_password_hash(data["password"]).decode('utf-8')

        user = User (
            username = data["username"],
            password = pw_hash
        )

        db.session.add(user)
        db.session.commit()
        return user

    def login(data) -> int:
        pw_hash = bcrypt.generate_password_hash(data["password"])
        query: Query = db.session.query(User)
        result: User = query.filter(User.username == data["username"]).first()
        is_valid = bcrypt.check_password_hash(result.password, data["password"])
        print(is_valid)
        return result.id if is_valid else 0
