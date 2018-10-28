class GuaImage {
    constructor(game, name) {
        this.game = game
        // 图片 
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    draw() {
        // this.game.drawImage(game)
    }
    update() {

    }
}

// 逻辑上来说不应该继承 guaImage，但是暂时这么做
// class Player extends GuaImage {
//     constructor(game, name) {
//         super(game, name)
//     }
// }