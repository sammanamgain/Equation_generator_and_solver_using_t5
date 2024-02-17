import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import json
from flask_cors import CORS
import os
from flask import Flask, request, jsonify
from transformers import T5ForConditionalGeneration, T5Tokenizer
app = Flask(__name__)
# Load model directly

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


tokenizer = AutoTokenizer.from_pretrained("sammanamgain/T5_model")
model = AutoModelForSeq2SeqLM.from_pretrained("sammanamgain/T5_model")
model.to(device)

CORS(app)


@app.route('/math', methods=['POST'])
def math_solver():
    print("is it running")

    try:
        data = request.get_json()

        print(data['text'])
        input_ids = tokenizer(
            f"English to Math Equation:{data['text']}", return_tensors="pt"
        ).input_ids.to(device)
        outputs = model.generate(input_ids,max_length=30)
        output = tokenizer.decode(outputs[0], skip_special_tokens=True)
        # equation="2x+3=5"
        print(output)

        response_data = {'success': True,
                         'message': 'Data received successfully', 'data': output}
        return jsonify(response_data), 200

    except Exception as e:
        print("Error")
        print(str(e))

        return jsonify({'error': str(e)}), 500


app.run(debug=True)
