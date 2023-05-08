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
loadSprite('mario', 'mario.png')
loadSprite('mushroom', 'mushroom.png')
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
        'P        $    $      ^      ^      $           $                ()   ',
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

        'P': [sprite('mario'), solid()],
        '^': [sprite('evil-shroom'), solid(), 'coin-surprise'],

        '-': [sprite('pipe-top-left'), solid(), scale(0.5)],
        '+': [sprite('pipe-top-right'), solid(), scale(0.5)],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
    }

    const gameLevel = addLevel(map,levelCfg)

})


start("game")