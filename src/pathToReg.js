function stringPathToReg (path) {
  const pathArray = path.split('/')
  let regString = '^'
  let pathSegment
  for (let i = 0; i < pathArray.length; i++) {
    pathSegment = pathArray[i]
    if (pathSegment === '') {
      continue
    } else if (pathSegment.indexOf(':') === 0) {
      regString += '\/([^\/]*)'
    } else if (pathSegment === '*') {
      regString += '(\/?.*)'
      break // * 号为结束
    }else {
      regString +='\/' + pathSegment
    }
  }

  regString += '$'

  return new RegExp(regString, 'i')
}

module.exports = {
  stringPathToReg
}
