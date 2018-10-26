class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }
    // 将子类中的共同方法提取到父类中
    static new(game) {
        var i = new this(game)
        return i
    }
    // 父类中的 draw ()
    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            this.game.drawImage(e)       
        }
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    update() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}

// 继承父类 GuaScene
// class SceneTitle extends GuaScene {
//     constructor(game) {
//         super(game)
//         game.registerAction('k', function() {
//             var s = Scene(game)
//             game.replaceScene(s)
//         })
//     }
//     draw() {
//         // draw lables
//         this.game.context.fillText('按 k 开始游戏', 150, 200)
//     }
// }