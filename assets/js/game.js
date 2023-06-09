import maps from './maps.js';
import levelCfg from './levelConfig.js';


kaboom({
    global: true,
    fullscreen: false,
    canvas: document.querySelector("#gameCanvas"),
    scale: 1.2,
    debug: true,
    clearColor: [0, 0, 0, 1],
})

loadRoot('assets/img/')
loadSprite('brick', 'brick.png')
loadSprite('block', 'block.png')
loadSprite('coin', 'coin.png')
loadSprite('evil-shroom', 'evil-shroom.png')
loadSprite('mushroom', 'mushroom.png')

loadSprite('tristana', 'tristana.png')

// Player
loadSprite('teemoR', 'teemoR.png')
loadSprite('teemoL', 'teemoL.png')

loadSprite('surprise', 'surprise.png')
loadSprite('unboxed', 'unboxed.png')
// Pipe
loadSprite('pipe-top-left', 'pipe-top-left.png')
loadSprite('pipe-top-right', 'pipe-top-right.png')
loadSprite('pipe-bottom-left', 'pipe-bottom-left.png')
loadSprite('pipe-bottom-right', 'pipe-bottom-right.png')

scene("game", ({level, score}) => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const gameLevel = addLevel(
            maps[level], 
            levelCfg(sprite, solid, body, scale)
        );

    let player = add([
        sprite('teemoR'),
        solid(),
        pos(20, 40),
        body(),
        PlayerBuffBig(),
        origin('bot')
    ])

    // UI
    const levelLable = add([
        text('Level: ' +  parseInt(level + 1)),
        pos(160, -200),
        layer('ui')
    ])

    const scoreLable = add([
        text('Score:' +  parseInt(score)),
        pos(240, -200),
        layer('ui'),
        {
            value: score,
        }
    ])

    // Events
    action('mushroom', (m) => {
        m.move(10, 0)
    })

    action('dangerous', (d) =>{
        d.move(-10,0)
    })

    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(6)
    })

    player.collides('coin', (c) => {
        destroy(c)
        scoreLable.value++
        scoreLable.text = 'Score:' + scoreLable.value
    })

    player.collides('pipe', () => {
        keyPress('down', () => {
            go('game',{
                level: (level + 1),
                score: scoreLable.value
            } )
        })
    })

    player.collides('tristana', () => {
        go('victory',{
            score: scoreLable.value
        } )
    })

    player.collides('dangerous', (d) => {
        if(bJumping){
            destroy(d)
        }else{
            go('lose', {score: scoreLable.value})

        }
    })

    player.action(() => {
        camPos(player.pos)
        levelLable.pos = player.pos.add(160, -230);
        scoreLable.pos = player.pos.add(240, -230);
        if(player.pos.y >= PlayerFallDeath){
            go('lose', {score: scoreLable.value})
        }
    })

    player.on("headbump", (obj) => {
        if (obj.is('coin-surprise')){
            gameLevel.spawn('$', obj.gridPos.sub(0, 1))
            destroy(obj)
        }
        if (obj.is('mushroom-surprise')){
            gameLevel.spawn('#', obj.gridPos.sub(0, 1))
            destroy(obj)
        }
    })

    // Movment
    let bJumping = true;
    const PlayerFallDeath = 600;
    const PlayerDefaultMoveSpeed = 100;
    const PlayerDefaultJump = 400;    
    let PlayerCurrentJump = 400;

    //  Part of buffs
    const PlayerBigJump = 500;


    keyDown('left', () => {
        player.move(-PlayerDefaultMoveSpeed, 0)
        player.changeSprite("teemoL");
    })

    keyDown('right', () => {
        player.move(PlayerDefaultMoveSpeed, 0)
        player.changeSprite("teemoR");

    })

    player.action(() => {
        if(player.grounded()){
            bJumping = false;
        }
    }) 

    keyPress('space', () => {
        if(player.grounded()){
            bJumping = true;
            player.jump(PlayerCurrentJump)
        }
    })

    // Game controll
    keyPress('r', () => {
        console.log('HitMe');
        
    })

    keyPress('p', () => {

    })

    // Buffs
    function PlayerBuffBig(){
        let timer = 0;
        let bBig = false;
        return {
            update(){
                if(bBig){
                    timer -= dt()
                    if(timer <= 0){
                        this.smallify()
                    }
                }
            },
            bBig(){
                return bBig
            },
            smallify() {
                this.scale = vec2(1)
                PlayerCurrentJump = PlayerDefaultJump;
                timer = 0
                bBig = false
            },
            biggify(time){
                this.scale = vec2(2)
                PlayerCurrentJump = PlayerBigJump;
                timer = time
                bBig = true
            }
        }
    }

})

// Scenes
scene('lose', ({score}) => {
    add([text('Game Over', 32), origin('center'), pos(width()/2, height()/3)])
    add([text('Score:' + score, 32), origin('center'), pos(width()/2, height()/2)])
})
scene('victory', ({score}) => {
    add([text('Victory', 32), origin('center'), pos(width()/2, height()/3)])
    add([text('Score:' + score, 32), origin('center'), pos(width()/2, height()/2)])
})


start("game", {
    level: 0,
    score: 0
    })