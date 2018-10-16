var Block = function (position) {
    // position 是 [0, 0] 格式
    var p = position
    var image = imageFromPath('block.png')
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 40,
        h: 20,
        alive: true, // 砖块是否显示，默认是显示的
        lifes: p[2] || 1  // 如果 p[2] 存在，不存在就是 1
    }
    // 砖块碰撞，不在显示
    o.kill = function () {
        o.lifes --
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    // 检测砖块和球是否已经碰撞了
    o.collide = function (ball) {
        var b = ball
        // if (b.y > o.y && b.y < o.y + o.image.height) {
        //     if (b.x > o.x && b.x < o.x + o.image.width) {
        //         log('球和砖块相撞了')
        //         return ture
        //     }
        // }
        // return false

        // 判断相撞，要有两次 o in b， b in o，并且砖块 alive = true
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}
