var SceneEnd = function (game) {
    var s = {
        game: game,

    }
    // 注册重玩事件
    game.registerAction('r', function(){
        var s = Scene(game)
        game.replaceScene(s)
    })
    s.draw = function () {
        // draw labels 
        game.context.fillText('游戏结束，按 r 重启游戏', 100, 190)
    }
    s.update = function () {
    }
    return s
}