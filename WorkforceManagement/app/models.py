from app import db

class Workforce(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    workforce_id = db.Column(db.Integer, db.ForeignKey('workforce.id'), nullable=False)

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    workforce_id = db.Column(db.Integer, db.ForeignKey('workforce.id'), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)

class Billing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)