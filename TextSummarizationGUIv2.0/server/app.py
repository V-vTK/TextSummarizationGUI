from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import json
import os
import re

import sumy.evaluation as SumyEval
from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words


from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.summarizers.luhn import LuhnSummarizer as LuhnSummarizer
from sumy.summarizers.edmundson import EdmundsonSummarizer
from sumy.summarizers.lex_rank import LexRankSummarizer as LexRankSummarizer
from sumy.summarizers.text_rank import TextRankSummarizer as TextRankSummarizer
from sumy.summarizers.kl import KLSummarizer as KLSummarizer
from sumy.summarizers.reduction import ReductionSummarizer as ReductionSummarizer
from sumy.summarizers.random import RandomSummarizer as RandomSummarizer
from sumy.summarizers.sum_basic import SumBasicSummarizer as SumbasicSummarizer

from modules.edmundson_explanation_module import EdmundsonExplanationModule
from modules.textrank_explanation_module import TextRankExplanationModule
from modules.luhn_explanation_module import LuhnExplanationModule
from modules.kl_explanation_module import KLExplanationModule
from modules.reduction_explanation_module import ReductionExplanationModule
from modules.lsa_explanation_module import LSAExplanationModule
from modules.lexrank_explanation_module import LexRankExplanationModule

from modules import gpt4all_api



app = Flask(__name__)

CORS(app)

data = {
    'example': 'data'
}

LANGUAGE = "english"
docker_manual = False
data_file_path = '/app/data/app_state.json'


default_data = {
    "chats": [
        {
            "id": 1,
            "model": "default",
            "name": "chat2",
            "summaries": [
                {
                    "summary1": [
                        "Hello",
                        "Hello, Input something to summarize",
                        "exp",
                        "wordLimit",
                        "default"
                    ]
                },
                {
                    "summary2": [
                        "https://en.wikipedia.org/wiki/Automatic_summarization",
                        "Some techniques...",
                        "exp",
                        10,
                        "default"
                    ]
                }
            ]
        }
    ],
    "models": [
        "default",
        "lex-rank",
        "text-rank",
        "luhn",
        "edmundson",
        "kl",
        "sum_basic",
        "reduction",
        "abstractive",
        "random"
    ]
}

def initialize(data_file_path, docker_manual):
    try:
        if not os.path.exists(data_file_path):
            with open(data_file_path, 'w') as file:
                json.dump(default_data, file)

    except FileNotFoundError:
        print("manual noDocker setup")
        docker_manual = True
        data_file_path = '../data/app_state.json'

    with open(data_file_path, 'r') as file:
        data = json.load(file)
    return data, data_file_path, docker_manual

data, data_file_path, docker_manual = initialize(data_file_path, docker_manual)

@app.route('/')
def main_api():
    response = jsonify(data)
    return response

@app.route('/chats')
def chats_api():
    response = jsonify(data["chats"])
    return response

@app.route('/models')
def models_api():
    response = jsonify(data["models"])
    return response

@app.route('/chats/<chat_id>')
def chats_id_api(chat_id):
    chat = next((c for c in data["chats"] if c["id"] == int(chat_id)), None)
    response = jsonify(chat)
    return response

@app.route('/chats/<chat_id>/summaries/<summary_id>')
def chats_id_summary_api(chat_id, summary_id):
    chat = next((c for c in data["chats"] if c["id"] == int(chat_id)), None)
    response = jsonify(chat["summaries"][int(summary_id)-1])
    return response


@app.route('/chats', methods=['POST', "OPTIONS", 'PUT'])
def update_data():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    elif request.method == "POST" or request.method == 'PUT':
        new_data = request.get_json()
        data = new_data
        response = jsonify(data)
        return _corsify_actual_response(response)
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


@app.route('/chats/<chat_id>', methods=['PUT'])
def update_chat(chat_id):
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'PUT':
        new_data = request.get_json()
        model = new_data["model"]
        id = int(''.join(filter(str.isdigit, chat_id)))
        existing_ids = [chat['id'] for chat in data['chats']]
        if id in existing_ids:
            return jsonify({'error': 'ID already exists'}), 400

        newChat = {
            'name': chat_id,
            'id': id,
            'model': model,
            'summaries': [{'summary1': 
                ["Hello", "Hello, Input something to summarize",
                {'exp1' : "1...", 'exp2' : "2..."}, "200", "startNoModule"]}
                ]
        }

        data["chats"].append(newChat)
        response = jsonify(newChat)
        with open(data_file_path, 'w') as file:
            json.dump(data, file)
        return _corsify_actual_response(response)
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))

@app.route('/chats/<chat_id>/summaries/<summary_id>', methods=['PUT', 'POST'])
def add_golden_summary(chat_id, summary_id):
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST' or request.method == 'PUT':
        new_summary = request.get_json()

        summary_key = list(new_summary.keys())[0]
        input_value = new_summary[summary_key][0]
        output_value = new_summary[summary_key][1]
        len_limit = new_summary[summary_key][3]

        if is_url(input_value):
            try:
                parser = HtmlParser.from_url(input_value, Tokenizer(LANGUAGE))
                input_value = parser.document
                sentences2 = []
                for paragraph in parser.document.paragraphs:
                    sentences2.extend(paragraph.sentences)
                text_block = ' '.join([str(sentence) for sentence in sentences2])
                input_value = text_block
            except Exception as error:
                input_value = str(error)

        golden_summary = gpt4all_api.main_golden_summary(input_value, len_limit, docker_manual)
        golden_summary_text = " ".join(golden_summary)
        output_sentences = PlaintextParser.from_string(output_value, Tokenizer(LANGUAGE)).document.sentences
        golden_summary_sentences = PlaintextParser.from_string(golden_summary_text, Tokenizer(LANGUAGE)).document.sentences
        rouge_module = SumyEval.rouge
        rouge_1_score, rouge_2_score, rouge_l_score = 0, 0, 0
        
        if len(output_sentences) >= 1 and len(golden_summary_sentences) >=1 :
            rouge_1_score =  rouge_module.rouge_1(output_sentences, golden_summary_sentences )
            rouge_2_score = rouge_module.rouge_2(output_sentences, golden_summary_sentences)
            # rouge_l = rouge_module.rouge_l_summary_level(output_sentences, golden_summary_sentences) zero division error
            rouge_l_score = rouge_module.rouge_l_sentence_level(output_sentences, golden_summary_sentences)
                
        new_summary[summary_key].insert(6, [golden_summary, [rouge_1_score, rouge_2_score, rouge_l_score]])
        chat = next((c for c in data["chats"] if c["id"] == (int(chat_id))), None)

        if chat is None:
            return jsonify({'error': 'Chat not found'}), 404
        
        summary_insert_id = int(summary_id) -1
        chat["summaries"][summary_insert_id] = new_summary
        
        with open(data_file_path, 'w') as file:
            json.dump(data, file)
        response = jsonify(new_summary)
        
        return _corsify_actual_response(response)
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


@app.route('/chats/<chat_id>/summaries', methods=['PUT', 'POST'])
def add_summary(chat_id):
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    elif request.method == 'POST' or request.method == 'PUT':
        new_summary = request.get_json() 

        summary_key = list(new_summary.keys())[0]
        input_value = new_summary[summary_key][0]
        model = new_summary[summary_key][4]
        edmundson_cue_words = new_summary[summary_key][5]
        len_limit = new_summary[summary_key][3]

        id = int(''.join(filter(str.isdigit, chat_id)))
        result, explanation = all_summarizer(input_value, model, len_limit, edmundson_cue_words)
        chat = next((c for c in data["chats"] if c["id"] == id), None)
        
        if chat:
            for summary in chat["summaries"]:
                if summary_key in summary:
                    return jsonify({'error': 'Summary ID already taken within the chat'}), 400
                
            response_summary = {
                summary_key : [input_value, result, explanation, len_limit, model, edmundson_cue_words]
            }

            chat["summaries"].append(response_summary)
            response = jsonify(response_summary)
            
            with open(data_file_path, 'w') as file:
                json.dump(data, file)

            return _corsify_actual_response(response)
        else:
            return jsonify({'error': 'Chat not found'}), 404
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))






@app.route('/cueWords', methods=['PUT', 'POST'])
def add_cue_word():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    elif request.method == 'POST' or request.method == 'PUT':
        new_data = request.get_json()

        if "edmundson_cue_words" in new_data and isinstance(new_data["edmundson_cue_words"], list) and len(new_data["edmundson_cue_words"]) == 3:
            cue_words = new_data["edmundson_cue_words"]

            if all(word.strip() != "" for word in cue_words):
                data["edmundson_cue_words"] = new_data["edmundson_cue_words"]
                response = new_data

            else:
                print("Empty - fallback data:")
                new_data = {"edmundson_cue_words": 
                        ["relevant, important, useful","unimportant, irrelevant, insignificant","null,empty,missing"]
                        }
                data["edmundson_cue_words"] = new_data["edmundson_cue_words"]
                response = new_data

            with open(data_file_path, 'w') as file:
                json.dump(data, file)

            print("Changed data to:", response)

            response = jsonify(response)
            return _corsify_actual_response(response)
        else:
            return "Invalid data format. Expected 'edmundson_cue_words' as a list with three elements.", 400
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))



@app.route('/chats/<chat_id>', methods=['DELETE'])
def update_chat_delete(chat_id):
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    elif request.method == 'DELETE':
        chat_index = None
        for index, chat in enumerate(data["chats"]):
            if chat["name"] == chat_id:
                chat_index = index
                break

        if chat_index is not None:
            del data["chats"][chat_index]

        with open(data_file_path, 'w') as file:
            json.dump(data, file)
        response = jsonify(data)

        return _corsify_actual_response(response)
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))





def all_summarizer(input_value, model, word_limit, edmundson_cue_words):
    # The sentence count has to be given since the summarizer just gives all the sentences in the original from otherwise
    # usually there are 15-20 words in a sentence
    sentence_count = int(word_limit / 20) 
    explanation = {}
    result = ""

    if is_url(input_value):
        print("is url")
        try:
            parser = HtmlParser.from_url(input_value, Tokenizer(LANGUAGE))
            stemmer = Stemmer(LANGUAGE)
            document = parser.document
            print("Loaded:", document)
            sentences2 = []
            for paragraph in document.paragraphs:
                sentences2.extend(paragraph.sentences)
            text_block = ' '.join([str(sentence) for sentence in sentences2])
            input_value = text_block
        except Exception as error:
            stemmer = Stemmer(LANGUAGE)
            result = f"Opening the URL caused error: {error}"
            worked = False
    
    else:
        parser = PlaintextParser.from_string(input_value, Tokenizer(LANGUAGE))
        stemmer = Stemmer(LANGUAGE)
    
    if 'worked' not in locals(): #Could be made into a hashmap
        if model == "default":
            print("LSA")
            summarizer = Summarizer(stemmer)
            explanation_module = LSAExplanationModule(summarizer, parser, LANGUAGE, sentence_count)
            explanation = explanation_module(input_value)

        elif model == "edmundson":
            print("edmundson")
            summarizer = EdmundsonSummarizer(stemmer)
            summarizer.bonus_words = [word.strip() for word in edmundson_cue_words[0].split(",")]
            summarizer.stigma_words = [word.strip() for word in edmundson_cue_words[1].split(",")]
            summarizer.null_words = [word.strip() for word in edmundson_cue_words[2].split(",")]
            explanation_module = EdmundsonExplanationModule(stemmer, summarizer, parser, word_limit, sentence_count)
            explanation = explanation_module(input_value)

        elif model == "lex-rank":
            print("lexrank")
            summarizer = LexRankSummarizer(stemmer)
            explanation_module = LexRankExplanationModule(summarizer, parser, LANGUAGE, sentence_count)
            explanation = explanation_module(input_value)

        elif model == "luhn":
            print("luhn")
            summarizer = LuhnSummarizer(stemmer)
            explanation_module = LuhnExplanationModule(summarizer, parser, LANGUAGE, sentence_count)
            explanation = explanation_module(input_value)

        elif model == "kl":
            print("kl")
            summarizer = KLSummarizer(stemmer)
            explanation_module = KLExplanationModule(summarizer, parser, LANGUAGE, sentence_count)
            explanation = explanation_module(input_value)

        elif model == "text-rank":
            print("text-rank")
            summarizer = TextRankSummarizer(stemmer)
            explanation_module = TextRankExplanationModule(summarizer, parser, LANGUAGE, sentence_count)
            explanation = explanation_module(input_value)

        elif model == "reduction":
            print("reduction")
            summarizer = ReductionSummarizer(stemmer)
            explanation_module = ReductionExplanationModule(summarizer, parser, LANGUAGE, sentence_count)
            explanation = explanation_module(input_value)

        elif model == "sumbasic":
            print("sumbasic")
            summarizer = SumbasicSummarizer(stemmer)

        elif model == "random":
            print("random")
            summarizer = RandomSummarizer(stemmer)

        elif model == "abstractive": #Can be disabled if there are system limitations, takes up a bunch of resources mainly ram
            # https://github.com/huggingface/transformers/blob/main/src/transformers/pipelines/text2text_generation.py
            from transformers import pipeline
            print("abstractive")
            summarization_pipeline = pipeline("summarization", model="facebook/bart-base")
            summary = summarization_pipeline(input_value, max_length=word_limit, min_length=40, do_sample=True)[0]['summary_text']
            return summary, explanation 
        
        else:
            print("defaulted")
            summarizer = Summarizer(stemmer)  # Default to LSA
        if model != "edmundson":
            summarizer.stop_words = get_stop_words(LANGUAGE)
    
        summarized_sentences = []
        word_count = 0  
        print(str(summarizer))

        for sentence in summarizer(parser.document, sentence_count):
            current_words = str(sentence).split()
            if word_count + len(current_words) > word_limit:
                break
            summarized_sentences.append(str(sentence))
            word_count += len(current_words)

        result = " ".join(summarized_sentences)
        return result, explanation
    
    return result, explanation


def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "POST, PUT, OPTIONS")
    return response


def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    return response


def is_url(string):
    valid_schemes = ['http://', 'https://']
    for scheme in valid_schemes:
        if string.startswith(scheme):
            return True
    
    url_pattern = r'^\s*(https?://[^\s/$?#]+\.[^\s]*)$'
    if re.match(url_pattern, string):
        return True
    
    return False



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
