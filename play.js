let elvio,
    tiles,
    exits,
    ladders,
    xSpeed = 0,
    scale = 2,
    tileSize = 16
    currentLevel = 'level0'

const drawLevel = (data) => {
    console.log(`** Drawing level ${levels[currentLevel].name}`)

    data.forEach((line, j) => {
        const tileWidth = width / line.length

        for (let i = 0; i < line.length; i++) {
            const tileType = line.charAt(i)
            if(tileType === '.') continue

            const tileHeight = height / data.length

            if(tileType === '1')
                new tiles.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')

            if(tileType === 'X')
                new exits.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')

            if(tileType === 'L')
                new ladders.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
        }
    })
}

const loadNewLevel = () => {    
    tiles.removeAll()
    exits.removeAll()

    currentLevel = levels[currentLevel].next

    drawLevel(levels[currentLevel].data)

    elvio.x = levels[currentLevel].startX
    elvio.y = levels[currentLevel].startY
    elvio.vel.x = 0
    elvio.vel.y = 0
}

const setSprites = () => {
    tiles = new Group()
    tiles.img = './assets/Brickwall.png'
    tiles.scale = scale
    
    exits = new Group()
    exits.img = './assets/Exit.png'
    exits.scale = scale

    ladders = new Group()
    ladders.img = './assets/Ladder.png'
    ladders.scale = scale
    ladders.layer = -100

    elvio = new Sprite()
    elvio.img = './assets/ElvioStanding.png'
    elvio.scale = scale
    elvio.width = 16 * scale
    elvio.height = 27 * scale
    elvio.maxSpeed = 2
    elvio.rotationLock = true
}

function setup() {
    new Canvas(640, 480)

    world.gravity.y = 10

    setSprites()
    loadNewLevel()
}

function draw() {
	background(
        levels[currentLevel].background.r,
        levels[currentLevel].background.g,
        levels[currentLevel].background.b,
    )

    if (kb.pressing('left')) {
        elvio.mirror.x = false
        xSpeed = xSpeed - 0.3
    }
    if (kb.pressing('right')) {
        elvio.mirror.x = true
        xSpeed = xSpeed + 0.3
    }
    if (kb.presses('up') && Math.abs(elvio.vel.y) < .2) {
        elvio.vel.y = elvio.vel.y - 5
        elvio.img = './assets/ElvioJump.png'
    }

    if(xSpeed < .1 || xSpeed > .1) {
        elvio.img = './assets/ElvioRuning.png'
    }

    if(xSpeed === 0) {
        elvio.img = './assets/ElvioStanding.png'
    }

    if(elvio.overlap(ladders)) console.log(elvio.overlap(ladders))
    if(exits.collides(elvio)) loadNewLevel()

    xSpeed = Math.abs(xSpeed) < 0.1 ? 0 : xSpeed * 0.9
    elvio.vel.x = xSpeed
}