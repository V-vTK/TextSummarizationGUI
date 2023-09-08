import os
import json
from statistics import mean
import matplotlib.pyplot as plt

import sumy.evaluation as SumyEval
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

from sumy.summarizers.lsa import LsaSummarizer as LSASummarizer
from sumy.summarizers.luhn import LuhnSummarizer as LuhnSummarizer
from sumy.summarizers.edmundson import EdmundsonSummarizer
from sumy.summarizers.lex_rank import LexRankSummarizer as LexRankSummarizer
from sumy.summarizers.text_rank import TextRankSummarizer as TextRankSummarizer
from sumy.summarizers.kl import KLSummarizer as KLSummarizer
from sumy.summarizers.reduction import ReductionSummarizer as ReductionSummarizer
from sumy.summarizers.random import RandomSummarizer as RandomSummarizer
from sumy.summarizers.sum_basic import SumBasicSummarizer as SumbasicSummarizer

LANGUAGE = "english"
SENTENCES_COUNT = 5

script_dir = os.path.dirname(os.path.abspath(__file__))
model_annotations_paired_path = os.path.join(script_dir, 'model_annotations.aligned.paired.jsonl')

# Change these - all summarizers in this list will be evaluated:
evaluated_summarizers = [RandomSummarizer,LSASummarizer,LuhnSummarizer, EdmundsonSummarizer, TextRankSummarizer, LexRankSummarizer, ReductionSummarizer, KLSummarizer] 

# model_annotations_paired_path = r'D:\CodeData\SumEvalData\model_annotations.aligned.paired.jsonl' # Not needed in this config
# source_stories_path = r'D:\CodeData\SumEvalData\cnndm\data' # Not needed in this config

# Change these (optional)
rouge_scores_to_plot = ["1", "2", "L"]

edmudson_bonus_words = ["significant", "important", "key", "crucial", "relevant", "notable", "essential", "main", "central", "critical"]
edmudson_stigma_words = ["irrelevant", "inconsequential", "minor", "unimportant", "negligible", "trivial", "extraneous", "peripheral", "secondary", "nonessential"]
edmudson_null_words = ["controversial", "problematic", "flawed", "biased", "criticized", "disputed", "questionable", "flawed", "unfavourable"]


def load_JSONL_file(file_path, curr_summarizer):
    output_data = {}
    prev_id = None
    with open(file_path, "r") as file:
        for line in file:
            data = json.loads(line)
            id_value = str(data["id"])
            if id_value == prev_id:
                output_data[id_value]["expert_annotations"].append(data["expert_annotations"])
                output_data[id_value]["golden_summaries"].append(data["decoded"])
            elif id_value not in output_data.keys():
                text = data["text"]
                summary = get_evaluated_summary(text, curr_summarizer)
                expert_annotation = data["expert_annotations"]
                golden_summary = data["decoded"]
                output_data[id_value] = {   
                    "text" : text, "summary" : summary, 
                    "expert_annotations" : [expert_annotation],
                    "golden_summaries" : [golden_summary]
                }
            else:
                print("error in data")
                raise Exception("Error in data pairing, there should not be duplicate ID's seperated ")
            prev_id = data["id"]
    return output_data
        
def get_evaluated_summary(input_value, curr_summarizer):
    parser = PlaintextParser.from_string(input_value, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)
    summarizer = curr_summarizer(stemmer)
    if curr_summarizer == EdmundsonSummarizer:
        summarizer.bonus_words = edmudson_bonus_words
        summarizer.stigma_words = edmudson_stigma_words
        summarizer.null_words = edmudson_null_words
    summarizer.stop_words = get_stop_words(LANGUAGE)
    
    summarized_sentences = []
    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        summarized_sentences.append(str(sentence))

    return summarized_sentences

def get_rouge_scores(data):
    rouge_module = SumyEval.rouge
    for id_value in data.keys():
        golden_summary_sentences = PlaintextParser.from_string(" ".join(data[id_value]["golden_summaries"]), Tokenizer(LANGUAGE)).document.sentences
        summary_sentences = PlaintextParser.from_string(" ".join(data[id_value]["summary"]), Tokenizer(LANGUAGE)).document.sentences
        rouge_1_score = rouge_module.rouge_1(summary_sentences, golden_summary_sentences)
        rouge_2_score = rouge_module.rouge_2(summary_sentences, golden_summary_sentences)
        rouge_l_score = rouge_module.rouge_l_sentence_level(summary_sentences, golden_summary_sentences)
        data[id_value]["rouge_1_score"] = rouge_1_score
        data[id_value]["rouge_2_score"] = rouge_2_score
        data[id_value]["rouge_l_score"] = rouge_l_score
    return data

def get_rouge_average(data, evaluated_summarizer):
    rouge_1_scores = []
    rouge_2_scores = []
    rouge_l_scores = []
    for id_value in data.keys():
        rouge_1_scores.append(data[id_value]["rouge_1_score"])
        rouge_2_scores.append(data[id_value]["rouge_2_score"])
        rouge_l_scores.append(data[id_value]["rouge_l_score"])
    evaluated_summarizer_rouge_scores = {
        "summarizer" : str(evaluated_summarizer),
        "rouge_1_avg_score" : mean(rouge_1_scores),
        "rouge_2_avg_score" : mean(rouge_2_scores),
        "rouge_l_avg_score" : mean(rouge_l_scores),
    }
    return evaluated_summarizer_rouge_scores

def plot_avg_rouge_scores(data, type):
    summarizers = [entry['summarizer'].split('.')[-1][:-2] for entry in data]
    if type == "1":
        rouge_scores = [entry['rouge_1_avg_score'] for entry in data]
    elif type == "2":
        rouge_scores = [entry['rouge_2_avg_score'] for entry in data]
    else:
        type = "L"
        rouge_scores = [entry['rouge_l_avg_score'] for entry in data]

    plt.figure(figsize=(10, 6))
    plt.bar(summarizers, rouge_scores, color='skyblue', align='center')
    plt.xlabel('Summarizers')
    plt.ylabel(f'Rouge-{type} Score')
    plt.title(f'Rouge-{type} Scores for Different Summarizers - SummEval Dataset')

    for i, score in enumerate(rouge_scores):
        plt.text(i, score, f'{score:.3f}', ha='center', va='bottom')
        
    # plt.xticks(rotation=15)
    # plt.tight_layout()
    plt.show()


def main():
    evaluations = []
    for i in range(0, len(evaluated_summarizers)):
        data = load_JSONL_file(model_annotations_paired_path, evaluated_summarizers[i])
        data = get_rouge_scores(data)
        evaluated_summarizers_rouge_scores = get_rouge_average(data, evaluated_summarizers[i])
        evaluations.append(evaluated_summarizers_rouge_scores)
        print(evaluated_summarizers_rouge_scores)
    for rouge_type in rouge_scores_to_plot:
        plot_avg_rouge_scores(evaluations, rouge_type) # Options: "1","2","L"


if __name__ == "__main__":
    main()
