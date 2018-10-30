class GuaLable {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        var i = new this(game, text)
        return i
    }
    draw() {
        this.game.context.fillText(this.text, 150, 200)
    }
    update() {
    }
}