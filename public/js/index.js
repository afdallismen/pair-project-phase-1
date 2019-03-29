
function popLoginForm () {
  var loginForm = document.getElementById('login-form')
  if (loginForm.getAttribute('style').indexOf('display') === -1 || loginForm.getAttribute('style').indexOf('display: initial;') !== -1) {
    loginForm.setAttribute('style', 'display: none;')
  } else {
    loginForm.setAttribute('style', 'display: initial;')
  }

  new Popper(
    document.getElementById('login-btn'),
    document.getElementById('login-form'),
    {
      placement: 'bottom'
    }
  )
}

if (document.getElementById('login-btn'))
  document.getElementById('login-btn').onclick = popLoginForm

window.onload = function () {
  var loginForm = document.getElementById('login-form')
  loginForm.setAttribute('style', 'display: none;')
}