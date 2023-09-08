from modules.base_explanation_module import BaseExplanationModule
import re


class LexRankExplanationModule(BaseExplanationModule):
    def __call__(self, input_value):
        document = self.parser.document
        sentences_as_words_sets = [self.summarizer._to_words_set(sentence) for sentence in document.sentences]
        stop_words = self.summarizer.stop_words
        matrix = self.summarizer._create_matrix(sentences_as_words_sets, self.summarizer.threshold,
                                        self.summarizer._compute_tf(sentences_as_words_sets),
                                        self.summarizer._compute_idf(sentences_as_words_sets))
        power_vector = self.summarizer.power_method(matrix, self.summarizer.epsilon)
        ratings = dict(zip(document.sentences, power_vector))
        
        result = {
            "stopWords": list(stop_words),
            "sentencesAsWordsSets": sentences_as_words_sets,
            "matrix": matrix.tolist(),
            "ratings": self.change_sentence_obj_to_ordered_dictionary(str(ratings)),
            "ratings2": str(ratings),
            "powerVector": str(power_vector)
        }

        return result

    @staticmethod
    def change_sentence_obj_to_ordered_dictionary(input_string):
        pattern = r"<Sentence: (.*?)>: (-?\d+\.\d+)"
        matches = re.findall(pattern, input_string)
        
        new_dict = {}
        for idx, (sentence, rating) in enumerate(matches):
            new_dict[idx] = {"sentence": sentence, "rating": float(rating)}

        return new_dict