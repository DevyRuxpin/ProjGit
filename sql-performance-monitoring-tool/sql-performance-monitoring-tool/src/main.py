import time
from collectors.sql_collector import SqlCollector
from visualizers.performance_visualizer import PerformanceVisualizer
from alerting.alert_manager import AlertManager
from utils.db_utils import connect_to_db, load_config

def main():
    config = load_config()
    db_connection = connect_to_db(config['database'])
    sql_collector = SqlCollector(db_connection)
    performance_visualizer = PerformanceVisualizer()
    alert_manager = AlertManager(config['alerting']['thresholds'])

    while True:
        query = input("Enter the SQL query to run: ")
        if query.lower() == 'exit':
            break

        metrics = sql_collector.collect_metrics(query)
        performance_visualizer.visualize_metrics(metrics)

        alerts = alert_manager.check_alerts(metrics)
        if alerts:
            alert_manager.send_alert(alerts)

        time.sleep(60)  # Monitor every minute

if __name__ == "__main__":
    main()