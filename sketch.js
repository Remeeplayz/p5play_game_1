let x = 50
let y = 380
let d = 24

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220)

  ellipse(x, y, d)
  line(20, 20, 380, 20)
  line(80, 350, 380, 350)
  line(20, 20, 20, 350)
  line(380 ,20, 380, 350)
  line(80, 320,80,290)
 
  if(keyIsPressed){
    if(key === "ArrowRight") {
      const collision = get(x + d/2 + 1, y)[0] === 0
      if(!collision) x++
    } else if (key === "ArrowLeft") {
      const collision = get(x - d/2 - 1, y)[0] === 0
      if(!collision) x--
    } else if (key === "ArrowUp") {
      const collision = get(x, y - d/2 - 1)[0] === 0
      if(!collision) y--
    } else if(key == "ArrowDown") {
      const collision = get(x, y + d/2 + 1)[0] === 0
      if(!collision) y++
    }
  } 
}