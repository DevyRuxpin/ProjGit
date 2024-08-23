"""Print each word in uppercase from a list of words"""
def print_upper_words(words):

    for word in words:
        print(word.upper())

"""Print each word in uppercase from a list of words that start with the letter 'e' or 'E'"""
def print_upper_words_e(words):
    for word in words:
        if word.startswith('e') or word.startswith('E'):
            print(word.upper())


