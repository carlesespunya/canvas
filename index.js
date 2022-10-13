const canvas = document.querySelector("canvas")

const ctx = canvas.getContext("2d")
const img = new Image();
img.src = "img.png"

const score = {
  left: 0,
  right: 0
}

// // ctx.fillRect(0,0, canvas.width,canvas.height)
// ctx.fillStyle = "orange"
// ctx.fillRect(0,0,10,30)

// ctx.fillStyle = "red"
// ctx.fillRect(canvas.width -10, 0, 10, 30)

class Padel {
  constructor(x, color){
    this.x = x,
    this.y = canvas.height/2 - 15,
    this.w = 10,
    this.h = 30,
    this.color = color,
    this.speed = 15
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }

  moveUp(){
    if (this.y < 1) {
      return
    }
    this.y -= this.speed
  }

  moveDown(){
    if (this.y > canvas.height - this.h - 1) {
      return
    }
    this.y += this.speed
  }

  contains(b){
    return (this.x < b.x + b.w) &&
      (this.x + this.w > b.x) &&
      (this.y < b.y + b.h) &&
      (this.y + this.h > b.y)
  }
}
let padelR = new Padel(0, "orange")
let padelL = new Padel(canvas.width - 10, "red")

class Ball {
  constructor() {
    this.x = (canvas.width / 2) - 5,
    this.y = (canvas.height / 2) - 5 ,
    this.w = 10,
    this.h = 10,
    this.color = "blue",

    //movement features
    this.directionX = "right",
    this.directionY = "up",
    this.friction = 0.7,
    this.speedX = 1,
    this.speedY = 1

    // IS moving?
    this.isMoving = false
  }

  handleMoves(){
    if (!this.isMoving){
      return
    }
    // Define limits for x and change directions
    if(this.x<0){
      this.directionX = "right"
    } else if (this.x > canvas.width -this.w){
      this.directionX = "left"
    }

    // Definde movement for X direction
    if (this.directionX === "right") {
      this.speedX++
    } else {
      this.speedX--
    }

    this.speedX *= this.friction
    this.x += this.speedX

    // Move in th Y axis

    if (this.y < 0) {
      this.directionY = "up"
    } else if (this.y > canvas.height - this.h) {
      this.directionY = "down"
    }

    // Definde movement for Y direction
    if (this.directionY === "up") {
      this.speedY++
    } else {
      this.speedY--
    }

    this.speedY *= this.friction
    this.y += this.speedY

  }

  draw(){
    this.handleMoves()
    ctx.fillStyle = this.color
    //ctx.fillRect(this.x, this.y, this.w, this.h)
    ctx.drawImage(img, this.x, this.y, this.w *3, this.h*3)
  }
}

let ball1 = new Ball()


const update = () => {
  ctx.clearRect(0,0,canvas.width, canvas.height)
  drawCourt()
  padelR.draw()
  padelL.draw()
  ball1.draw()
  drawScore()
  checkCollitions()
  console.log(padelR.contains(ball1))

  requestAnimationFrame(update)
}

// Build auxiliar function

const drawCourt = () => {
  ctx.strokeStyle = "black"
  ctx.lineWidth = 5
  ctx.strokeRect(0,0,canvas.width, canvas.height)

  ctx.lineWidth = 2
  ctx.moveTo(canvas.width / 2,0)
  ctx.lineTo(canvas.width / 2, canvas.height)
  ctx.stroke()
}

const checkCollitions = () => {
  if (padelR.contains(ball1)){
    ball1.directionX = "right"
  } else if (padelL.contains(ball1)){
    ball1.directionX = "left"
  }

  if (ball1.x < 0){
    score.right++
    ball1.x = canvas.width / 2 -5
    ball1.y = canvas.height / 2
    ball1.isMoving = false
  } else if( ball1.x > canvas.width - ball1.w) {
    score.left++
    ball1.x = canvas.width / 2-5
    ball1.y = canvas.height / 2
    ball1.isMoving = false
  }
}

const drawScore = () => {
  ctx.fillStyle = "gray"
  ctx.font = "20px Arial"
  ctx.fillText(score.left, 70,70)
  ctx.fillText(score.right, 215, 70)

}

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 38){
    // move up
    padelL.moveUp()
    padelR.moveUp()
  } else if (e.keyCode === 40){
    //move down
    padelL.moveDown()
    padelR.moveDown()
  }

  if (e.keyCode === 32) {
    ball1.isMoving = true
  }
})


requestAnimationFrame(update)
