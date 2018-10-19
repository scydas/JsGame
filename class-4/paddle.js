// 一个 Paddle 对象
var Paddle = function (game) {
    // var image = imageFromPath('paddle.png')
    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 5,
    // }
    var o = game.imageByName('paddle')
    o.x = 100
    o.y = 250
    o.speed = 15
    // paddle 移动逻辑
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.w) {
            x = 400 - o.w
        }
        o.x = x
    }
    o.moveLeft = function () {
        o.move(o.x - o.speed)
    }
    o.moveRight = function () {
        o.move(o.x + o.speed)
    }
    // paddle 和 ball 的碰撞,碰撞了返回 true
    var aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    o.collide = function (ball) {
        // if (ball.y + ball.image.height > o.y) {
        //     if (ball.x > o.x && ball.x < o.x + o.image.width) {
        //         log('球和挡板相撞了')
        //         return true
        //     }
        // }
        // return false
        var a = o
        var b = ball
        // if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
        //     if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
        //         return true
        //     }
        // }
        // return false
        // 中点座标
        var aX = a.x + a.w / 2
        var aY = a.y + a.h / 2
        var bX = b.x + b.w / 2
        var bY = b.y + b.h / 2
        // log('paddle', a.x, a.y,)
        log('ball', b.x, b.y)
        // log(aX - bX, aY - bY)
        // log(a.w + b.w, a.h + b.h)
        // log(Math.abs(aX - bX) )
        // log(Math.abs(aY - bY) )
        // log('aaaa', aY, bY)
        if (Math.abs(aX - bX) <= (a.w + b.w) / 2 && Math.abs(aY - bY) <= (a.h + b.h) / 2) {
            log('球和挡板相撞了')
            return true
        }
        return false
    }
    return o
} 
