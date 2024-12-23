import unittest
from app import app, db
from models import User

class FlaskAppTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        cls.client = app.test_client()
        with app.app_context():
            db.create_all()

    @classmethod
    def tearDownClass(cls):
        with app.app_context():
            db.drop_all()

    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_index_redirect(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 302)
        self.assertIn('/users', response.location)

    def test_list_users(self):
        response = self.client.get('/users')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'User List', response.data)

    def test_add_user_get(self):
        response = self.client.get('/users/new')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Add User', response.data)

    def test_add_user_post(self):
        response = self.client.post('/users/new', data={
            'first_name': 'John',
            'last_name': 'Doe',
            'image_url': 'http://example.com/image.jpg'
        }, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'John', response.data)
        self.assertIn(b'Doe', response.data)

    def test_show_user(self):
        user = User(first_name='Jane', last_name='Doe', image_url='http://example.com/image.jpg')
        db.session.add(user)
        db.session.commit()
        user_id = user.id

        response = self.client.get(f'/users/{user_id}')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Jane', response.data)
        self.assertIn(b'Doe', response.data)

if __name__ == '__main__':
    unittest.main()