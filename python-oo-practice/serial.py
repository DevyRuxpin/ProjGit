"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100
    
    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start=0):
        """Initialize a new serial generator with a starting number."""
        self.start = start
        self.next = start


    def generate(self):
        """return the next serial number"""
        
        self.next += 1
        return self.next - 1
    
    def reset(self):
        """reset the serial number to the original start number"""
        self.next = self.start
        
