// 一个 guagame 对象，用来加载画布
var GuaGame = function (fps, images, runCallback) {
    // images 是一个对象，里边是图片的名字
    // 程序会在所有图片载入成功后运行
    var g = {
        // 储存 key 和 function
        actions: {},
        // 储存按键的状态
        keydowns: {},
        // 图片
        images: {}
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
    window.fps = 30
    var runloop = function() {
        // log(window.fps)
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
        // next run loop
        // 递归调用 
        setTimeout(function () {
            runloop()
        }, 1000 / window.fps)
    }
    var loads = []
    // 预先载入所有图片
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            // 存入 g.image 中
            g.images[name] = img
            // 所有图片载入后执行，调用 run
            loads.push(1)
            log('载入图片', loads.length, names.length)
            if (loads.length == names.length) {
                log('111111111', g.images)
                g.run()
            }
        }
    }
    g.imageByName= function(name) {
        log('load by image', g.images)
        var img = g.images[name]
        log('3333', img)
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.run = function() {
        // 第一次运行需要加上 runCallback
        runCallback(g)
        // 开始运行程序
        setTimeout(function () {
            runloop()
        }, 1000 / fps)
        return g
    }
}
