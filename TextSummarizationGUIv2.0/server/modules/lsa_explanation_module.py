from numpy.linalg import svd as singular_value_decomposition
from modules.base_explanation_module import BaseExplanationModule
import re

class LSAExplanationModule(BaseExplanationModule):
    def __call__(self, input_value):
        lsa_dictionary = self.summarizer._create_dictionary(self.parser.document)
        lsa_matrix = self.summarizer._create_matrix(self.parser.document, lsa_dictionary)
        _, sigma, v = singular_value_decomposition(lsa_matrix, full_matrices=False)
        term_freq = self.summarizer._compute_term_frequency(lsa_matrix)  
        lsa_matrix = [arr.tolist() for arr in lsa_matrix]
        sentences = self.summarizer.__call__(self.parser.document, self.SENTENCES_COUNT)
        ranks = self.summarizer._compute_ranks(sigma, v)
        sentences = self.extract_sentences_from_string(str(sentences))
        sentence_rankings = self.create_sentence_rank_dict(sentences, ranks)
        results = {
            "lsaDictionary" :  lsa_dictionary,
            "lsaMatrix" : lsa_matrix,
            "termFreq" : term_freq.tolist(),
            "sigma" : sigma.tolist(),
            "rightSingularVecotrsV" : v.tolist(),
            "sentenceRatings" : sentence_rankings 
        }
        return results
    
    @staticmethod
    def extract_sentences_from_string(input_string):
        pattern = r"<Sentence: (.*?)>"
        sentences = re.findall(pattern, input_string)
        return sentences

    @staticmethod
    def create_sentence_rank_dict(sentences, ranks):
        sentence_rank_pairs = list(zip(sentences, ranks))
        sentence_rank_dict = {}

        for sentence, rank in sentence_rank_pairs:
            sentence_rank_dict[sentence] = rank

        return sentence_rank_dict