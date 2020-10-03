function blog() {
    setTimeout(function () {
        Timer.run('.template[data-template=blog] time',
            function () {
                Identity.work()
                window.location.href = '#'
                window.location.href = "blog"
            }, 5)
    }, Identity.duration * 1.25)
}

function blogCallback() {
    Timer.reset()
}