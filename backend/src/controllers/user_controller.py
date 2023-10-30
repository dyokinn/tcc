from models import User
from models import Scope, TextSchema, UserSchema
from config import db, bcrypt
from sqlalchemy.orm import Query

class UserController:

    def signup(data) -> User | int:
        try:
            pw_hash = bcrypt.generate_password_hash(data["password"]).decode('utf-8')

            user = User (
                username = data["username"],
                password = pw_hash
            )
            db.session.add(user)
            db.session.flush()

            db.session.commit()
            return user

        except Exception as e:
            return 0

    def login(data) -> User | int:
        pw_hash = bcrypt.generate_password_hash(data["password"])
        query: Query = db.session.query(User)
        user: User = query.filter(User.username == data["username"]).first()
        is_valid = bcrypt.check_password_hash(user.password, data["password"])
        print(pw_hash)
        print(user.password)
        return user if is_valid else 0
