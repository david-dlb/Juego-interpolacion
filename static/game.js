canvas = document.getElementById("game")
let ctx = canvas.getContext("2d")
let imgPelota = new Image()
imgPelota.src = "static/pelota.png"
let imgHand = new Image()
imgHand.src = "static/guantes.png"

// por definicion del canvas y el juego tomamos a py como el eje x
let px = 0
let py = 0
let pw = 0
let ph = 0 

// posicion de las manos
let phx = 250
let phy = 400


// iniciar interpolacion
y = []
const initInterpolation = async () => {
    y = await func(0)
    y = JSON.parse(y)
    y = y[2]
    // console.log(y)
}

const draw = async() => {
    if (canvas.getContext) {
        clear()
        ctx.drawImage(imgPelota, y[py], py, 50, 50)
        px = y[py]
        console.log(y[py], py)
        ctx.drawImage(imgHand, phx, phy, 50, 50)
        ctx.drawLine
    }
}

const clear = () => {
    ctx.clearRect(0, 0, 500, 500)
}

const func = async (x) => {
    const response = await fetch(`/move`, {
        method: 'POST',
        body: JSON.stringify(x)
    })
    return await response.json();
}


setInterval(() => {
    py += 1
    draw()
    checkColission()
}, 10)

const checkColission = () => {
    // si gana el jugador
    posL = -phx  + (px + 50)
    posR = (phx + 50) - px
    if (py + 50 == phy && ((posL > 0 && posL < 50) || (posR > 0 && posR < 50))) {
        alert("Has ganado toca aceptar para reiniciar")
        restart()
        initInterpolation()
    }
    // gana la pc
    if (py + 50 == 490) { 
        alert("Has perdido toca aceptar para reiniciar")
        restart()
        initInterpolation()
    }
    // si gana la pc
}

const restart = () => {
    px = 0
    py = 0
    pw = 0
    ph = 0 
    // posicion de las manos
    phx = 250
    phy = 400
}

const stopMovHand = () => {
    if (phx == 450) {
        phx -= 10
    }
    if (phx == 10) {
        phx += 10
    }
}

document.addEventListener("keydown", (e) => {
    key = e.key
    e.preventDefault() 
    if (key == "ArrowLeft") {
        phx -= 10
        stopMovHand()
        draw()
    }
    if (key == "ArrowRight") {
        phx += 10
        stopMovHand()
        draw()
    }
})

// alert("El juego esta apunto de comenzar. Para comenzar pulse aceptar.")
initInterpolation()