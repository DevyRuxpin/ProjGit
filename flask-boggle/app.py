from flask import Flask, request, jsonify, render_template, session
from boggle import Boggle
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Secret key for session management
boggle_game = Boggle()

@app.route('/')
def home():
    board = boggle_game.make_board()
    session['board'] = board
    session['plays'] = session.get('plays', 0)
    session['high_score'] = session.get('high_score', 0)
    return render_template('board.html', board=board, plays=session['plays'], high_score=session['high_score'])

@app.route('/check-word', methods=['POST'])
def check_word():
    word = request.json.get('word')
    board = session.get('board')
    if not boggle_game.check_valid_word(word):
        result = 'not-a-word'
    elif not boggle_game.find(word, board):
        result = 'not-on-board'
    else:
        result = 'ok'
    return jsonify({'result': result})

@app.route('/update-score', methods=['POST'])
def update_score():
    score = request.json.get('score')
    session['plays'] += 1
    if score > session['high_score']:
        session['high_score'] = score
    return jsonify({'plays': session['plays'], 'high_score': session['high_score']})

if __name__ == '__main__':
    app.run(debug=True)