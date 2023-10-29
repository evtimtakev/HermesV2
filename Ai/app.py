from flask import Flask, render_template, request, url_for, jsonify
from ai import prep_sentiment_model, sentiment_classification, prep_category_classification_model, categorical_classification

app = Flask(__name__)
model_sentiment, sentiment_tokenizer = prep_sentiment_model()
model_category, category_tokenizer = prep_category_classification_model()

PROMPTS = {
    "sentiment": "s",
    "category": "c"
}

@app.route("/predict", methods=["POST"])
def my_test_endpoint():
    input_json = request.get_json(force=True)
    prompt = input_json["prm"]

    if prompt == PROMPTS["sentiment"]:
        response = sentiment_classification(model_sentiment, sentiment_tokenizer, input_json["content"], input_json["filter"])
    elif prompt == PROMPTS["category"]:
        response = categorical_classification(model_category, category_tokenizer, input_json["content"], input_json["filter"])
    else:
        response = {}

    dict_to_return = {"data": response}
    return jsonify(dict_to_return)


if __name__ == "__main__":
    app.run(debug=True)
