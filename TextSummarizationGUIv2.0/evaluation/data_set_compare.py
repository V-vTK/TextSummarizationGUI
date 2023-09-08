import matplotlib.pyplot as plt
from statistics import mean
import numpy as np

import os
import json

script_dir = os.path.dirname(os.path.abspath(__file__))
falcon_data_dir = os.path.join(script_dir, 'FalconROUGE/data')
summEval_data_dir = os.path.join(script_dir, 'SummEval')

falcon_data_file = "FalconModelData.json"
summEval_data_file = "model_annotations.aligned.paired.jsonl"

falcon_file_path = os.path.join(falcon_data_dir, falcon_data_file)
summEval_file_path = os.path.join(summEval_data_dir, summEval_data_file)


def load_JSON_file(file_path):
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)
    return data

def load_JSONL_file(file_path):
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
                expert_annotation = data["expert_annotations"]
                golden_summary = data["decoded"]
                output_data[id_value] = {   
                    "text" : text,
                    "expert_annotations" : [expert_annotation],
                    "golden_summaries" : [golden_summary]
                }
            else:
                print("error in data")
                raise Exception("Error in data pairing, there should not be duplicate ID's seperated ")
            prev_id = data["id"]
    return output_data

def count_characters_in_list(text_list):
    concatenated_text = ' '.join(text_list)
    character_count = len(concatenated_text)
    return character_count

def get_summEval_data_stats(data):
    summary_len_list = []
    article_len_list = []

    for key in data.keys():
        summary_len_list.append(count_characters_in_list(data[key]["golden_summaries"]))
        article_len_list.append(len(data[key]["text"]))

    article_avg = mean(article_len_list)
    summary_avg = mean(summary_len_list)

    output_data = {
        "article_avg_length" : article_avg,
        "summary_avg_length" : summary_avg,
        "ratio" : summary_avg / article_avg
        }
    return output_data

def get_falcon_data_stats(data):
    summary_len_list = []
    article_len_list = []
    for key in data.keys():
        
        article_len_list.append(count_characters_in_list(data[key]["text"]))
        for entry in data[key]["golden_summaries"]:
            summary_len_list.append(count_characters_in_list(data[key]["golden_summaries"][entry]))

    article_avg = mean(article_len_list)
    summary_avg = mean(summary_len_list)

    output_data = {
        "article_avg_length" : article_avg,
        "summary_avg_length" : summary_avg,
        "ratio" : summary_avg / article_avg
        }
    return output_data


def plot_datasets(data1, data2):
    keys = list(data1.keys())
    values1 = list(data1.values())
    values2 = list(data2.values())

    x = np.arange(len(keys))
    bar_width = 0.4

    plt.figure(figsize=(10, 6))
    bars1 = plt.bar(x - bar_width/2, values1, color='skyblue', width=bar_width, label='SummEval dataset stats')
    bars2 = plt.bar(x + bar_width/2, values2, color='mediumseagreen', width=bar_width, label='Falcon dataset stats')


    for bar1, bar2 in zip(bars1, bars2):
        value1_rounded = round(bar1.get_height(), 2)
        value2_rounded = round(bar2.get_height(), 2)
        plt.text(bar1.get_x() + bar1.get_width()/2, bar1.get_height(), f'{value1_rounded}', ha='center', va='bottom', fontsize=10)
        plt.text(bar2.get_x() + bar2.get_width()/2, bar2.get_height(), f'{value2_rounded}', ha='center', va='bottom', fontsize=10)

    plt.xticks(x, keys)
    plt.ylabel('Values')
    plt.title('Comparison of Datasets')
    plt.legend()

    plt.tight_layout()
    plt.show()


def main():
    falcon_data = load_JSON_file(falcon_file_path)
    summEval_data = load_JSONL_file(summEval_file_path)
    summEval_stats = get_summEval_data_stats(summEval_data)
    falcon_stats = get_falcon_data_stats(falcon_data)
    plot_datasets(summEval_stats, falcon_stats)
    print(summEval_stats)
    print(falcon_stats)

if __name__ == "__main__":
    main()