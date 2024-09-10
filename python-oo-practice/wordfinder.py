import random
from random import choice

class WordFinder:
    def __init__(self, file_path):
        """Reads words from file and stores in a list"""
        self.file_path = file_path
        self.words = self.read_file(file_path)
        print(f"{len(self.words)} words read")

    def read_file(self, file_path):
        with open(file_path, "r") as file:
            return [word.strip() for word in file]

    def random(self):
        """Return a random word"""
        return choice(self.words)
    
wf = WordFinder("python-oo-practice/words.txt")
"""Usage: wf.random_word()"""