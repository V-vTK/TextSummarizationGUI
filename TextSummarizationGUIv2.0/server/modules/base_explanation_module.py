class BaseExplanationModule:
    def __init__(self, summarizer, parser, LANGUAGE, SENTENCES_COUNT):
        self.summarizer = summarizer
        self.parser = parser
        self.LANGUAGE = LANGUAGE
        self.SENTENCES_COUNT = SENTENCES_COUNT