// var SceneTitle = function (game) {
//     var s = {
//         game: game,
//     }
//     // 注册开始事件
//     game.registerAction('k', function(){
//         var s = Scene(game)
//         game.replaceScene(s)
//     })
//     s.draw = function () {
//         // draw labels 
//         game.context.fillText('按 k 开始游戏', 150, 200)
//     }
//     s.update = function () {
//     }
//     return s
// }

class GuaLable {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        var i  = new this(game, text)
        return i
    }
    draw() {
        this.game.context.fillText(this.text, 150, 200)
    }
    update() {

    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        this.x = 100 
        this.y = 150
        this.numberOfParticles = 20
        this.particles = []
    }
    update() {
        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            // 设置初始化 x, y, vx, vy
            var x = this.x
            var y = this.y
            var vx = randomBetween(-10, 10)
            var vy = randomBetween(-10, 10)
            p.init(x, y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for (var p of this.particles) {
            p.update()
        }
    }
    draw() {
        for (var p of this.particles) {
            log(p)
            p.draw()
        }
    }
}

class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
    }
    // 初始化 x， y 以及 加速度
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.x += this.vx
        this.y += this.vy
    }
}

// 继承父类 GuaScene
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // game.registerAction('k', function () {
        //     var s = Scene(game)
        //     game.replaceScene(s)
        // })
        var lable = GuaLable.new(game, 'hello')
        this.addElement(lable)

        var particle = GuaParticleSystem.new(game)
        this.addElement(particle)       
    }
    // 使用 SceneTitle.new() 替代 new SceneTitle() 使用方式
    // static new(game) {
    //     var i = new this(game)
    //     return i
    // }
    // draw() {
    //     // draw lables
    //     // this.game.context.fillText('按 k 开始游戏', 150, 200)
    //     // 继承父类的 draw(), 如果有 draw（）就会覆盖父类的 draw(),所以要用 super.draw()
    //     super.draw()
    // }
}