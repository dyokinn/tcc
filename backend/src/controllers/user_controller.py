from models import User

class UserController:
    @staticmethod
    def build_user(data) -> User:
        user = User(
            username=data["username"],
            password=data["password"]
        )

        return user
