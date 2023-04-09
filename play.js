let player,
    walls,
    exits,
    ladders,
    crates,
    floors,
    currentLevel = 'level0'

const MAX_SPEED = 2,
    TILE_SIZE = 16,
    CRATE_SIZE = 14,
    TILE_WIDTH = 16,
    TILE_HEIGHT = 15,
    CRATE_SCALE = 0.9

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
                    new walls.Sprite(i * TILE_WIDTH + TILE_WIDTH / 2, j * TILE_HEIGHT + TILE_HEIGHT / 2, TILE_SIZE, TILE_SIZE, 'static')
                    break

                case 'L':
                    new ladders.Sprite(i * TILE_WIDTH + TILE_WIDTH / 2, j * TILE_HEIGHT + TILE_HEIGHT / 2, TILE_SIZE, TILE_SIZE, 'static')
                    break

                case 'B':
                    new crates.Sprite(i * TILE_WIDTH + TILE_WIDTH / 2, j * TILE_HEIGHT + TILE_HEIGHT / 2, CRATE_SIZE, CRATE_SIZE, 'dynamic')
                    break

                case 'F':
                    new floors.Sprite(i * TILE_WIDTH + TILE_WIDTH / 2, j * TILE_HEIGHT + TILE_HEIGHT / 2, TILE_SIZE, TILE_SIZE, 'static')
                    break

                default:
                    break;
            }
        }
    })

    const exitPoints = levels[currentLevel].exits
    exitPoints.forEach((exit, i) => {
        const newExit = new exits.Sprite(exit.x * TILE_WIDTH + TILE_WIDTH / 2, exit.y * TILE_HEIGHT + TILE_HEIGHT / 2, TILE_WIDTH, TILE_HEIGHT, 'static')
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
    walls.friction = 0
    
    exits = new Group()
    exits.img = './assets/Exit.png'

    ladders = new Group()
    ladders.img = './assets/Ladder.png'
    ladders.layer = -100

    floors = new Group()
    floors.img = './assets/Floor.png'

    crates = new Group()
    crates.img = './assets/Crate.png'
    // crates.debug = true

    player = new Sprite()
    player.img = './assets/ElvioStanding.png'
    player.width = 14
    player.height = 24
    player.rotationLock = true
    player.update = () => {
        if(!player.overlapping(ladders)) return
        player.vel.y = -0.17
    }

    player.overlap(ladders)
    crates.overlap(ladders)

    exits.collides(player, (exit) => {
        loadNewLevel(exit.exitId)
    })
}

function setup() {
    new Canvas(320, 240, "pixelated x2")

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
        player.vel.x = player.vel.x < -MAX_SPEED ? -MAX_SPEED : player.vel.x - 0.3
    }
    if (kb.pressing('right')) {
        player.mirror.x = true
        player.vel.x = player.vel.x > MAX_SPEED ? MAX_SPEED : player.vel.x + 0.3
    }

    if (kb.presses('up') && canJump()) {
        player.vel.y = player.vel.y - 4
        player.img = './assets/ElvioJump.png'
    }

    if (kb.presses('up') && player.overlapping(ladders)) {
        player.img = './assets/ElvioJump.png'
        player.y = player.y - 10
    }

    if (kb.presses('down') && player.overlapping(ladders)) {
        player.img = './assets/ElvioJump.png'
        player.y = player.y + 10
    }

    if(player.vel.x < 0.1 || player.vel.x > .1) {
        player.img = './assets/ElvioRuning.png'
    }

    if(player.vel.x === 0) {
        player.img = './assets/ElvioStanding.png'
    }

    player.vel.x = Math.abs(player.vel.x) < 0.1 ? 0 : player.vel.x * 0.9
}