from config import app, db
from apis.versions.v1 import blueprint as api_v1_blueprint
from models import User, Scope, Text
# registra os blueprints
app.register_blueprint(api_v1_blueprint)

# roda o server e cria as tabelas caso nao existam
with app.app_context():
    db.create_all()

app.run(debug=True)