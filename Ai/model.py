import numpy as np
from tensorflow import keras
from keras.preprocessing.sequence import pad_sequences
import pickle
import nltk
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer

# ACTIVATE THE VENV with "source venv/bin/activate"

# Run this command to download the nltk dictionaries. This is requiered to be done once
# nltk.download("all")

max_fatures = 2000
max_len = 200
sentiment = [0, -1, 1]
lang = "english"
stop_words = set(stopwords.words(lang))
stemmer = SnowballStemmer(lang)


def stem_word(text):
    return " ".join([stemmer.stem(word) for word in text])


def remove_stopwords(tokens):
    filtered_tokens = [token for token in tokens if token.lower() not in stop_words]
    return filtered_tokens


def tokenize_text(text):
    tokens = nltk.word_tokenize(text)
    return tokens


def sentiment_classification(model, loaded_tokenizer, data, filter=1):

    predictions = {
        "negative": [],
        "neutral": [],
        "positive": []
    }

    for t in data:
        test = tokenize_text(t["text"])
        test = remove_stopwords(test)
        test = stem_word(test)
        print("".join(test))
        sequence = loaded_tokenizer.texts_to_sequences(["".join(test)])
        test_padded = pad_sequences(sequence, maxlen=max_len)

        prediction = sentiment[np.around(model.predict(test_padded), decimals=0).argmax(axis=1)[0]]

        if prediction == 0:
            predictions["neutral"].append(t)
        elif prediction == 1:
            predictions["positive"].append(t)
        else:
            predictions["negative"].append(t)

    if filter == 0:
        return predictions["neutral"]
    elif filter == 1:
        return predictions["positive"]
    else:
        return predictions["negative"]


def prep_model():
    model = keras.saving.load_model("./model")

    with open("./tokenizer/tokenizer.pickle", "rb") as handle:
        loaded_tokenizer = pickle.load(handle)

    return model, loaded_tokenizer
