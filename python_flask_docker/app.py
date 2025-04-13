from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({
        'status': 'success',
        'message': 'API для проєкту "Безбар\'єрний " працює'
    })

@app.route('/api/health')
def health():
    return jsonify({
        'status': 'healthy',
        'version': '0.1.0'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')