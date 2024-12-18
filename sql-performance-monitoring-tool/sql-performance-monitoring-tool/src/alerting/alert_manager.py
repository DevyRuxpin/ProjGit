class AlertManager:
    def __init__(self, thresholds):
        self.thresholds = thresholds

    def check_alerts(self, metrics):
        alerts = []
        for metric in metrics:
            if metric['response_time'] > self.thresholds['query_response_time']:
                alerts.append(f"Alert: {metric['query_name']} has exceeded the response time threshold with value {metric['response_time']} ms.")
        return alerts

    def send_alert(self, alerts):
        # Here you would implement the logic to send the alert, e.g., email, SMS, etc.
        for alert in alerts:
            print(alert)