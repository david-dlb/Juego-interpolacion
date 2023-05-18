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

# opciones de interpolacion usando spline
def op1():
    x = [2, 3, 6,7,8,9, 200, 380, 470, 500, 600, 700, 780]
    y = [5, 8,22,33,43,47, 300, 200, 240, 500, 300, 500, 380]
    sprep = interpolate.splrep(x,y,s=0)
    return sprep
def op2():
    x = [2, 3, 6,7,8,9, 100, 380, 470, 500, 600, 700, 780]
    y = [5, 8,22,33,43,47, 100, 200, 240, 500, 700, 600, 780]
    sprep = interpolate.splrep(x,y,s=0)
    return sprep
def op3():
    x = [2, 3, 6,19,50,90, 200, 380, 420, 500, 600, 700, 780]
    y = [5, 8,22,30,10,47, 300, 200, 240, 300, 600, 400, 580]
    sprep = interpolate.splrep(x,y,s=0)
    return sprep
def op4():
    x = [2, 10, 15,19,50,90, 150, 380, 420, 500, 600, 700, 780]
    y = [10, 32,56,56,10,47, 100, 140, 280, 400, 600, 700, 580]
    sprep = interpolate.splrep(x,y,s=0)
    return sprep
def op5():
    x = [2, 10, 15,19,50,90, 150, 380, 420,  500, 600, 700, 780]
    y = [10, 12,36,36,60,47, 140, 40, 180, 500, 600, 700, 780]
    sprep = interpolate.splrep(x,y,s=0)
    return sprep
def op6():
    x = [2, 10, 15,19,50,90, 150, 380, 420, 500, 600, 700, 780]
    y = [10, 12,36,36,60,47, 140, 160, 280, 500, 600, 700, 780]
    sprep = interpolate.splrep(x,y,s=0)
    return sprep
def op7():
    x = [2, 10, 15,19,50,170, 230, 380, 420, 500, 600, 700, 780]
    y = [10, 12,36,36,60,47, 140, 160, 280, 500, 600, 700, 700]
    sprep = interpolate.splrep(x,y,s=0)
    return sprep
def op8():
    x = [2, 10, 15,19,50,170, 230, 380, 420, 500, 600, 700, 780]
    y = [10, 12,36,36,60,47, 140, 160, 280, 100, 200, 500, 200]
    sprep = interpolate.splrep(x,y,s=0)
    return sprep
# lista de opciones
l = [op1, op2, op3, op4, op5, op6, op7, op8]

class Move(Resource):
    def get(self): 
        return "ddddd"
    def post(self):
        # genera una opcion aleatoria
        sprep = l[int(random.randrange(0, len(l)))]()
 
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