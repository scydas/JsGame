// 一个 guagame 对象，用来加载画布
var GuaGame = function (fps) {
    var g = {
        // 储存 key 和 function
        actions: {},
        // 储存按键的状态
        keydowns: {},
    }
    // 拿到 canvas  
    var canvas = document.querySelector('#id-canvas')
    // 在 canvas 上指定 2d 图
    var context = canvas.getContext('2d')

    g.canvas = canvas
    g.context = context

    // draw 
    g.drawImage = function (guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }

    // event 按键状态,在 keydowns 储存
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false
    })
    // 注册时间，按了那个 key 要执行什么函数, 在 setInterval 中调用
    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }
    // timer
    setInterval(function () {
        // events  
        var actions = Object.keys(g.actions)  // 获取到所有的 actions
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键按下，调用注册的 action 的 callback
                g.actions[key]()
            }
        }
        // update 更新
        g.update()
        // clear 清除画板
        context.clearRect(0, 0, canvas.width, canvas.height)
        // drew 画图
        g.draw()
    }, 1000 / fps)
    return g
}
