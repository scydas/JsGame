class GuaAnimation {
    constructor(game) {
        this.game = game 
        // 为了省事，在这里 hard code 一套动画
        this.frames = []
        for (var i = 1; i < 7; i++) {
            var name = `run${i}`
            var t = game.textureByName(name)
            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = 3
    }
    static new(game) {
        return new this(game)
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            log('111111111111', this.frameIndex)
            //  
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            log('222222222222', this.frameIndex)

            // log(this.frameIndex)
            this.texture = this.frames[this.frameIndex]
        }
    }
    draw() {
        this.game.drawImage(this)
    }
 }