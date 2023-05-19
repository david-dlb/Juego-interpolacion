from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask import send_file
from scipy import interpolate 
import json
import random
import pandas as pd
import numpy  

app = Flask(__name__)
api = Api(app)

class Move(Resource):
    def get(self): 
        return "ddddd"
    def post(self):
        # genera una opcion aleatoria 
        x = [2, 10, 15,19,50,170, 230, 380, 420, 500, 600, 700, 780]
        y = [10, 12,36,36,60]
        for i in range(len(x) - len(y)):
            y.append(int(random.randrange(50, 680)))
        sprep = interpolate.splrep(x,y,s=0)
 
        # genera todo el grafico
        xint1 = []
        for i in range(700):
            xint1.append(i)
        yint1 = interpolate.splev(xint1, sprep, der=0)
         
        # devuelve como un json
        df = pd.DataFrame(yint1, columns=["2"])
        return df.to_json()
    
class Home(Resource):
    def get(self):
         
        return send_file('/home/david/David/Programación/CC/Ciber 2do/Semestre I/Matematica Numerica/juego interpolacion futbol' + '/canvas.html')
    

api.add_resource(Move, '/move')  # Route_2

api.add_resource(Home, '/')  # Route_2
if __name__ == '__main__':
     app.run(port='5000')