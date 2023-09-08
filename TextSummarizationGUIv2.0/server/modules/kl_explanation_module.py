from modules.base_explanation_module import BaseExplanationModule
import re


class KLExplanationModule(BaseExplanationModule):
    def __call__(self, input_value):
        document = self.parser.document
        all_words_in_document = self.summarizer._get_all_words_in_doc(document.sentences)
        normalized_words = self.summarizer._normalize_words(all_words_in_document)
        stopwords_removed = self.summarizer._filter_out_stop_words(normalized_words)
        removed_stopwords = [word for word in normalized_words if word not in stopwords_removed]
        ratings = self.summarizer._compute_ratings(document.sentences)
        ratings3, summary, kls, popped = self.get_sentence_ratings(self.summarizer, document.sentences)
        
        print("halfway done")
        results = {
            "sentenceRatings" : "not yet",
            "AllDocumentWords" : all_words_in_document, 
            "normalizedWords" : normalized_words,
            "stopWordsRemoved" : stopwords_removed,
            "removedStopWords" : removed_stopwords,
            "wordFreq" : self.summarizer._compute_word_freq(stopwords_removed),
            "tfIdf" : self.summarizer.compute_tf(document.sentences),
            "ratings" : self.change_sentence_obj_to_dictionary(str(ratings)),
            "ratings2" : str(ratings),
            "ratings3" :  str(ratings3),
            "summary" : str(summary),
            "kl_popped" : list(popped),
            "kls" : kls
        }
        return results
    
    @staticmethod
    def get_sentence_ratings(summarizer, sentences):
        word_freq = summarizer.compute_tf(sentences)
        ratings = {}
        summary = []
        popped = []
        kls_rows = []
        # Make a copy of the sentences list so that it can be modified
        sentences_list = list(sentences)

        # Get content words for efficiency
        sentences_as_words = [summarizer._get_content_words_in_sentence(s) for s in sentences]

        # Remove one sentence per iteration by adding to the summary
        while len(sentences_list) > 0:
            kls = []  # Store KL Divergence values for this pass
            
            # Convert the summary to a word list
            summary_as_word_list = summarizer._get_all_words_in_doc(summary)

            for s in sentences_as_words:
                # Calculate the joint frequency through combining the word lists
                joint_freq = summarizer._joint_freq(s, summary_as_word_list)

                # Add the calculated KL Divergence to the list with index = sentence used
                kls.append(summarizer._kl_divergence(joint_freq, word_freq))
                
            
            kls_ratings = {}
            index_to_remove = summarizer._find_index_of_best_sentence(kls)
            for i in range(0, len(sentences_list)):
                kls_ratings[str(sentences_list[i])] = kls[i]
            kls_rows.append(kls_ratings)    
            best_sentence = sentences_list.pop(index_to_remove)
            popped.append(sentences_as_words[index_to_remove])
            del sentences_as_words[index_to_remove]
            summary.append(best_sentence)

            ratings[best_sentence] = -1 * len(ratings)

        return ratings, summary, kls_rows, popped
    
    @staticmethod
    def get_compute_tf(summarizer, sentences) -> dict:
        result_dict = {}
        for sentence in sentences:
            result_dict[sentence] : summarizer.compute_tf(sentence)
        return result_dict
    
    @staticmethod
    def change_sentence_obj_to_dictionary(input_string):
        pattern = r"<Sentence: (.*?)>: (-?\d+)"
        matches = re.findall(pattern, input_string)
        new_dict = {sentence: float(rating) for sentence, rating in matches}
        return new_dict