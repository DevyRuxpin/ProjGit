from flask import render_template, request, redirect, url_for
from app import app, db
from app.models import Employee, Schedule, WorkLog
from datetime import datetime

@app.route('/')
def index():
    employees = Employee.query.all()
    schedules = Schedule.query.all()
    return render_template('index.html', employees=employees, schedules=schedules)

@app.route('/create_schedule', methods=['GET', 'POST'])
def create_schedule():
    if request.method == 'POST':
        manager_id = request.form['manager_id']
        month = request.form['month']
        year = request.form['year']
        schedule_data = request.form['schedule_data']
        new_schedule = Schedule(manager_id=manager_id, month=month, year=year, schedule_data=schedule_data)
        db.session.add(new_schedule)
        db.session.commit()
        return redirect(url_for('view_schedule', schedule_id=new_schedule.id))
    return render_template('create_schedule.html')

@app.route('/edit_schedule/<int:schedule_id>', methods=['GET', 'POST'])
def edit_schedule(schedule_id):
    schedule = Schedule.query.get_or_404(schedule_id)
    if request.method == 'POST':
        schedule.manager_id = request.form['manager_id']
        schedule.month = request.form['month']
        schedule.year = request.form['year']
        schedule.schedule_data = request.form['schedule_data']
        db.session.commit()
        return redirect(url_for('view_schedule', schedule_id=schedule.id))
    return render_template('edit_schedule.html', schedule=schedule)

@app.route('/view_schedule/<int:schedule_id>')
def view_schedule(schedule_id):
    schedule = Schedule.query.get_or_404(schedule_id)
    return render_template('view_schedule.html', schedule=schedule)

@app.route('/create_employee', methods=['GET', 'POST'])
def create_employee():
    # Your code here
    pass