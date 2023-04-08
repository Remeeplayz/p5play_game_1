let elvio,
    walls,
    exits,
    ladders,
    crates,
    floors,
    xSpeed = 0,
    scale = 2,
    smallScale = 1.8,
    tileSize = 16,
    smallTileSize = 14
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
                new walls.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')

            if(tileType === 'X')
                new exits.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')

            if(tileType === 'L')
                new ladders.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')

            if(tileType === 'B')
                new crates.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, smallTileSize, smallTileSize, 'dynamic')
        
            if(tileType === 'F')
                new floors.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
            }
    })
}

const canJump = () => {
    return (!!elvio.colliding(floors) || !!elvio.colliding(crates)) && !elvio.overlapping(ladders)
}

const loadNewLevel = () => {    
    walls.removeAll()
    exits.removeAll()
    ladders.removeAll()
    crates.removeAll()
    floors.removeAll()

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
    walls.friction = 0
    
    exits = new Group()
    exits.img = './assets/Exit.png'
    exits.scale = scale

    ladders = new Group()
    ladders.img = './assets/Ladder.png'
    ladders.scale = scale
    ladders.layer = -100

    floors = new Group()
    floors.img = './assets/Floor.png'
    floors.scale = scale

    crates = new Group()
    crates.img = './assets/Crate.png'
    crates.scale = smallScale
    crates.mass = 10
    crates.friction = 5

    elvio = new Sprite()
    elvio.img = './assets/ElvioStanding.png'
    elvio.scale = smallScale
    elvio.width = 16 * smallScale
    elvio.height = 27 * smallScale
    elvio.maxSpeed = 2
    elvio.rotationLock = true

    elvio.overlap(ladders)
    crates.overlap(ladders)
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

    if (kb.presses('up') && canJump()) {
        elvio.vel.y = elvio.vel.y - 5
        elvio.img = './assets/ElvioJump.png'
    }

    if (kb.presses('up') && elvio.overlapping(ladders)) {
        elvio.vel.y = elvio.vel.y - 5
        elvio.img = './assets/ElvioJump.png'
    }

    if(xSpeed < .1 || xSpeed > .1) {
        elvio.img = './assets/ElvioRuning.png'
    }

    if(xSpeed === 0) {
        elvio.img = './assets/ElvioStanding.png'
    }

    if(exits.collides(elvio)) loadNewLevel()

    xSpeed = Math.abs(xSpeed) < 0.1 ? 0 : xSpeed * 0.9
    elvio.vel.x = xSpeed
}