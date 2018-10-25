class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        // this.bg = GuaImage.new(game, 'sky')
        // this.player = GuaImage.new(game, 'player')
        // this.player.x = 100
        // this.player.y = 200
        // game.registerAction('k', function () {
        //     var s = Scene(game)
        //     game.replaceScene(s)
        // })
    }
    setup() {
        this.bg = GuaImage.new(this.game, 'sky')
        this.player = GuaImage.new(this.game, 'player')
        this.player.x = 100
        this.player.y = 200
        this.cloud = GuaImage.new(this.game, 'cloud')

        // event
        // game.registerAction('a', function () {
        //     paddle.moveLeft()
        // })
        // game.registerAction('d', function () {
        //     paddle.moveRight()
        // })
        // game.registerAction('f', function () {
        //     ball.fire()
        // })

        // 将每个场景的 draw() 提取出来，不需要每个场景都调用，而是自动调用，
        // 可以在父类 GuaScene 中的 draw() 做，也可以在 gua_game 的 draw() 中做
        // this.elements = []
        // this.elements.push(this.bg)
        // this.elements.push(this.player)

        // 进一步提取
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)
    }
    // draw() {
    //     // draw lables
    //     // this.game.context.fillText('按 k 开始游戏', 150, 200)
    //     this.game.drawImage(this.bg)
    //     this.game.drawImage(this.player)
    // }
    update() {
        this.cloud.y += 1
    }
}

// var Scene = function(game) {
//     var s = {
//         game: game,

//     }
//     // 初始化
//     var score = 0
//     // paddle 载入
//     var paddle = Paddle(game)
//     // ball 载入
//     var ball = Ball(game)
//     // block 载入
//     blocks = loadLevel(game, 1)
//     // events 按键事件
//     game.registerAction('a', function () {
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function () {
//         paddle.moveRight()
//     })
//     game.registerAction('f', function () {
//         ball.fire()
//     })
//     s.draw = function() {
//         // 添加背景
//         game.context.fillStyle = '#555'
//         game.context.fillRect(0, 0, 400, 300)
//         // 调用 GuaGame 的 drawImage 来 draw 画图
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw block
//         // if (block.alive) {
//         //     game.drawImage(block)
//         // }

//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels 
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         // 暂停功能
//         if (window.paused) {
//                 return
//             }
//         // 球运动
//         ball.move()
//         // 判断游戏结束，跳转到结束画面
//         if (ball.y > paddle.y) {
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // ball 和 paddle 碰撞
//         if (paddle.collide(ball)) {
//             // todo, ball 的反弹函数
//             ball.fjtj()
//         }
//         // ball 和 blocks 相撞了
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 log('球和砖块相撞了')
//                 // 相撞了砖块 alive = false
//                 block.kill()
//                 // 反弹函数
//                 ball.fjtj()
//                 // 更新分数
//                 score += 100
//             }
//         }
//         var enanableDrag = false
//         game.canvas.addEventListener('mousedown', function (event) {
//             var x = event.offsetX
//             var y = event.offsetY
//             log(x, y, 'down')
//             // 检查是否点中了 ball
//             if (ball.hasPoint(x, y)) {
//                 // 设置拖拽状态
//                 enanableDrag = true
//             }
//         })
//         game.canvas.addEventListener('mousemove', function (event) {
//             var x = event.offsetX
//             var y = event.offsetY
//             // log(x, y, 'move')
//             if (enanableDrag) {
//                 ball.x = x
//                 ball.y = y
//             }
//         })
//         game.canvas.addEventListener('mouseup', function (event) {
//             var x = event.offsetX
//             var y = event.offsetY
//             log(x, y, 'up')
//             enanableDrag = false
//         })
//     }
//     return s
// }