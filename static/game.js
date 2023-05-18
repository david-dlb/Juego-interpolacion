canvas = document.getElementById("game")
let ctx = canvas.getContext("2d")
let imgPelota = new Image()
imgPelota.src = "static/pelota.png"
let imgHand = new Image()
imgHand.src = "static/guantes.png"
let imgCancha = new Image()
imgCancha.src = "static/porteria.png"
songs = ["static/1.mp3", "static/2.mp3", "static/3.mp3", "static/4.mp3"]

// por definicion del canvas y el juego tomamos a py como el eje x
let px = 0
let py = 0
let pw = 0
let ph = 0 

// posicion de las manos
let phx = 250
let phy = 700


// iniciar interpolacion
y = []
const initInterpolation = async () => {
    y = await func(0)
    y = JSON.parse(y)
    y = y[2]
    console.log(y)
}

// dibuja a cada momento
const draw = async() => {
    if (canvas.getContext) {
        clear()
        ctx.drawImage(imgPelota, y[py], py, 50, 50)
        px = y[py]
        // console.log(y[py], py)
        ctx.drawImage(imgHand, phx, phy, 50, 50)
        ctx.drawImage(imgCancha, -380, 640, 1500, 200)
    }
}

const clear = () => {
    ctx.clearRect(0, 0, 800, 800)
}

// hace el llamado asincrono al servidor y devuelve la funcion
const func = async (x) => {
    const response = await fetch(`/move`, {
        method: 'POST',
        body: JSON.stringify(x)
    })
    return await response.json();
}

// establece los frame
setInterval(() => {
    py += 2
    draw()
    checkColission()
}, 1)

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
    if (py + 50 == 790) { 
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
}

// evita que las manos se vayan de la pantalla
const stopMovHand = () => {
    if (phx == 450) {
        phx -= 10
    }
    if (phx == 10) {
        phx += 10
    }
}

// carga la cancion aleatoria
const loadSong = () => {
    rand = Math.random()*4
    rand = parseInt(rand)
    console.log(rand)
    const source = document.getElementById('source')
	const currentPlay = document.getElementById('currentPlay')
 
	source.src = songs[rand]
	player.load()
    player.play()
}

// alert("El juego esta apunto de comenzar. Para comenzar pulse aceptar.")
initInterpolation()
let isLoadSong = false

// para activar la musica
document.addEventListener("click", () => {
    if (isLoadSong) {
        return
    }
    loadSong()
})
document.addEventListener("keydown", (e) => {
    if (e.key != " ") {
        return
    }
    loadSong()
    isLoadSong = true
})

// movimiento de mause
document.addEventListener("mousemove", (e) => {
    if (phx > e.clientX) {
        phx -= 20
        stopMovHand()
        draw()
    }
    if (phx < e.clientX) {
        phx += 20
        stopMovHand()
        draw()
    }
})