(() => {
  const closeAllSections = () => {
    const sections = document.getElementsByTagName('section')
    ;[...sections].forEach((el) => {
      el.classList.remove('open')
    })
  }

  closeAllSections()
  const about = document.getElementsByClassName('about')[0]
  about.classList.add('open')
  about.classList.remove('closed')

  const labels = document.getElementsByTagName('label')
  ;[...labels].forEach((label) => {
    label.addEventListener('click', (e) => {
      // close all of the sections
      closeAllSections()
      // open the section that was clicked
      e.target.parentElement.classList.add('open')
    })
  })
})()

// each section should be the same width maximized, and the same width minimized. Only one should be maximized at a time