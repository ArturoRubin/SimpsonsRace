

// Seleccionamos nuestro lienzo

const lienzo = document.getElementById("space")
console.log(lienzo)

const ctx = lienzo.getContext("2d")
console.log(ctx)

/*//Movimiento de fondo
const img = new Image()
img.src = "../Assets/Imagenes/road1.jpg"

const canvas = document.getElementById("space")

const backgroundImage ={
    img: img,
    x: 0,
    speed: -3,

    move: function(){
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
    img.onload = updateCanvas; */
    



//Personaje

class Nave {
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.velocidad = 10
    }

    // Metodos

    dibujarse(){
        //ctx.drawImage()
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    disparar(){
        console.log("dispara")
    }

    adelante(){
        if(this.x <740)
        this.x += this.velocidad
    }

    atras(){
        if(this.x > 0){
        this.x -= this.velocidad
        }
    }

    arriba(){
        if(this.y > 0){
        this.y -= this.velocidad
        }
    }

    abajo(){
        if(this.y <340){
        this.y += this.velocidad
        }
    }
}


ctx.fillRect(10, 145, 60, 60)

//Instancia
const nave = new Nave(10, 145, 60, 60)
console.log(nave)


//Escuchamos las teclas

document.addEventListener("keydown", (evento) =>{
    console.log(evento.key)
    switch(evento.key){
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

//Funcion empezar juego
function empezarJuego(){
    setInterval(() =>{
        console.log("Estamos jugando")
        ctx.clearRect(0, 0, 800, 400)
        // Dibujar
        nave.dibujarse()
    }, 100)
}

// Seleccionar el boton para empezar el juego

let btn = document.getElementById("jugar")

btn.addEventListener("click", ()=> {
    empezarJuego()
})


