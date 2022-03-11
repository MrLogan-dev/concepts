const onDigitKeyDown = (e) => {
  const { key } = e
  const num = parseInt(key, 10)
  console.log(e)
  if (isNaN(num)) {
    e.preventDefault()
    // return false
  }
  return true
}

const digits = document.querySelectorAll('.digit')
digits.forEach((digit) => digit.addEventListener('keydown', onDigitKeyDown))