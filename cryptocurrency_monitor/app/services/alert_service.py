from app import db
from app.models.alert import Alert
from app.services.crypto_api import CryptoAPI
from flask_mail import Message
from app import mail

class AlertService:
    def __init__(self):
        self.crypto_api = CryptoAPI()

    def check_alerts(self):
        active_alerts = Alert.query.filter_by(is_active=True).all()
        for alert in active_alerts:
            current_price = self.crypto_api.get_price(alert.cryptocurrency)
            if self._should_trigger_alert(alert, current_price):
                self._send_alert_notification(alert)

    def _should_trigger_alert(self, alert, current_price):
        price = current_price[alert.cryptocurrency]['usd']
        if alert.condition == 'above' and price >= alert.price_threshold:
            return True
        elif alert.condition == 'below' and price <= alert.price_threshold:
            return True
        return False

    def _send_alert_notification(self, alert):
        msg = Message(
            f"Price Alert for {alert.cryptocurrency}",
            sender="noreply@cryptomonitor.com",
            recipients=[alert.user.email]
        )
        msg.body = f"Your price alert for {alert.cryptocurrency} has been triggered!"
        mail.send(msg)
