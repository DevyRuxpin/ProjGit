from utils.db_utils import execute_query

class SqlCollector:
    def __init__(self, db_connection):
        self.db_connection = db_connection

    def collect_metrics(self):
        metrics = []
        queries = [
            "SELECT query, total_time / calls AS avg_time FROM pg_stat_statements ORDER BY avg_time DESC LIMIT 5;"
        ]
        for query in queries:
            results = execute_query(self.db_connection, query)
            for row in results:
                metrics.append({
                    'query_name': row[0],
                    'response_time': row[1]
                })
        return metrics

    def get_query_performance(self, query):
        performance_data = {}
        results = execute_query(self.db_connection, query)
        if results:
            performance_data['execution_time'] = results[0][0]
        return performance_data