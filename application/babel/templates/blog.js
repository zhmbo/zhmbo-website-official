function blog() {
    setTimeout(function () {
        Timer.run('.template[data-template=blog] time',
            function () {
                var timetext = $('.template[data-template=blog] .p')
                $(timetext).text("The blog site is loading...");
                Identity.work()

                window.history.pushState({}, "home", "#")
                // window.location.href = '#'
                window.location.href = "/blog"
            }, 5)
    }, Identity.duration * 1.25)
}

function blogCallback() {
    Timer.reset()
}