import asyncio
import json
from datetime import datetime
from app.services.crypto_api import CryptoAPI

class WebSocketManager:
    def __init__(self):
        self.connections = set()
        self.crypto_api = CryptoAPI()
        self.update_task = None

    async def register(self, websocket):
        self.connections.add(websocket)
        if not self.update_task:
            self.update_task = asyncio.create_task(self.price_update_loop())

    async def unregister(self, websocket):
        self.connections.remove(websocket)
        if not self.connections and self.update_task:
            self.update_task.cancel()
            self.update_task = None

    async def price_update_loop(self):
        while True:
            try:
                # Get price updates for all tracked cryptocurrencies
                prices = await self.get_price_updates()
                
                # Broadcast to all connected clients
                if prices:
                    await self.broadcast(json.dumps({
                        'type': 'price_update',
                        'data': prices,
                        'timestamp': datetime.utcnow().isoformat()
                    }))
                
                # Wait for 10 seconds before next update
                await asyncio.sleep(10)
            except Exception as e:
                print(f"Error in price update loop: {str(e)}")
                await asyncio.sleep(10)

    async def get_price_updates(self):
        # Get list of tracked cryptocurrencies from all active portfolios
        cryptocurrencies = await self.get_tracked_cryptocurrencies()
        
        # Get current prices
        prices = {}
        for crypto in cryptocurrencies:
            price_data = self.crypto_api.get_price(crypto)
            if price_data and crypto in price_data:
                prices[crypto] = price_data[crypto]['usd']
        
        return prices

    async def broadcast(self, message):
        if self.connections:
            await asyncio.gather(
                *[connection.send(message) for connection in self.connections],
                return_exceptions=True
            )

    @staticmethod
    async def get_tracked_cryptocurrencies():
        # This should be implemented to get list of cryptocurrencies from the database
        # For now, returning a sample list
        return ['bitcoin', 'ethereum', 'dogecoin']
