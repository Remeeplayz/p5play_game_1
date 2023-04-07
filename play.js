let elvio,
    tiles = [],
    exits = [],
    exiting = false,
    xSpeed = 0,
    ySpeed = 0,
    scale = 2,
    currentLevel = 'level0'

const drawLevel = (data) => {
    let tileNo = 0
    let exitNo = 0

    data.forEach((line, j) => {
        const tileWidth = width / line.length
        for (let i = 0; i < line.length; i++) {
            const tileType = line.charAt(i)
            if(tileType === '0') continue
            const tileHeight = height / data.length

            if(tileType === '1') {
                tiles[tileNo] = new Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileWidth, tileHeight, 'static')
                tiles[tileNo].img = './assets/Brickwall.png'
                tiles[tileNo].scale = scale
                tiles[tileNo].width = 16 * scale
                tiles[tileNo].height = 16 * scale
                tileNo++
            }

            if(tileType === 'X') {
                exits[exitNo] = new Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileWidth, tileHeight, 'static')
                exits[exitNo].img = './assets/Exit.png'
                exits[exitNo].scale = scale
                exits[exitNo].width = 16 * scale
                exits[exitNo].height = 16 * scale
                exitNo++
            }
        }
    })
}

const loadNewLevel = () => {
    if(exiting) return
    tiles.forEach((tile) => tile.remove())
    exits.forEach((exit) => exit.remove())
    exiting = true

    currentLevel = levels[currentLevel].next

    drawLevel(levels[currentLevel].data)

    elvio.x = levels[currentLevel].startX
    elvio.y = levels[currentLevel].startY
    exiting = false
}

function setup() {
    new Canvas(640, 480)

    elvio = new Sprite()
    elvio.img = './assets/ElvioStanding.png'
    elvio.scale = scale
    elvio.width = 16 * scale
    elvio.height = 27 * scale

    world.gravity.y = 10

    loadNewLevel()
}

function draw() {
	background(220)

    if (kb.pressing('left')) {
        elvio.mirror.x = false
        xSpeed = xSpeed < -2 ? xSpeed : xSpeed - 0.3
    }
    if (kb.pressing('right')) {
        elvio.mirror.x = true
        xSpeed = xSpeed > 2 ? xSpeed : xSpeed + 0.3
    }
    if (kb.presses('up') && Math.abs(elvio.vel.y) < .2) {
        elvio.vel.y = elvio.vel.y - 5
        elvio.img = './assets/ElvioJump.png'
    }

    if(xSpeed < .1) {
        elvio.img = './assets/ElvioRuning.png'
    }

    if(xSpeed > .1) {
        elvio.img = './assets/ElvioRuning.png'
    }

    if(xSpeed === 0) {
        elvio.img = './assets/ElvioStanding.png'
    }

    if(!exiting) {
        exits.forEach((e) => {
            if(!elvio.collides(e)) return
            loadNewLevel()
        })
    }

    

    xSpeed = Math.abs(xSpeed) < 0.1 ? 0 : xSpeed * 0.9
    elvio.vel.x = xSpeed
    elvio.rotation = 0
}