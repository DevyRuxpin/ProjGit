import yaml
import psycopg2

def load_config():
    with open('config.yaml', 'r') as file:
        return yaml.safe_load(file)

def connect_to_db(db_config):
    connection = psycopg2.connect(
        host=db_config['host'],
        port=db_config['port'],
        user=db_config['user'],
        password=db_config['password'],
        dbname=db_config['database_name']
    )
    return connection

def execute_query(connection, query):
    with connection.cursor() as cursor:
        cursor.execute(query)
        return cursor.fetchall()