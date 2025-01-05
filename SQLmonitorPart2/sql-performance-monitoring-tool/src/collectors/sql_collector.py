from sqlalchemy.orm import Session
from src.app import SessionLocal  # Correct import path

class SQLCollector:
    def __init__(self, config):
        self.config = config
        self.db = SessionLocal

    def collect_metrics(self):
        metrics = {}
        try:
            with self.db() as session:
                # Collect query performance metrics
                result = session.execute("""
                    SELECT
                        datname,
                        numbackends,
                        xact_commit,
                        xact_rollback,
                        blks_read,
                        blks_hit,
                        tup_returned,
                        tup_fetched,
                        tup_inserted,
                        tup_updated,
                        tup_deleted
                    FROM pg_stat_database
                """)
                metrics['query_performance'] = result.fetchall()

                # Collect connection statistics
                result = session.execute("""
                    SELECT
                        count(*) as total_connections,
                        count(*) filter (where state = 'active') as active_connections,
                        count(*) filter (where state = 'idle') as idle_connections
                    FROM pg_stat_activity
                """)
                metrics['connection_stats'] = result.fetchall()

                # Collect database size
                result = session.execute("""
                    SELECT
                        pg_database.datname,
                        pg_size_pretty(pg_database_size(pg_database.datname)) as size
                    FROM pg_database
                """)
                metrics['database_size'] = result.fetchall()

        except Exception as e:
            print(f"Error collecting metrics: {e}")
        
        return metrics