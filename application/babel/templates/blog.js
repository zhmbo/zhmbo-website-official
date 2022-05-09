function blog() {
    setTimeout(function () {
        Timer.run('.template[data-template=blog] time',
            function () {
                var timetext = $('.template[data-template=blog] .p')
                $(timetext).text("The blog site is loading...");
                Identity.work()
                // 仅改变网址,网页不会真的跳转,也不会获取到新的内容,本质上网页还停留在原页面!
                window.history.pushState({}, "home", "#")
                window.location.href = "/blog"
            }, 5)
    }, Identity.duration * 1.25)
}

function blogCallback() {
    Timer.reset()
}