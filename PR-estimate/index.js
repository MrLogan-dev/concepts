const addBoxShadowToRange = () => {
  const range = document.querySelector("input[type='range']")
  const { clientWidth } = range
  const color = '#E3E5E5'
  const boxShadowTemplate = (offsetX) => `${offsetX}px 0 0 -9.5px ${color}`
  const boxShadow = [...new Array(clientWidth)].map((_, i) => boxShadowTemplate(i + 1)).join(', ')
  
  const style = document.createElement('style')
  style.innerHTML = `input[type='range']::-webkit-slider-thumb { box-shadow: ${boxShadow}; }`
  document.head.appendChild(style)
}
addBoxShadowToRange()

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const [range, linesAdded, filesChanged] = [...e.target].map((el) => el.value)
  const complexity = range / 10
  const estimate = parseInt((((Math.pow(complexity, 2) * linesAdded) + Math.sqrt(filesChanged)) * .01).toFixed(2), 10)
  
  document.querySelector('#approx').innerText = estimate
  document.querySelector('#min').innerText = estimate <= 0 ? 0 : estimate - 2
  document.querySelector('#max').innerText = Math.floor(estimate + 2)

  document.querySelector('main').classList.add('slide')
})
