var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k == 'p') {
            log('按下了暂停')
            window.paused = !paused
        } else if ('1234567'.includes(k)) {
            // 载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 使用滑条控制速度， input 可以动态监控值
    document.querySelector('#id-input-speed').addEventListener('input', function () {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}
var __main = function () {
    var images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        bullet: 'img/bullet.png',
        // run
        run1: 'img/run-01.png',
        run2: 'img/run-02.png',
        run3: 'img/run-03.png',
        run4: 'img/run-04.png',
        run5: 'img/run-05.png',
        run6: 'img/run-06.png',
        // 闲置
        idle1: 'img/idle-00.png',
        idle2: 'img/idle-01.png',
        idle3: 'img/idle-02.png',
        idle4: 'img/idle-03.png',
    }
    // var score = 0
    // GuaGame 载入,并初始化 fps, images
    // 这里有个回调的问题需要加上function, 并将操作放在其中
    var game = GuaGame.instance(30, images, function(game){
        // var s = Scene.new(game)
        var s = SceneTitle.new(game)
        game.runWithScene(s)
    }) 
    enableDebugMode(game, true)
}
__main()