const config = {
    player_speed: 10,
    cloud_speed: 2,
    enemy_speed: 5,
    bullet_speed: 5,
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = config.player_speed
        this.cooldown = 0
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown --
        }
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = 10
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
        // var x = this.x + this.w / 2
        // var y = this.y
        // var b = Bullet.new(this.game)
        // b.x = x 
        // b.y = y
        // this.scene.addElement(b)
    }
}
// 随机取整数
const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()

    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = randomBetween(0, -250)
    }
    update() {
        this.y += config.enemy_speed
        if (this.y > 600) {
            this.setup()
        } 
    }
    moveDown() {

    }
}

class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()

    }
    setup() {
        this.speed = config.cloud_speed
        this.x = randomBetween(0, 150)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += config.cloud_speed
        if (this.y > 400) {
            this.setup()
        }
    }
}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()

    }
    setup() {
        this.speed = 10
    }
    update() {
        this.y -= this.speed
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
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
        // this.player = GuaImage.new(this.game, 'player')
        // this.player.x = 100
        // this.player.y = 200
        // this.cloud = GuaImage.new(this.game, 'cloud')
        this.cloud = Cloud.new(this.game, 'cloud')
        this.numberOfEnemies = 10
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
        this.player = Player.new(this.game)
        this.player.x = 100
        this.player.y = 200
        // 进一步提取
        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        // 添加敌人
        this.addElements()
    }
    setupInputs() {
        var g = this.game
        var s = this

        // 这里只能这样写, 注释的不能运行
        // this.game.registerAction('a', function () {
        //     this.player.moveLeft()
        // })
        g.registerAction('a', function () {
            s.player.moveLeft()
        })
        g.registerAction('d', function () {
            s.player.moveRight()
        })
        g.registerAction('w', function () {
            s.player.moveUp()
        })
        g.registerAction('s', function () {
            s.player.moveDown()
        })
        g.registerAction('f', function () {
            s.player.fire()
        })
    }
    addElements() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        // 保存es
        this.enemies = es
    }
    // draw() {
    //     // draw lables
    //     // this.game.context.fillText('按 k 开始游戏', 150, 200)
    //     this.game.drawImage(this.bg)
    //     this.game.drawImage(this.player)
    // }
    update() {
        // super 继承父类的 updateœ
        super.update()
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