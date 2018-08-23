const jwtData = jwt => {
  var base64Url = jwt.split('.')[1]
  console.log(base64Url)
  var base64 = base64Url.replace('-', '+').replace('_', '/')
  console.log(base64)
  console.log(JSON.parse(window.atob(base64)))
  return JSON.parse(window.atob(base64))
}

export const userId = jwt => {
  console.log('runs JWT SHIT')
  console.log(jwt)
  console.log(jwtData(jwt).data.id)
 return  jwtData(jwt).data.id
}

export const isExpired = jwt => jwtData(jwt).exp < (Date.now()/1000)
