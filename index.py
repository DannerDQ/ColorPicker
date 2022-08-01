from flask import Flask, render_template

app = Flask(__name__)

# Ruta principal de la app
@app.route('/')
def home():
	return render_template('home.html')

# Ruta para el historial de la app
@app.route('/historial')
def history():
	return render_template('history.html')

# Iniciar servidor
if __name__ == '__main__':
	app.run(debug = True)