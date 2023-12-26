
from flask import Flask,jsonify,render_template,request
from flask_cors import CORS

from chat import get_response

app = Flask(__name__)
CORS(app)


@app.get('/')
def get_data():
    data = {
        "message":"Hello this is api end point"
    }
    return jsonify(data)


@app.post('/predict')
def predict():
    text = request.get_json().get("message")
    if text == "hi":
        return jsonify({"answer":"hello, how are you?"})
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)