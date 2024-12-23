from flask import Flask, redirect, render_template, request, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension
from models import db, User

app = Flask(__name__)
app.config.from_object('config.Config')

db.init_app(app)
toolbar = DebugToolbarExtension(app)

@app.route('/initdb')
def initdb():
    db.create_all()
    return "Database initialized!"

@app.route('/')
def index():
    return redirect(url_for('list_users'))

@app.route('/users')
def list_users():
    users = User.query.all()
    return render_template('list_users.html', users=users)

@app.route('/users/new', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        image_url = request.form['image_url']
        new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('list_users'))
    return render_template('add_user.html')

@app.route('/users/<int:user_id>')
def show_user(user_id):
    user = db.session.get(User, user_id)
    if not user:
        return "User not found", 404
    return render_template('show_user.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=['GET', 'POST'])
def edit_user(user_id):
    user = db.session.get(User, user_id)
    if not user:
        return "User not found", 404
    if request.method == 'POST':
        user.first_name = request.form['first_name']
        user.last_name = request.form['last_name']
        user.image_url = request.form['image_url']
        db.session.commit()
        return redirect(url_for('show_user', user_id=user.id))
    return render_template('edit_user.html', user=user)

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    user = db.session.get(User, user_id)
    if not user:
        return "User not found", 404
    db.session.delete(user)
    db.session.commit()
    return redirect(url_for('list_users'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)