class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres@localhost:5001/flask_blogly'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    SECRET_KEY = ''
