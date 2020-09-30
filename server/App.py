from flask import Flask, request, jsonify;
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['POST'])
def algorithm():
    return jsonify({
	"result": []
    })

if __name__== '__main__': 
    app.run(port = 5000, debug = True)