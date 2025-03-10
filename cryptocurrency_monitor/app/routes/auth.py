from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, login_required, current_user
from app.models.user import User
from app import db, bcrypt
from app.services.analytics_service import AnalyticsService

bp = Blueprint('auth', __name__)

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('portfolio.index'))
    
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if password != confirm_password:
            flash('Passwords do not match!', 'danger')
            return render_template('auth/register.html')

        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already registered!', 'danger')
            return render_template('auth/register.html')

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, email=email, password_hash=hashed_password)
        
        db.session.add(user)
        db.session.commit()

        AnalyticsService.record_activity(user.id, 'registration', {'username': username})
        flash('Account created successfully!', 'success')
        return redirect(url_for('auth.login'))

    return render_template('auth/register.html')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('portfolio.index'))
    
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password_hash, password):
            login_user(user)
            AnalyticsService.record_activity(user.id, 'login', {})
            next_page = request.args.get('next')
            return redirect(next_page if next_page else url_for('portfolio.index'))
        else:
            flash('Invalid email or password!', 'danger')

    return render_template('auth/login.html')

@bp.route('/logout')
@login_required
def logout():
    AnalyticsService.record_activity(current_user.id, 'logout', {})
    logout_user()
    return redirect(url_for('auth.login'))
