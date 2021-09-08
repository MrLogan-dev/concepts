(() => {
  const closeAllSections = () => {
    const sections = document.getElementsByClassName('open')
    ;[...sections].forEach((el) => {
      el.classList.remove('open')
      el.classList.remove('delayed-open')
    })
  }

  const labels = document.getElementsByTagName('label')
  ;[...labels].forEach((label) => {
    label.addEventListener('click', (e) => {
      // close all of the sections
      closeAllSections()
      // open the section that was clicked
      e.target.parentElement.classList.add('open')

      // after 750ms, show the background image and text
      setTimeout(() => {
        const sections = document.getElementsByClassName('open')
        ;[...sections].forEach((el) => {
          el.classList.add('delayed-open')
        })
      }, 750)
    })
  })

})()