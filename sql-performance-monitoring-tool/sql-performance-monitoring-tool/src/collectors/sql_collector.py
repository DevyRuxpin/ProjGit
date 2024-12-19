import psycopg2
from utils.db_utils import execute_query, load_config

class SqlCollector:
    def __init__(self, db_connection):
        self.db_connection = db_connection
        self.config = load_config()

    def collect_metrics(self, query):
        metrics = []
        try:
            results = execute_query(self.db_connection, query)
            for row in results:
                metrics.append({
                    'query_name': query,
                    'response_time': row[1]
                })
        except psycopg2.errors.ObjectNotInPrerequisiteState as e:
            print("pg_stat_statements extension is not loaded. Please enable it in your PostgreSQL configuration.")
        return metrics

    def get_query_performance(self, query):
        performance_data = {}
        results = execute_query(self.db_connection, query)
        if results:
            performance_data['execution_time'] = results[0][0]
        return performance_data