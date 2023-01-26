

const lienzo = document.getElementById("space")
console.log(lienzo)

const ctx = lienzo.getContext("2d")
console.log(ctx)

// Movimiento de fondo

/* const img = new Image();
img.src="../Assets/Imagenes/fondoFInalFinal.png"

const backgroundImage = {
    img: img,
    x: 0,
    speed: -1,
  
    move: function() {
      this.x += this.speed;
      this.x %= canvas.width;
    },
  
    draw: function() {
      ctx.drawImage(this.img, this.x, 0);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.x + canvas.width, 0);
      } else {
        ctx.drawImage(this.img, this.x - this.img.width, 0);
      }
    },
  };
  
  function updateCanvas() {
    backgroundImage.move();
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
  
    requestAnimationFrame(updateCanvas);
  }
  
  // start calling updateCanvas once the image is loaded
  img.onload = updateCanvas;  */
    

//Seleccion botones
const menu = document.querySelector(".buttons")

//Seleccion gameOver
const gameOver = document.querySelector(".gameOver")

// Cargar imagenesx
const alienimg = new Image()
alienimg.src = "../Assets/Imagenes/homeroCocheFinal.png"
console.log(alienimg)

const autobus = new Image()
autobus.src = "../Assets/Imagenes/autobus.png"

const srburns = new Image()
srburns.src = "../Assets/Imagenes/srburns.png"

const marge = new Image()
marge.src = "../Assets/Imagenes/marge.png"

const tractor = new Image()
tractor.src = "../Assets/Imagenes/tractor.png"

const moe = new Image()
moe.src = "../Assets/Imagenes/moe.png"

const abuelo = new Image()
abuelo.src ="../Assets/Imagenes/abuelo.png"

// Arreglo aliens

const tiposAliens = [autobus, srburns, marge, tractor, moe, abuelo]


//Balas
const balas = []

// Aliens
const alien = []
//Personaje - Clase

class Nave {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.velocidad = 20
        this.img = alienimg
    }

    //Metodos

    dibujarse() {
        //ctx.drawImage()
        ctx.drawImage(this.img,this.x, this.y, this.w, this.h)
    }

    disparar() {
        console.log("Dispara")
        const bala = new Bala(this.x+ this.w, this.y+(this.h/2))
        balas.push(bala)
        console.log(balas)
    }

    adelante() {
        if (this.x < 770) {
            this.x += this.velocidad
        }
        this.img = alienimg
    }

    atras() {
        if (this.x > 0) {
            this.x -= this.velocidad
        }
    }

    arriba() {
        if (this.y > 0) {
            this.y -= this.velocidad
        }
    }

    abajo() {
        if (this.y < 370) {
            this.y += this.velocidad
        }
    }
}

//Bala - Clase
class Bala {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dibujarse() {
        ctx.fillRect(this.x, this.y, 10, 5)
        console.log({ x: this.x })
        //Mueve adelante

        if (this.x > 600) {
            balas.shift()
        }
    }
}

// ********************
//Alien - clase
class Alien{
    constructor(x,y, img){
        this.x = x;
        this.y = y;
        this.img = img
    }
    dibujarse(){
        console.log(this.img)
        this.x -= 7 //Aqui modificamos la velocidad en que se aparecen los otros coches
        ctx.drawImage(this.img, this.x, this.y, 100, 60) // Tamaño aliens
    }
}


ctx.fillStyle = "black"


//Instancia
const nave = new Nave(10, 140, 100, 60) //Tamaño coche homero

console.log(nave)


//Escuchamos las teclas 

document.addEventListener("keydown", (evento) => {
    // console.log(evento.key)
    switch (evento.key) {
        case "ArrowRight":
            nave.adelante()
            break;
        case "ArrowLeft":
            nave.atras()
            break;
        case "ArrowUp":
            nave.arriba()
            break;
        case "ArrowDown":
            nave.abajo()
            break;
        case " ":
            nave.disparar()
            break
    }
})

let tiempo = 0

//Funcion empezar juego
function empezarJuego() {
    console.log("Estamos jugando")
    ctx.clearRect(0, 0, 800, 400)
    //Dibujar nave
    nave.dibujarse()

    //Dibujar balas
    balas.forEach((bala) => {
        bala.x += 2
        console.log("dibuja")
        bala.dibujarse()
    })

    //Dibujar aliens
    alien.forEach((alien) =>{
        alien.dibujarse()

        //Colision de homero contra los coches
        if(alien.x <= nave.x + 100 && nave.y + 60 >= alien.y && nave.x <= alien.x &&  nave.y <= alien.y + 60){
            setGameOver()
        }
        
    })
    

  
    tiempo++
    ctx.font = "25px Arial"
    ctx.fillText(tiempo, 10, 30)
    requestAnimationFrame(empezarJuego) //FPS 
}

//Seleccionamos el btn y empezamos el juego
let btn = document.getElementById("jugar")

btn.addEventListener("click", () => {
    empezarJuego()

    //
    crearAlien()
    // Para borrar el play una vez iniciado el juego
    btn.classList.add("none")
})

//Creacion de los aliens
function crearAlien(){
setInterval(() => {
    const posicionY = Math.floor(Math.random() * 250)
    const posicionAleatorio = Math.floor(Math.random()*tiposAliens.length)
    
    const alienAleatorio = tiposAliens[posicionAleatorio]
    console.log(alienAleatorio)
    const a = new Alien(800, posicionY, alienAleatorio) //Velocidad de cada cuando salen los coches
    alien.push(a)
},1000) 
}


/* //Iniciar musica
let musica = new Audio()
        audio.src = "../Assets/Sonidos/musicaJuego.mp3"
    musica.play() */

// Game Over

function setGameOver(){
    //Agregar la clase none al menu y canvas
    lienzo.classList.add("none")
    lienzo.classList.add("none")
    gameOver.classList.remove("none")
}