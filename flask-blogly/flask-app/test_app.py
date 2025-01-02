def test_edit_post_get(self):
    user = User(first_name='Jane', last_name='Doe', image_url='http://example.com/image.jpg')
    db.session.add(user)
    db.session.commit()
    user_id = user.id

    post = Post(title='My First Post', content='This is the content of my first post.', user_id=user_id)
    db.session.add(post)
    db.session.commit()
    post_id = post.id

    response = self.client.get(f'/posts/{post_id}/edit')
    self.assertEqual(response.status_code, 200)
    self.assertIn(b'Edit Post', response.data)

def test_edit_post_post(self):
    user = User(first_name='Jane', last_name='Doe', image_url='http://example.com/image.jpg')
    db.session.add(user)
    db.session.commit()
    user_id = user.id

    post = Post(title='My First Post', content='This is the content of my first post.', user_id=user_id)
    db.session.add(post)
    db.session.commit()
    post_id = post.id

    response = self.client.post(f'/posts/{post_id}/edit', data={
        'title': 'Updated Post Title',
        'content': 'Updated content of the post.'
    }, follow_redirects=True)
    self.assertEqual(response.status_code, 200)
    self.assertIn(b'Updated Post Title', response.data)
    self.assertIn(b'Updated content of the post.', response.data)

def test_delete_post(self):
    user = User(first_name='Jane', last_name='Doe', image_url='http://example.com/image.jpg')
    db.session.add(user)
    db.session.commit()
    user_id = user.id

    post = Post(title='My First Post', content='This is the content of my first post.', user_id=user_id)
    db.session.add(post)
    db.session.commit()
    post_id = post.id

    response = self.client.post(f'/posts/{post_id}/delete', follow_redirects=True)
    self.assertEqual(response.status_code, 200)
    self.assertNotIn(b'My First Post', response.data)