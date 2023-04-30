from models import Scope

class ScopeController:
    @staticmethod
    def build_scope(data) -> Scope:
        scope = Scope(
            name=data["name"],
            description=data["description"],
            user_id=data["user_id"]
        )

        return scope
