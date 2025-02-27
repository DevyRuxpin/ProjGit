"""SQLAlchemy models for blogly."""

import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func  # Ensure func is imported

db = SQLAlchemy()

DEFAULT_IMAGE_URL = "https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"


class User(db.Model):
    """Site user."""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String, nullable=True, default=DEFAULT_IMAGE_URL)

    posts = db.relationship("Post", backref="user", lazy=True)

    @property
    def full_name(self):
        """Return full name of user."""

        return f"{self.first_name} {self.last_name}"

    def __repr__(self):
        return f"<User {self.id} {self.full_name}>"


class Post(db.Model):
    """Blog post."""

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=func.now())  # Ensure func.now() is used correctly
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    parent_post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=True)

    tags = db.relationship('Tag', secondary='post_tags', backref='tagged_posts', overlaps="tagged_posts,tags")
    replies = db.relationship('Post', backref=db.backref('parent_post', remote_side=[id]), lazy=True)

    @property
    def friendly_date(self):
        """Return nicely-formatted date."""

        return self.created_at.strftime("%a %b %-d  %Y, %-I:%M %p")

    def __repr__(self):
        return f"<Post {self.id} {self.title}>"


class PostTag(db.Model):
    """Tag on a post."""

    __tablename__ = "post_tags"

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)

    def __repr__(self):
        return f"<PostTag post_id={self.post_id} tag_id={self.tag_id}>"


class Tag(db.Model):
    """Tag that can be added to posts."""

    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    posts = db.relationship(
        'Post',
        secondary="post_tags",
        backref="tagged_posts",
        overlaps="tagged_posts,tags"
    )

    def __repr__(self):
        return f"<Tag {self.id} {self.name}>"


def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)
