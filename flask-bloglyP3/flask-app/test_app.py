import unittest
from app import app, db
from models import User, Post, Tag

class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_home(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 302)  # Redirect to /users

    def test_list_users(self):
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 200)

    def test_new_user(self):
        response = self.app.post('/users/new', data=dict(first_name='Test', last_name='User', image_url='http://example.com/image.jpg'), follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Test User', response.data)

    def test_show_user(self):
        user = User(first_name='Test', last_name='User', image_url='http://example.com/image.jpg')
        db.session.add(user)
        db.session.commit()
        response = self.app.get(f'/users/{user.id}')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Test User', response.data)

    def test_edit_user(self):
        user = User(first_name='Test', last_name='User', image_url='http://example.com/image.jpg')
        db.session.add(user)
        db.session.commit()
        response = self.app.post(f'/users/{user.id}/edit', data=dict(first_name='Updated', last_name='User', image_url='http://example.com/updated_image.jpg'), follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Updated User', response.data)

    def test_delete_user(self):
        user = User(first_name='Test', last_name='User', image_url='http://example.com/image.jpg')
        db.session.add(user)
        db.session.commit()
        response = self.app.post(f'/users/{user.id}/delete', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertNotIn(b'Test User', response.data)

if __name__ == '__main__':
    unittest.main()