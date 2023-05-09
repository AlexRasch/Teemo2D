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
        '                                                                   ',
        '                                                                   ',
        '                                                                   ',
        '                                                                   ',
        '                                                                   ',
        '                                                                   ',
        '                                                                   ',
        '                       %                                           ',
        '                           ==                                      ',
        '                    =========                                      ',
        '                                                                -+   ',
        'P        $    $      ^      ^      $           $       #        ()   ',
        '========================================  ===========================',
        '                                       =  =                        ',
        '                                       ====                        ',

    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('coin')],
        '%': [sprite('surprise')],

        '^': [sprite('evil-shroom'), solid(), 'coin-surprise'],
        '#': [sprite('mushroom'), solid()],

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
        sprite('mario'), solid(), pos(20, 40), body(), origin('bot')
    ])

    // Movment
    const PlayerMoveSpeed = 100;
    const PlayerJump = 400;


    keyDown('left', () => {
        player.move(-PlayerMoveSpeed, 0)
    })

    keyDown('right', () => {
        player.move(PlayerMoveSpeed, 0)
    })

    keyPress('space', () => {
        if(player.grounded()){
            player.jump(PlayerJump)
        }
    })

    // Buffs
    function PlayBuffBig(){
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
                timer = 0
                bBig = false
            }
        }
    }

})


start("game")