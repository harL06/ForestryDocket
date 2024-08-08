from flask import Flask
from flask_cors import CORS
import subprocess
import sys

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/run-python-script', methods=['GET'])
def run_python_script():
    subprocess.run(['python', 'Supabase.py'])
    return 'Script executed successfully', 200

if __name__ == '__main__':
    app.run(debug=True)
