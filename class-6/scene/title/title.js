var SceneTitle = function (game) {
    var s = {
        game: game,
    }
    // 注册开始事件
    game.registerAction('k', function(){
        var s = Scene(game)
        game.replaceScene(s)
    })
    s.draw = function () {
        // draw labels 
        game.context.fillText('按 k 开始游戏', 150, 200)
    }
    s.update = function () {
    }
    return s
}