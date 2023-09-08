from modules.base_explanation_module import BaseExplanationModule
import re

class ReductionExplanationModule(BaseExplanationModule):

    def __call__(self, input_value):
        document = self.parser.document
        ratings = self.summarizer.rate_sentences(document)
        print(ratings)
        sentences_words = [self.summarizer._to_words_set(s) for s in document.sentences]
        print(sentences_words)
        results = {
            "ratings" : self.change_sentence_obj_to_dictionary(str(ratings)),
            "sentenceWords" : sentences_words
        }
        return results
    
    @staticmethod
    def change_sentence_obj_to_dictionary(input_string):
        pattern = r"<Sentence: (.*?)>: (\d)"
        matches = re.findall(pattern, input_string)

        new_dict = {sentence: int(rating) for sentence, rating in matches}
        return new_dict