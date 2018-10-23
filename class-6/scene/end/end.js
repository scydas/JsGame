// var SceneEnd = function (game) {
//     var s = {
//         game: game,

//     }
//     // 注册重玩事件
//     game.registerAction('r', function(){
//         var s = new Scene(game)
//         game.replaceScene(s)
//     })
//     s.draw = function () {
//         // draw labels 
//         game.context.fillText('游戏结束，按 r 重启游戏', 100, 190)
//     }
//     s.update = function () {
//     }
//     return s
// }

// 继承父类 GuaScene
class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = new Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw lables
        this.game.context.fillText('游戏结束，按 r 再来一次', 100, 190)
    }

}