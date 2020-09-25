Router.callbacks = function (wrapper) {
  if (wrapper == 'secret') secret()
  else if (wrapper == 'notFound') notFound()
  else if (wrapper == 'home') home()
}