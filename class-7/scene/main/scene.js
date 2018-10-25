var Scene = function(game) {
    var s = {
        game: game,

    }
    // 初始化
    var score = 0
    // paddle 载入
    var paddle = Paddle(game)
    // ball 载入
    var ball = Ball(game)
    // block 载入
    blocks = loadLevel(game, 1)
    // events 按键事件
    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        ball.fire()
    })
    s.draw = function() {
        // 添加背景
        game.context.fillStyle = '#555'
        game.context.fillRect(0, 0, 400, 300)
        // 调用 GuaGame 的 drawImage 来 draw 画图
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw block
        // if (block.alive) {
        //     game.drawImage(block)
        // }

        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels 
        game.context.fillText('分数: ' + score, 10, 290)
    }
    s.update = function() {
        // 暂停功能
        if (window.paused) {
                return
            }
        // 球运动
        ball.move()
        // 判断游戏结束，跳转到结束画面
        if (ball.y > paddle.y) {
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }
        // ball 和 paddle 碰撞
        if (paddle.collide(ball)) {
            // todo, ball 的反弹函数
            ball.fjtj()
        }
        // ball 和 blocks 相撞了
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                log('球和砖块相撞了')
                // 相撞了砖块 alive = false
                block.kill()
                // 反弹函数
                ball.fjtj()
                // 更新分数
                score += 100
            }
        }
        var enanableDrag = false
        game.canvas.addEventListener('mousedown', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, 'down')
            // 检查是否点中了 ball
            if (ball.hasPoint(x, y)) {
                // 设置拖拽状态
                enanableDrag = true
            }
        })
        game.canvas.addEventListener('mousemove', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            // log(x, y, 'move')
            if (enanableDrag) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, 'up')
            enanableDrag = false
        })
    }
    return s
}