const levelCfg = (sprite, solid, body, scale) => {
    return {
        width: 20,
        height: 20,
        '=': () => [sprite('block'), solid()],
        '$': () => [sprite('coin'), 'coin'],
        '%': () => [sprite('surprise'), solid(), 'coin-surprise'],
        '*': () => [sprite('surprise'), solid(), 'mushroom-surprise'],
        '^': () => [sprite('evil-shroom'), solid(), 'dangerous'],
        '#': () => [sprite('mushroom'), solid(), 'mushroom', body()],
        'T': () => [sprite('tristana'), solid(), 'tristana', body()],
        '-': () => [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
        '+': () => [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
        '(': () => [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': () => [sprite('pipe-bottom-right'), solid(), scale(0.5)],
    }
}

export default levelCfg;