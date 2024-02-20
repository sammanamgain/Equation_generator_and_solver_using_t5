import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import json
from flask_cors import CORS
import os
from flask import Flask, request, jsonify
from transformers import T5ForConditionalGeneration, T5Tokenizer
app = Flask(__name__)
CORS(app)
# Load model directly

device = torch.device("cpu")
# Load model directly

tokenizer = AutoTokenizer.from_pretrained(
    "sammanamgain/advanced-T5-large-model")
model = AutoModelForSeq2SeqLM.from_pretrained(
    "sammanamgain/advanced-T5-large-model")
model.to(device)


def gen_output(text_output):
    text_output = text_output.replace('equation:', '')
    text_output = text_output.replace('<pad>', '')
    text_output = text_output.replace('<unk>', '-')
    text_output = text_output.replace('</s>', '')
    text_output = text_output.replace('<s>', '')
    return text_output


@app.route('/math', methods=['POST'])
def math_solver():
    print("is it running")

    try:
        data = request.get_json()

        print(data['text'])
        input_ids = tokenizer(
            f"English to Math Equation:{data['text']}", return_tensors="pt"
        ).input_ids.to(device)
        outputs = model.generate(input_ids, max_length=30)
        output = tokenizer.decode(outputs[0], skip_special_tokens=False)
        output = gen_output(output)

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
