from sumy.summarizers.edmundson import EdmundsonLocationMethod
from sumy.summarizers.edmundson import EdmundsonTitleMethod
from sumy.summarizers.edmundson import EdmundsonKeyMethod
from sumy.nlp.stemmers import Stemmer
import re

class EdmundsonExplanationModule:

    def __init__(self, stemmer, summarizer, parser, word_limit, SENTENCES_COUNT):
        self.stemmer = stemmer
        self.summarizer = summarizer
        self.parser = parser
        self.word_limit = word_limit
        self.SENTENCES_COUNT = SENTENCES_COUNT

    @staticmethod
    def get_sentence_ratings(summarizer, document):
        ratings = {}
        # Perform Cue Method
        if summarizer._cue_weight > 0.0:
            method = summarizer._build_cue_method_instance()
            cue_ratings = method.rate_sentences(document)
            ratings["cueMethod"] = cue_ratings
        # Perform Key Method
        if summarizer._key_weight > -1: #Why does it not work with 0.0 even though the ratings are above 0?
            method = summarizer._build_key_method_instance()
            key_ratings = method.rate_sentences(document)
            ratings["keyMethod"] = key_ratings
        # Perform Title Method
        if summarizer._title_weight > 0.0:
            method = summarizer._build_title_method_instance()
            title_ratings = method.rate_sentences(document)
            ratings["titleMethod"] = title_ratings
        # Perform Location Method
        if summarizer._location_weight > 0.0:
            method = summarizer._build_location_method_instance()
            location_ratings = method.rate_sentences(document)
            ratings["locationMethod"] = location_ratings

        return ratings


    def key_method(stemmer, summarizer, parser):
        summarizer_instance = EdmundsonKeyMethod(stemmer, summarizer.bonus_words)
        rated_sentences = summarizer_instance.rate_sentences(parser.document)
        sentences_ratings_dict = {}

        for sentence, rating in rated_sentences.items():
            sentences_ratings_dict[sentence] = rating

        return sentences_ratings_dict


    def __call__(self, input_value):
        bonus_words = list(self.summarizer.bonus_words)
        stigma_words = list(self.summarizer.stigma_words)
        null_words = list(self.summarizer.null_words)
        summarized_sentences = []
        word_count = 0
        for sentence in self.summarizer(self.parser.document, self.SENTENCES_COUNT):
            current_words = str(sentence).split()
            if word_count + len(current_words) > self.word_limit:
                break
            summarized_sentences.append(str(sentence))
            word_count += len(current_words)

        result = " ".join(summarized_sentences)
        ratings2 = self.get_sentence_ratings(self.summarizer, self.parser.document)
        all_method_ratings = {}
        found_cue_words = []
        for method, method_output in ratings2.items():
            new_dict = self.change_sentence_obj_to_dictionary(str(method_output))
            all_method_ratings[method] = new_dict
            if method == "cueMethod":
                for sentence in new_dict.keys():
                    dict_entry = self.get_found_cue_words(bonus_words, stigma_words, null_words, sentence)
                    found_cue_words.append(dict_entry)

        key_method = EdmundsonKeyMethod(self.stemmer, bonus_words)
        title_method = EdmundsonTitleMethod(self.stemmer, null_words)
        location_method = EdmundsonLocationMethod(self.stemmer, null_words)

        explanation = {
            "bonusWords" : bonus_words,
            "stigmaWords" : stigma_words, 
            "nullWords" : null_words,
            "finalOutput" : result,
            "allMethodRatings" : all_method_ratings,
            "foundCueWords" : found_cue_words,
            "titleSignificantWords": list(title_method._compute_significant_words(self.parser.document)),
            "locationSignificantWords": list(location_method._compute_significant_words(self.parser.document)),
            "keySignificantWords" : list(key_method._compute_significant_words(self.parser.document, -100)) #Nothing returned with a normal weight
        }
        return explanation

    @staticmethod
    def change_sentence_obj_to_dictionary(input_string):
        pattern = r"<Sentence: (.*?)>: (\d)"
        matches = re.findall(pattern, input_string)

        new_dict = {sentence: int(rating) for sentence, rating in matches}
        return new_dict
    
    @staticmethod
    def change_sentence_obj_to_list(input_string):
        pattern = r"<Sentence: (.*?)>: (\d)"
        matches = re.findall(pattern, input_string)
        return matches
    @staticmethod
    
    def get_found_cue_words(bonus_words, stigma_words, null_words, sentence):
        bonus_word_matches = []
        null_word_matches = []
        stigma_word_matches = []
        stemmer = Stemmer(language="english")
        words = sentence.split()

        for word in words:
            word = stemmer(word)
            if word in bonus_words:
                bonus_word_matches.append(word)
            elif word in null_words:
                null_word_matches.append(word)
            elif word in stigma_words:
                stigma_word_matches.append(word)

        output = {
            "sentence" : sentence,
            "bonus_word_matches" : bonus_word_matches,
            "stigma_word_matches" : stigma_word_matches, 
            "null_word_matches" : null_word_matches
        }
        return output

