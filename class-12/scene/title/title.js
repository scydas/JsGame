class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        // 管子竖向间距
        this.pipeSpace = 150
        // 管子横向间距
        this.pipeSpaceX = 200
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * 200
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game) 
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-280, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    update() {
        for (var p of this.pipes) {
            p.x -= 5
            if (p.x < -100) {
                log(p.x)
                p.x += this.pipeSpaceX * this.columsOfPipe
                log(p.x)
            }
        }
    }
    draw() {
        // this.game.drawImage(this)
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()
            // 图片角度旋转
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }
}
// 继承父类 GuaScene
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var lable = GuaLable.new(game, 'hello')
        this.addElement(lable)

        // cavs
        var cave = GuaImage.new(game, 'cave')
        this.addElement(cave)

        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 3; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 336
            g.y = 450
            this.addElement(g) 
            this.grounds.push(g)
        }
        this.skipCount = 4

        var bird = GuaAnimation.new(game)
        bird.x = 100
        bird.y = 200  
        this.bird = bird 
        this.addElement(bird)

        this.setupInputs()
    }
    update() {
        super.update()
        // 循环让地面移动
        // 当 skipcount == 0 时，反向移动 15，正常情况 -5
        this.skipCount --
        this.offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            this.offset = 15
        }
        for (var i = 0; i < 3; i++) {
            var g = this.grounds[i]
            g.x += this.offset
        }
    }
    setupInputs() {
        var self = this
        var b = this.bird
        // 按键监听只监听了按下但是没监听松开，要在 gua_game.js 改
        self.game.registerAction('a', function(keyStatus) {
            // 这样是错误的，在回调中不能使用 this
            // this.w.move(2)
            b.move(-2, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(2, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus) {
            b.jump()
        })
    }
}