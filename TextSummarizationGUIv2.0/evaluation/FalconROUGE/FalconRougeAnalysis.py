from sumy.parsers.html import HtmlParser
from sumy.nlp.tokenizers import Tokenizer
from nltk.tokenize import sent_tokenize
from statistics import mean
import matplotlib.pyplot as plt
import os
import json
import numpy as np


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
data_dir = os.path.join(script_dir, 'data')

file_name = "FalconModelData.json"
file_path = os.path.join(data_dir, file_name)

evaluated_summarizers = [RandomSummarizer,LSASummarizer,LuhnSummarizer, EdmundsonSummarizer, TextRankSummarizer, LexRankSummarizer, ReductionSummarizer, KLSummarizer]

rouge_scores_to_plot = ["1", "2", "L"]

edmudson_bonus_words = ["significant", "important", "key", "crucial", "relevant", "notable", "essential", "main", "central", "critical"]
edmudson_stigma_words = ["irrelevant", "inconsequential", "minor", "unimportant", "negligible", "trivial", "extraneous", "peripheral", "secondary", "nonessential"]
edmudson_null_words = ["controversial", "problematic", "flawed", "biased", "criticized", "disputed", "questionable", "flawed", "unfavourable"]

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


def load_json(file_path):
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)
    return data

def clean_summarizer_name(summarizer_name):
    cleaned_name = summarizer_name.split('.')[-1][:-2]
    return cleaned_name


def plot_avg_rouge_scores(data, type):
    summarizers = list(data.keys())
    avg_scores = [data[summarizer][f'rouge_{type.lower()}_avg_score'] for summarizer in summarizers]
    
    cleaned_summarizers = [clean_summarizer_name(summarizer) for summarizer in summarizers]

    x = np.arange(len(cleaned_summarizers))

    plt.figure(figsize=(10, 6))
    plt.bar(x, avg_scores, color='skyblue', align='center')
    plt.xlabel('Summarizers')
    plt.ylabel(f'Average ROUGE-{type} Score')
    plt.title(f'Average ROUGE-{type} Scores for Summarizers - Falcon Dataset')
    plt.xticks(x, cleaned_summarizers)

    for i, score in enumerate(avg_scores):
        plt.text(i, score, f'{score:.3f}', ha='center', va='bottom')

    # plt.tight_layout()
    plt.show()

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

def unpack_dict(summaries_dict):
    summaries_list = []
    for key in summaries_dict.keys():
        summary = " ".join(summaries_dict[key])
        summaries_list.append(summary)

    return summaries_list

def get_rouge_scores(index, curr_summarizer, out_data):
    rouge_module = SumyEval.rouge
    golden_summary_sentences = PlaintextParser.from_string(" ".join(out_data[index]["golden_summaries"]), Tokenizer(LANGUAGE)).document.sentences
    summary_sentences = PlaintextParser.from_string(" ".join(out_data[index]["methods"][str(curr_summarizer)]["summary"]), Tokenizer(LANGUAGE)).document.sentences
    rouge_1_score = rouge_module.rouge_1(summary_sentences, golden_summary_sentences)
    rouge_2_score = rouge_module.rouge_2(summary_sentences, golden_summary_sentences)
    rouge_l_score = rouge_module.rouge_l_sentence_level(summary_sentences, golden_summary_sentences)
    out_data[index]["methods"][str(curr_summarizer)]["rouge_1_score"] = rouge_1_score
    out_data[index]["methods"][str(curr_summarizer)]["rouge_2_score"] = rouge_2_score
    out_data[index]["methods"][str(curr_summarizer)]["rouge_l_score"] = rouge_l_score
    return out_data

def prepare_data(data):
    out_data = {}
    for index, dict_key in enumerate(data.keys()):
        text = data[dict_key]["text"]
        out_data[index] = {}
        out_data[index]["text"] = text
        summaries_dict = data[dict_key]["golden_summaries"]
        summaries_list = unpack_dict(summaries_dict)
        out_data[index]["golden_summaries"] = summaries_list
        out_data[index]["methods"] = {}
        for curr_summarizer in evaluated_summarizers:
            summary = get_evaluated_summary(text, curr_summarizer)
            out_data[index]["methods"][str(curr_summarizer)] = {}
            out_data[index]["methods"][str(curr_summarizer)]["summary"] = summary
            out_data = get_rouge_scores(index, curr_summarizer, out_data)
    return out_data

def get_rouge_scores_by_method(data):
    evaluated_rouge_scores = {}
    for dict_entry in data.keys():
        for summarizer in data[dict_entry]["methods"]:
            summarizer = str(summarizer)
            if dict_entry == 0:
                evaluated_rouge_scores[summarizer] = {}
            print(data[dict_entry]["methods"][summarizer]["rouge_1_score"])
            if dict_entry == 0:
                evaluated_rouge_scores[summarizer]["rouge_1_scores"] = [data[dict_entry]["methods"][summarizer]["rouge_1_score"]]
                evaluated_rouge_scores[summarizer]["rouge_2_scores"] = [data[dict_entry]["methods"][summarizer]["rouge_2_score"]]
                evaluated_rouge_scores[summarizer]["rouge_l_scores"] = [data[dict_entry]["methods"][summarizer]["rouge_l_score"]]
            else:
                evaluated_rouge_scores[summarizer]["rouge_1_scores"].append(data[dict_entry]["methods"][summarizer]["rouge_1_score"])
                evaluated_rouge_scores[summarizer]["rouge_2_scores"].append(data[dict_entry]["methods"][summarizer]["rouge_2_score"])
                evaluated_rouge_scores[summarizer]["rouge_l_scores"].append(data[dict_entry]["methods"][summarizer]["rouge_l_score"])
    
    for summarizer in evaluated_rouge_scores:
        summarizer = str(summarizer)
        evaluated_rouge_scores[summarizer]["rouge_1_avg_score"] = mean(evaluated_rouge_scores[summarizer]["rouge_1_scores"])
        evaluated_rouge_scores[summarizer]["rouge_2_avg_score"] = mean(evaluated_rouge_scores[summarizer]["rouge_2_scores"])
        evaluated_rouge_scores[summarizer]["rouge_l_avg_score"] = mean(evaluated_rouge_scores[summarizer]["rouge_l_scores"])

    return evaluated_rouge_scores

def main():
    data = load_json(file_path)
    out_data = prepare_data(data)
    rouge_scores_by_method = get_rouge_scores_by_method(out_data)
    for rouge_type in rouge_scores_to_plot:
        plot_avg_rouge_scores(rouge_scores_by_method, rouge_type)
        
if __name__ == "__main__":
    main()