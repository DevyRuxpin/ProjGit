from flask import Flask, redirect, render_template, request, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension
from models import db, User, Post

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

@app.route('/users/<int:user_id>/posts/new', methods=['GET', 'POST'])
def add_post(user_id):
    user = db.session.get(User, user_id)
    if not user:
        return "User not found", 404
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        new_post = Post(title=title, content=content, user_id=user_id)
        db.session.add(new_post)
        db.session.commit()
        return redirect(url_for('show_user', user_id=user_id))
    return render_template('add_post.html', user=user)

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    post = db.session.get(Post, post_id)
    if not post:
        return "Post not found", 404
    return render_template('show_post.html', post=post)

@app.route('/posts/<int:post_id>/edit', methods=['GET', 'POST'])
def edit_post(post_id):
    post = db.session.get(Post, post_id)
    if not post:
        return "Post not found", 404
    if request.method == 'POST':
        post.title = request.form['title']
        post.content = request.form['content']
        db.session.commit()
        return redirect(url_for('show_post', post_id=post.id))
    return render_template('edit_post.html', post=post)

@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    post = db.session.get(Post, post_id)
    if not post:
        return "Post not found", 404
    db.session.delete(post)
    db.session.commit()
    return redirect(url_for('show_user', user_id=post.user_id))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)