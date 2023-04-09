let player,
    walls,
    exits,
    ladders,
    crates,
    floors,
    back,
    xSpeed = 0,
    scale = 2,
    smallScale = 1.8,
    tileSize = 16,
    smallTileSize = 14,
    currentLevel = 'level0'

const maxSpeed = 2

const drawLevel = (data) => {
    console.log(`** Drawing level ${levels[currentLevel].name}`)
    window.document.getElementById('current-level').innerHTML = levels[currentLevel].name

    data.forEach((line, j) => {
        const tileWidth = width / line.length

        for (let i = 0; i < line.length; i++) {
            const tileType = line.charAt(i)
            const tileHeight = height / data.length

            switch (tileType) {
                case '.':
                    continue

                case 'W':
                    new walls.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
                    break

                case 'P':
                    new back.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
                    break

                case 'X':
                    new exits.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
                    break

                case 'L':
                    new ladders.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
                    break

                case 'B':
                    new crates.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
                    break

                case 'F':
                    new floors.Sprite(i * tileWidth + tileWidth / 2, j * tileHeight + tileHeight / 2, tileSize, tileSize, 'static')
                    break

            
                default:
                    break;
            }
        }
    })
}

const canJump = () => {
    return (!!player.colliding(floors) || !!player.colliding(crates)) && !player.overlapping(ladders)
}

const loadNewLevel = () => {    
    walls.removeAll()
    exits.removeAll()
    ladders.removeAll()
    crates.removeAll()
    floors.removeAll()
    back.removeAll()

    currentLevel = levels[currentLevel].next

    drawLevel(levels[currentLevel].data)

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
    
    back = new Group()
    back.img = './assets/Prev.png'
    back.scale = scale

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

    player = new Sprite()
    player.img = './assets/ElvioStanding.png'
    player.scale = smallScale
    player.width = 16 * smallScale
    player.height = 27 * smallScale
    player.maxSpeed = 2
    player.rotationLock = true

    player.overlap(ladders)
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

    if(exits.collides(player)) loadNewLevel()
    if(back.collides(player)) loadNewLevel()
}