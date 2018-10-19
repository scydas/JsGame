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
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            log('相撞了')
            return true
        }
    }
    return false
}