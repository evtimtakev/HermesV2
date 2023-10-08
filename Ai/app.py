from flask import Flask, render_template, request, url_for, jsonify
from model import prep_model, sentiment_classification

app = Flask(__name__)
model, loaded_tokenizer = prep_model()

PROMPTS = {
    "sentiment": "s",
    "category": "c"
}

@app.route("/predict", methods=["POST"])
def my_test_endpoint():
    input_json = request.get_json(force=True)
    prompt = input_json["prm"]

    if prompt == PROMPTS["sentiment"]:
        response = sentiment_classification(model, loaded_tokenizer, input_json["content"], input_json["filter"])
    elif prompt == PROMPTS["category"]:
        response = {}
    else:
        response = {}

    dict_to_return = {"data": response}
    return jsonify(dict_to_return)


if __name__ == "__main__":
    app.run(debug=True)
