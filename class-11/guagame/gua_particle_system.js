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
        // 设置存在时间
        this.duration = 30

        this.x = 100
        this.y = 150
        this.numberOfParticles = 40
        this.particles = []
    }
    update() {
        this.duration--
        // 存在时间为 0 时，就在场景中删除自己，还有一种做法是在 draw() 中
        if (this.duration < 0) {
            // log(this.duration)
            this.scene.deleteElement(this)
        }
        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            // 设置初始化 x, y, vx, vy
            var x = this.x
            var y = this.y
            var s = 2
            var vx = randomBetween(-2, 2)
            var vy = randomBetween(-2, 2)
            p.init(x, y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for (var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            // 只是让他不显示，而没有删除它
            return
        }
        for (var p of this.particles) {
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
        // 火花的生命值
        this.life = 10
    }
    // 初始化 x， y 以及 加速度
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        // 加速度
        var a = 0.02
        this.vx += a * this.vx
        this.vy += a * this.vy
    }
}
