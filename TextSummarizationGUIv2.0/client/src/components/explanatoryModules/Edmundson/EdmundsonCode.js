import PythonCodeDisplay from "../Shared/PythonCodeSnippet.js"

const EdmundsonCode = (props) => {
    const pCode = `
    # -*- coding: utf-8 -*-

    from __future__ import absolute_import
    from __future__ import division, print_function, unicode_literals
    
    from ._summarizer import AbstractSummarizer
    
    
    class EdmundsonCueMethod(AbstractSummarizer):
        def __init__(self, stemmer, bonus_words, stigma_words):
            super(EdmundsonCueMethod, self).__init__(stemmer)
            self._bonus_words = bonus_words
            self._stigma_words = stigma_words
    
        def __call__(self, document, sentences_count, bonus_word_weight, stigma_word_weight):
            return self._get_best_sentences(document.sentences,
                sentences_count, self._rate_sentence, bonus_word_weight,
                stigma_word_weight)
    
        def _rate_sentence(self, sentence, bonus_word_weight, stigma_word_weight):
            # count number of bonus/stigma words in sentence
            words = map(self.stem_word, sentence.words)
            bonus_words_count, stigma_words_count = self._count_words(words)
    
            # compute positive & negative rating
            bonus_rating = bonus_words_count*bonus_word_weight
            stigma_rating = stigma_words_count*stigma_word_weight
    
            # rating of sentence is (positive - negative) rating
            return bonus_rating - stigma_rating
    
        def _count_words(self, words):
            """
            Counts number of bonus/stigma words.
    
            :param iterable words:
                Collection of words.
            :returns pair:
                Tuple with number of words (bonus words, stigma words).
            """
            bonus_words_count = 0
            stigma_words_count = 0
    
            for word in words:
                if word in self._bonus_words:
                    bonus_words_count +=1
                if word in self._stigma_words:
                    stigma_words_count += 1
    
            return bonus_words_count, stigma_words_count
    
        def rate_sentences(self, document, bonus_word_weight=1, stigma_word_weight=1):
            return {sentence: self._rate_sentence(sentence, bonus_word_weight,
                    stigma_word_weight) for sentence in document.sentences}
    


    
    # -*- coding: utf-8 
    from __future__ import absolute_import
    from __future__ import division, print_function, unicode_literals
    
    from collections import Counter
    from ._summarizer import AbstractSummarizer
    
    
    class EdmundsonKeyMethod(AbstractSummarizer):
        def __init__(self, stemmer, bonus_words):
            super(EdmundsonKeyMethod, self).__init__(stemmer)
            self._bonus_words = bonus_words
    
        def __call__(self, document, sentences_count, weight):
            significant_words = self._compute_significant_words(document, weight)
    
            return self._get_best_sentences(document.sentences,
                sentences_count, self._rate_sentence, significant_words)
    
        def _compute_significant_words(self, document, weight):
            # keep only stems contained in bonus words
            words = map(self.stem_word, document.words)
            words = filter(self._is_bonus_word, words)
    
            # compute frequencies of bonus words in document
            word_counts = Counter(words)
            word_frequencies = word_counts.values()
    
            # no frequencies means no significant words
            if not word_frequencies:
                return ()
    
            # return only words greater than weight
            max_word_frequency = max(word_frequencies)
            return tuple(word for word, frequency in word_counts.items()
                if frequency/max_word_frequency > weight)
    
        def _is_bonus_word(self, word):
            return word in self._bonus_words
    
        def _rate_sentence(self, sentence, significant_words):
            words = map(self.stem_word, sentence.words)
            return sum(w in significant_words for w in words)
    
        def rate_sentences(self, document, weight=0.5):
            significant_words = self._compute_significant_words(document, weight)
    
            rated_sentences = {}
            for sentence in document.sentences:
                rated_sentences[sentence] = self._rate_sentence(sentence,
                    significant_words)
    
            return rated_senten
    



    # -*- coding: utf-8 
    from __future__ import absolute_import
    from __future__ import division, print_function, unicode_literals
    
    from itertools import chain
    from operator import attrgetter
    from .._compat import ffilter
    from ._summarizer import AbstractSummarizer
    
    
    class EdmundsonLocationMethod(AbstractSummarizer):
        def __init__(self, stemmer, null_words):
            super(EdmundsonLocationMethod, self).__init__(stemmer)
            self._null_words = null_words
    
        def __call__(self, document, sentences_count, w_h, w_p1, w_p2, w_s1, w_s2):
            significant_words = self._compute_significant_words(document)
            ratings = self._rate_sentences(document, significant_words, w_h, w_p1,
                w_p2, w_s1, w_s2)
    
            return self._get_best_sentences(document.sentences, sentences_count, ratings)
    
        def _compute_significant_words(self, document):
            headings = document.headings
    
            significant_words = chain(*map(attrgetter("words"), headings))
            significant_words = map(self.stem_word, significant_words)
            significant_words = ffilter(self._is_null_word, significant_words)
    
            return frozenset(significant_words)
    
        def _is_null_word(self, word):
            return word in self._null_words
    
        def _rate_sentences(self, document, significant_words, w_h, w_p1, w_p2, w_s1, w_s2):
            rated_sentences = {}
            paragraphs = document.paragraphs
    
            for paragraph_order, paragraph in enumerate(paragraphs):
                sentences = paragraph.sentences
                for sentence_order, sentence in enumerate(sentences):
                    rating = self._rate_sentence(sentence, significant_words)
                    rating *= w_h
    
                    if paragraph_order == 0:
                        rating += w_p1
                    elif paragraph_order == len(paragraphs) - 1:
                        rating += w_p2
    
                    if sentence_order == 0:
                        rating += w_s1
                    elif sentence_order == len(sentences) - 1:
                        rating += w_s2
    
                    rated_sentences[sentence] = rating
    
            return rated_sentences
    
        def _rate_sentence(self, sentence, significant_words):
            words = map(self.stem_word, sentence.words)
            return sum(w in significant_words for w in words)
    
        def rate_sentences(self, document, w_h=1, w_p1=1, w_p2=1, w_s1=1, w_s2=1):
            significant_words = self._compute_significant_words(document)
            return self._rate_sentences(document, significant_words, w_h, w_p1, w_p2, w_s1, w_s2)




    # -*- coding: utf-8 
    from __future__ import absolute_import
    from __future__ import division, print_function, unicode_literals
            
    from operator import attrgetter
    from itertools import chain
    from .._compat import ffilter
    from ._summarizer import AbstractSummarizer
            
            
    class EdmundsonTitleMethod(AbstractSummarizer):
        def __init__(self, stemmer, null_words):
            super(EdmundsonTitleMethod, self).__init__(stemmer)
            self._null_words = null_words
    
        def __call__(self, document, sentences_count):
            sentences = document.sentences
            significant_words = self._compute_significant_words(document)
    
            return self._get_best_sentences(sentences, sentences_count,
                self._rate_sentence, significant_words)
    
        def _compute_significant_words(self, document):
            heading_words = map(attrgetter("words"), document.headings)
    
            significant_words = chain(*heading_words)
            significant_words = map(self.stem_word, significant_words)
            significant_words = ffilter(self._is_null_word, significant_words)
    
            return frozenset(significant_words)
    
        def _is_null_word(self, word):
            return word in self._null_words
    
        def _rate_sentence(self, sentence, significant_words):
            words = map(self.stem_word, sentence.words)
            return sum(w in significant_words for w in words)
    
        def rate_sentences(self, document):
            significant_words = self._compute_significant_words(document)
    
            rated_sentences = {}
            for sentence in document.sentences:
                rated_sentences[sentence] = self._rate_sentence(sentence,
                    significant_words)
    
            return rated_sentences
                                    
    `
    return (
        <PythonCodeDisplay code={pCode}></PythonCodeDisplay>
    )
}

export default EdmundsonCode