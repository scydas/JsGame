// 一些公共函数
var log = console.log.bind(console)

// 加载图片
var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

// 判断相撞的函数
// Todo 球和砖块侧边相撞，球的反弹要不一样
var rectIntersects = function (a, b) {
    var aX = a.x + a.w / 2
    var aY = a.y + a.h / 2
    var bX = b.x + b.w / 2
    var bY = b.y + b.h / 2
    if (Math.abs(aX - bX) <= (a.w + b.w) / 2 && Math.abs(aY - bY) <= (a.h + b.h) / 2) {
        log('相撞了')
        return true
    }
    return false
}