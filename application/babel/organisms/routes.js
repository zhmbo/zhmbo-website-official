Router.routes = function (callback) {
  Router.wrapper = []
  var location = Router.location.split('/').filter(Boolean)

  //  HOME
  if (location[0] === undefined)
    Router.push('home')

  //  SECRET
  else if (location[0] == 'secret' && location[1] === undefined)
    Router.push('secret')

  //  BUCKET
  else if (location[0] == 'bucket' && location[1] === undefined)
    Router.push('bucket')

  //  BUCKET ALL
  else if (location[0] == 'bucket' && location[1] == 'all' && location[2] === undefined)
    Router.push('bucketAll')

  //  PROJECTS
  else if (location[0] == 'projects' && location[1] === undefined)
    Router.push('projectsAll')

  //  THOUGHTS
  else if (location[0] == 'thoughts' && location[1] === undefined)
    Router.push('thoughtsAll')

  //  ABOUTME
  else if (location[0] == 'aboutme' && location[1] === undefined)
    Router.push('aboutme')

  //  BLOG
  else if (location[0] == 'blog' && location[1] === undefined)
    window.location.href = "blog"

  //  NOT FOUND
  else Router.push('notFound')

  //  CALLBACK
  Router.callback(callback)
}