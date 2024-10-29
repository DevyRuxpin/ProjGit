from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

class FlaskTests(TestCase):

    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_home(self):
        with self.client:
            response = self.client.get('/')
            self.assertIn(b'Boggle Game', response.data)
            self.assertIn(b'Plays: 0', response.data)
            self.assertIn(b'High Score: 0', response.data)

    def test_check_word(self):
        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [["C", "A", "T", "S"], ["D", "O", "G", "S"], ["R", "A", "T", "S"], ["B", "A", "T", "S"]]
            response = client.post('/check-word', json={'word': 'cats'})
            self.assertEqual(response.json['result'], 'ok')

    def test_update_score(self):
        with self.client as client:
            with client.session_transaction() as sess:
                sess['plays'] = 0
                sess['high_score'] = 0
            response = client.post('/update-score', json={'score': 10})
            self.assertEqual(response.json['plays'], 1)
            self.assertEqual(response.json['high_score'], 10)