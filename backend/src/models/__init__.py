from typing import List

from sqlalchemy import ForeignKey
from config import db, ma
from sqlalchemy.orm import relationship

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

# Models
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String(100))

    # Relationships
    scopes: Mapped[List["Scope"]] = relationship(back_populates="user")


class Scope(db.Model):
    __tablename__ = 'scopes'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100))
    description = db.Column(db.Text())
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    # Relationships
    user:Mapped["User"]= relationship(back_populates="scopes")
    texts: Mapped[List["Text"]] = relationship(back_populates="scope")
    

class Text(db.Model):
    __tablename__ = 'texts'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.Text())
    scope_id: Mapped[int] = mapped_column(ForeignKey("scopes.id"))

    # Relationships
    scope: Mapped["Scope"] = relationship(back_populates="texts")


# Schema Definition for serializers
class TextSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Text
        load_instance = True

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

class ScopeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Scope
        load_instance = True