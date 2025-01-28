# tags.py
from flask import request, redirect, render_template, Blueprint

tags_bp = Blueprint('tags', __name__)
from models import Tag, db

@tags_bp.route('/tags')
def list_tags():
    tags = Tag.query.all()
    return render_template('tags/list.html', tags=tags)

@tags_bp.route('/tags/new', methods=['GET', 'POST'])
def new_tag():
    if request.method == 'POST':
        name = request.form['name']
        tag = Tag(name=name)
        db.session.add(tag)
        db.session.commit()
        return redirect('/tags')
    return render_template('tags/new.html')

@tags_bp.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    return render_template('tags/show.html', tag=tag)

@tags_bp.route('/tags/<int:tag_id>/edit', methods=['GET', 'POST'])
def edit_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    if request.method == 'POST':
        tag.name = request.form['name']
        db.session.commit()
        return redirect('/tags')
    return render_template('tags/edit.html', tag=tag)

@tags_bp.route('/tags/<int:tag_id>/delete', methods=['POST'])
def delete_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()
    return redirect('/tags')