kaboom({
    global: true,
    fullscreen: true,
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

loadSprite('mario', 'mario.png')

loadSprite('surprise', 'surprise.png')
loadSprite('unboxed', 'unboxed.png')
// Pipe
loadSprite('pipe-top-left', 'pipe-top-left.png')
loadSprite('pipe-top-right', 'pipe-top-right.png')
loadSprite('pipe-bottom-left', 'pipe-bottom-left.png')
loadSprite('pipe-bottom-right', 'pipe-bottom-right.png')

scene("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const map = [
        '                                                                    ',
        '                                                                    ',
        '                                                                    ',
        '                                                                    ',
        '                                                                    ',
        '                                                                    ',
        '                                                                    ',
        '                       *                                            ',
        '                           ==                                       ',
        '       %            =========                                       ',
        '                                                               -+   ',
        'P            $      ^      ^      $           $       #        ()   ',
        '=======================================  ===========================',
        '                                      =  =                          ',
        '                                      ====                          ',

    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('coin'), 'coin'],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],

        '^': [sprite('evil-shroom'), solid(), 'coin-surprise'],
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],

        '-': [sprite('pipe-top-left'), solid(), scale(0.5)],
        '+': [sprite('pipe-top-right'), solid(), scale(0.5)],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
    }

    const gameLevel = addLevel(map,levelCfg)

    const scoreLable = add([
        text('score'),
        pos(30,6),
        layer('ui'),
        {
            value: 'score',
        }
    ])


    add([text('Level ' + 'test', pos(4,6))])

    const player = add([
        sprite('mario'),
        solid(),
        pos(20, 40),
        body(),
        PlayerBuffBig(),
        origin('bot')
    ])

    // Events

    action('mushroom', (m) => {
        m.move(10, 0)
    })

    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(6)
    })

    player.collides('coin', (c) => {
        destroy(c)
        scoreLable.value++
        scoreLable.text = scoreLable.value
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
    const PlayerDefaultMoveSpeed = 100;
    const PlayerDefaultJump = 400;
    let PlayerCurrentJump = 400;
    //  Part of buffs
    const PlayerBigJump = 500;


    keyDown('left', () => {
        player.move(-PlayerDefaultMoveSpeed, 0)
    })

    keyDown('right', () => {
        player.move(PlayerDefaultMoveSpeed, 0)
    })

    keyPress('space', () => {
        if(player.grounded()){
            player.jump(PlayerCurrentJump)
        }
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


start("game")