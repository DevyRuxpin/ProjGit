from flask import Flask, redirect, render_template, request, url_for
from models import db, User, Post, Tag, PostTag
from tags import tags_bp
from config import Config
from forms import UserForm, PostForm

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(tags_bp)

@app.route('/')
def home():
    return redirect(url_for('list_users'))

@app.route('/users')
def list_users():
    users = User.query.all()
    return render_template('users/list.html', users=users)

@app.route('/users/new', methods=['GET', 'POST'])
def new_user():
    form = UserForm()
    if form.validate_on_submit():
        user = User(first_name=form.first_name.data, last_name=form.last_name.data, image_url=form.image_url.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('list_users'))
    return render_template('users/new.html', form=form)

@app.route('/users/<int:user_id>')
def show_user(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('users/show.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=['GET', 'POST'])
def edit_user(user_id):
    user = User.query.get_or_404(user_id)
    form = UserForm(obj=user)
    if form.validate_on_submit():
        form.populate_obj(user)
        db.session.commit()
        return redirect(url_for('show_user', user_id=user.id))
    return render_template('users/edit.html', form=form)

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect(url_for('list_users'))

@app.route('/users/<int:user_id>/posts/new', methods=['GET', 'POST'])
def create_post(user_id):
    user = User.query.get_or_404(user_id)
    form = PostForm()
    form.tags.choices = [(tag.id, tag.name) for tag in Tag.query.all()]
    if form.validate_on_submit():
        new_post = Post(title=form.title.data, content=form.content.data, user_id=user_id)
        db.session.add(new_post)
        db.session.commit()
        for tag_id in form.tags.data:
            post_tag = PostTag(post_id=new_post.id, tag_id=tag_id)
            db.session.add(post_tag)
        db.session.commit()
        return redirect(url_for('show_post', post_id=new_post.id))
    return render_template('posts/new.html', form=form, user=user)

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('posts/show.html', post=post)

@app.route('/posts/<int:post_id>/edit', methods=['GET', 'POST'])
def edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    form = PostForm(obj=post)
    form.tags.choices = [(tag.id, tag.name) for tag in Tag.query.all()]
    if form.validate_on_submit():
        form.populate_obj(post)
        db.session.commit()
        return redirect(url_for('show_post', post_id=post.id))
    return render_template('posts/edit.html', form=form, post=post)

@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return redirect(url_for('list_users'))

if __name__ == '__main__':
    app.run(debug=True)