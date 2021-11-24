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
