const canvas = document.querySelector('canvas')
canvas.width = 300
canvas.height = 300
const ctx = canvas.getContext("2d")

// const img = new Image();
// img.src = 'img.png';

//LAST
const score =  {
  left: 0,
  right: 0
}
// Testing
// ctx.fillRect(0,0,canvas.width, canvas.height) // x position y position widht height

// ctx.fillStyle = "orange"
// ctx.fillRect(0, 0, 10, 30)

// ctx.fillStyle ="red"
// ctx.fillRect(canvas.width - 10, 0, 10, 30)

// We dont want to do this because we would lose a lot of ttime

// ----  PASS 1 --------
class Padel {
  constructor(x, color) {
    this.x = x,
    this.y = 0,
    this.w = 10,
    this.h = 30,
    this.color = color,

    // NEWW 4
    this.speed = 10
    // ----
  }

  draw(){
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }

  // NEEW 4
  moveUp(){
    if (this.y < 1 ){
      return
    }
    this.y -= this.speed
  }

  moveDown(){
    if (this.y > canvas.height - this.h -1) {
      return
    }
    this.y += this.speed
  }
  // NEW 8
  contains(b) {
    return (this.x < b.x + b.w) &&
      (this.x + this.w > b.x) &&
      (this.y < b.y + b.h) &&
      (this.y + this.h > b.y)
  }
  // -----
}

let padel1 = new Padel(0, "orange")
let padel2 = new Padel(canvas.width-10 , "red")

// padel1.draw()
// padel2.draw()

// -------- PAS 2 -----

// class Ball {
//   constructor() {
//     this.x = 150,
//     this.y = 0,
//     this.w = 10,
//     this.h = 10,
//     this.color = "blue"
//   }

//   draw() {
//     ctx.fillStyle = this.color
//     ctx.fillRect(this.x, this.y, this.w, this.h)
//   }
// }

// let ball1 = new Ball()
// ball1.draw()


// ------- Frames por segundo (60 por defult) ---- Tu ordenador refrescan tu pantalla 60 veces por segundo -- ordenador pro 200

// const update = () => {

// }

// --------  We use it to give control to the navigator, instead of set interval
// requestAnimationFrame(update)



// --------   Moviments de pilota --------------

class Ball {
  constructor() {
    this.x = 150,
    this.y = 0,
    this.w = 10,
    this.h = 10,
    this.color = "blue",
    // NEWWWW
    //  this.direction = "right"
    // -------
    // NEWWW 5
    this.directionX = "right",
    this.directionY = "up"
    this.friction = 0.5,
    this.speedX = 1,
    this.speedY = 1,
    // NEW 9
    this.isMoving = false
    // -----
  }

  draw() {
    // // NEWWWW
    // if (this.direction === "right") {
    //   this.x++
    // } else {
    //   this.x--
    // }
    // // -------
    // // NEWWWW 2
    // if(this.x > canvas.width-20) {
    //   this.direction = "left"
    // } else if (this.x < 10){
    //   this.direction = "right"
    // }
    // NEWWWW 5
    this.handleMovements();
    // ---------
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
    // ctx.drawImage(img, this.x, this.y, this.w, this.h)

  }

  // NEW 5
  handleMovements() {
    // NEW 9
    if (!this.isMoving){
      return
    }
    //__
    if (this.x < 0){
      this.directionX = "right"
    } else if (this.x > canvas.width - this.w) {
      this.directionX = "left"
    }
    // fisics to be fluid
    if (this.directionX === "right") {
      this.speedX++
    } else {
      this.speedX--
    }
    // friction
    this.speedX *= this.friction
    // Control velociti and direction
    this.x += this.speedX

    // movimiento arriba abajo
    if (this.y < 0) {
      this.directionY = "down"
    } else if (this.y > canvas.height - this.h){
      this.directionY = "up"
    }
    if (this.directionY === "down") {
      this.speedY++
    } else {
      this.speedY--
    }
    // firciont
     this.speedY *= this.friction
     this.y += this.speedY
  }
  // ----
}

let ball1 = new Ball()
ball1.draw()

const update = () => {
  // NEW 2
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // Padels go away
  // NEW 7
  drawCourt()
  drawScore()
  //--
  padel1.draw()
  padel2.draw()
  //
  ball1.draw()
  // NEW 8
  // console.log(padel1.contains(ball1))
  checkCollitions()
  requestAnimationFrame(update)
}

// AUXILIAR functions
// NEW 7
const drawCourt = () => {
  ctx.strokeStyle ="black"
  ctx.lineWidth = 5
  ctx.strokeRect(0, 0, canvas.width, canvas.height)
  // rectangle fet
  ctx.lineWidth = 2;
  ctx.moveTo(canvas.width / 2, 0)
  ctx.lineTo(canvas.width / 2, canvas.height)
  ctx.stroke()
}
// NEW 8
const checkCollitions = () => {
  if (padel1.contains(ball1)) {
    ball1.directionX ="right";
  } else if (padel2.contains(ball1)) {
    ball1.directionX = "left";
    //y ?
  }
  // NEW 9
  if (ball1.x < 0) {
    // console.log("yes") Suma 3 veces???
    ball1.x = 150
    ball1.y = 150
    ball1.isMoving =false
    score.right++
  } else if (ball1.x > canvas.width -ball1.w){
    ball1.x = 150
    ball1.y = 150
    ball1.isMoving = false
    score.left++
  }
}
// NEW 9
const drawScore = () => {
  ctx.fillStyle ="gray"
  ctx.font = "24px Arial"
  ctx.fillText(score.left, 70, 70 )
  ctx.fillStyle = "gray"
  ctx.font = "24px Arial"
  ctx.fillText(score.right, 220, 70)
}

// NEWW 3 ---- addevent listners
document.addEventListener("keydown", (e) => {
  // new 9
  ball1.isMoving= "true"
  // .----
  console.log(e)
  if (e.keyCode === 38){ //up
    padel1.moveUp()
    padel2.moveUp()
  } else if (e.keyCode === 40){  //down
    padel1.moveDown()
    padel2.moveDown()
  }
})
// ---

requestAnimationFrame(update)
