from modules.base_explanation_module import BaseExplanationModule
from collections import Counter
from sumy.utils import get_stop_words
from sumy.models import TfDocumentModel


class LuhnExplanationModule(BaseExplanationModule):
    def __call__(self, input_value):
        stop_words = get_stop_words(self.LANGUAGE)
        significant_words = self.summarizer._get_significant_words(self.parser.document.words)
        significant_words2 = [word for word in significant_words if word not in stop_words]
        common_stop_words = [word for word in significant_words if word not in significant_words2]
        significant_sentences = self.summarizer.__call__(self.parser.document, self.SENTENCES_COUNT)
        word_freq = self.count_most_common_words(self, input_value)
        words = map(self.summarizer.normalize_word, significant_words)
        words = tuple(self.summarizer.stem_word(w) for w in words if w not in self.summarizer._stop_words)
        model = TfDocumentModel(words)
        best_words_count = int(len(words) * 1)
        terms = model.most_frequent_terms(best_words_count)
        significant_stems = tuple(t for t in terms if model.term_frequency(t) >= 1) 
        sentences_list = []
        chunk_ratings_list = []
        sentence_stems_list = []
        sentence_rating_list = []
        for sentence in self.parser.document.sentences:
            stems = [self.summarizer.stem_word(word) for word in sentence.words]
            sentences_list.append(str(sentence))
            sentence_stems_list.append(stems)

            chunk_ratings = self.summarizer._get_chunk_ratings(sentence, significant_stems)
            chunk_ratings_list.append(chunk_ratings)

            sentence_rating = self.summarizer.rate_sentence(sentence, significant_stems)
            sentence_rating_list.append(sentence_rating)

        significant_sentences = [str(sentence) for sentence in significant_sentences]    
        explanation = {
            "significantWords": significant_words2,
            "significantSentences": significant_sentences,
            "words": words,
            "modelTermFreq": {term: model.term_frequency(term) for term in terms},
            "terms": terms,
            "sentences": sentences_list,
            "SentenceStems": sentence_stems_list,
            "chunkRatings": chunk_ratings_list,
            "sentenceRatings": sentence_rating_list,
            "wordFreq": word_freq,
            "stopwords": common_stop_words
        }

        return explanation
    
    @staticmethod
    def count_most_common_words(self, text):
        words = text.lower().split()
        word_counts = Counter(words)
        most_common = word_counts.most_common()
        result = {}
        for word, frequency in most_common:
            result[word] = frequency

        return result
