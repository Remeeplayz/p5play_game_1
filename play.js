let player,
    walls,
    exits,
    ladders,
    crates,
    floors,
    xSpeed = 0,
    scale = 2,
    smallScale = 1.8,
    tileSize = 16,
    smallTileSize = 14,
    currentLevel = 'level0'

const maxSpeed = 2
const tileWidth = 32, tileHeight = 32

const drawLevel = () => {
    console.log(`** Drawing level ${levels[currentLevel].name}`)
    window.document.getElementById('current-level').innerHTML = levels[currentLevel].name

    const data = levels[currentLevel].data
    data.forEach((line, j) => {
        for (let i = 0; i < line.length; i++) {
            const tileType = line.charAt(i)

            switch (tileType) {
                case '.':
                    continue

                case 'W':
                    new walls.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
                    break

                case 'L':
                    new ladders.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
                    break

                case 'B':
                    new crates.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'dynamic')
                    break

                case 'F':
                    new floors.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
                    break

                default:
                    break;
            }
        }
    })

    const exitPoints = levels[currentLevel].exits
    exitPoints.forEach((exit, i) => {
        const newExit = new exits.Sprite(exit.x * tileWidth + tileWidth / 2, exit.y * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
        newExit.exitId = i
    })
}

const canJump = () => {
    return (!!player.colliding(floors) || !!player.colliding(crates)) && !player.overlapping(ladders)
}

const loadNewLevel = (exit) => {    
    walls.removeAll()
    exits.removeAll()
    ladders.removeAll()
    crates.removeAll()
    floors.removeAll()

    currentLevel = levels[currentLevel].exits[exit].next

    drawLevel()

    player.x = levels[currentLevel].startX
    player.y = levels[currentLevel].startY
    player.vel.x = 0
    player.vel.y = 0
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
    crates.mass = 1
    crates.friction = 1

    player = new Sprite()
    player.img = './assets/ElvioStanding.png'
    player.scale = smallScale
    player.width = 16 * smallScale
    player.height = 27 * smallScale
    player.maxSpeed = 2
    player.rotationLock = true

    player.overlap(ladders)
    crates.overlap(ladders)

    exits.collides(player, (exit) => {
        loadNewLevel(exit.exitId)
    })
}

function setup() {
    new Canvas(640, 480)

    world.gravity.y = 10

    setSprites()
    loadNewLevel(0)
}

function draw() {
	background(
        levels[currentLevel].background.r,
        levels[currentLevel].background.g,
        levels[currentLevel].background.b,
    )

    if (kb.pressing('left')) {
        player.mirror.x = false
        player.vel.x = player.vel.x < -maxSpeed ? -maxSpeed : player.vel.x - 0.3
    }
    if (kb.pressing('right')) {
        player.mirror.x = true
        player.vel.x = player.vel.x > maxSpeed ? maxSpeed : player.vel.x + 0.3
    }

    if (kb.presses('up') && canJump()) {
        player.vel.y = player.vel.y - 5
        player.img = './assets/ElvioJump.png'
    }

    if (kb.presses('up') && player.overlapping(ladders)) {
        player.vel.y = player.vel.y - 5
        player.img = './assets/ElvioJump.png'
    }

    if(player.vel.x < 0.1 || player.vel.x > .1) {
        player.img = './assets/ElvioRuning.png'
    }

    if(player.vel.x === 0) {
        player.img = './assets/ElvioStanding.png'
    }
}