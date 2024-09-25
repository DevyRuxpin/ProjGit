from flask import render_template, request, redirect, url_for
from app import app, db
from app.models import Workforce, Client, Task, Schedule, Billing

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/schedule')
def schedule():
    return render_template('schedule.html')

@app.route('/tasks')
def tasks():
    return render_template('tasks.html')

@app.route('/clock')
def clock():
    return render_template('clock.html')

@app.route('/billing')
def billing():
    return render_template('billing.html')