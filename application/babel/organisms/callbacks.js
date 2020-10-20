Router.callbacks = function (wrapper) {
  _hmt.push(['_trackPageview', '/#'+wrapper])
  if (wrapper == 'secret') secret()
  else if (wrapper == 'notFound') notFound()
  else if (wrapper == 'home') home()
  else if (wrapper == 'blog') blog()
}