let elvio,
    walls,
    exits,
    ladders,
    crates,
    xSpeed = 0,
    scale = 2,
    scale2 = 1.8,
    wallsize = 16,
    wallsize2 = 14
    currentLevel = 'level0'

const drawLevel = (data) => {
    console.log(`** Drawing level ${levels[currentLevel].name}`)

    data.forEach((line, j) => {
        const tileWidth = width / line.length

        for (let i = 0; i < line.length; i++) {
            const tileType = line.charAt(i)
            if(tileType === '.') continue

            const tileHeight = height / data.length

            if(tileType === 'W')
                new walls.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, wallsize, wallsize, 'static')

            if(tileType === 'X')
                new exits.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, wallsize, wallsize, 'static')

            if(tileType === 'L')
                new ladders.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, wallsize, wallsize, 'static')

            if(tileType === 'B')
                new crates.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, wallsize2, wallsize2, 'dynamic')
        }
    })
}

const loadNewLevel = () => {    
    walls.removeAll()
    exits.removeAll()
    ladders.removeAll()
    crates.removeAll()

    currentLevel = levels[currentLevel].next

    drawLevel(levels[currentLevel].data)

    elvio.x = levels[currentLevel].startX
    elvio.y = levels[currentLevel].startY
    elvio.vel.x = 0
    elvio.vel.y = 0
}

const setSprites = () => {
    walls = new Group()
    walls.img = './assets/Brickwall.png'
    walls.scale = scale
    
    exits = new Group()
    exits.img = './assets/Exit.png'
    exits.scale = scale

    ladders = new Group()
    ladders.img = './assets/Ladder.png'
    ladders.scale = scale
    ladders.layer = -100

    crates = new Group()
    crates.img = './assets/Crate.png'
    crates.scale = scale2
    crates.mass = 10
    crates.friction = 5
    crates.overlap(ladders)

    elvio = new Sprite()
    elvio.img = './assets/ElvioStanding.png'
    elvio.scale = scale2
    elvio.width = 16 * scale2
    elvio.height = 27 * scale2
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

    if (kb.presses('up') && (elvio.overlapping(ladders) || Math.abs(elvio.vel.y) < .2)) {
        elvio.vel.y = elvio.vel.y - 5
        elvio.img = './assets/ElvioJump.png'
    }

    if(xSpeed < .1 || xSpeed > .1) {
        elvio.img = './assets/ElvioRuning.png'
    }

    if(xSpeed === 0) {
        elvio.img = './assets/ElvioStanding.png'
    }

    if(elvio.overlapping(ladders)) null
    if(exits.collides(elvio)) loadNewLevel()

    xSpeed = Math.abs(xSpeed) < 0.1 ? 0 : xSpeed * 0.9
    elvio.vel.x = xSpeed
}