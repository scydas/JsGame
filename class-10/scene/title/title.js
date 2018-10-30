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
// 继承父类 GuaScene
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var lable = GuaLable.new(game, 'hello')
        this.addElement(lable)

        // var particle = GuaParticleSystem.new(game)
        // this.addElement(particle)  
        var r = GuaAnimation.new(game)
        r.x = 100
        r.y = 200  
        this.r = r 
        this.addElement(r)

        this.setupInputs()
    }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function() {
            // 这样是错误的，在回调中不能使用 this
            // this.w.move(2)
            self.r.move(-2)
        })
        self.game.registerAction('d', function() {
            self.r.move(2)
        })
    }
}