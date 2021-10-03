let globalStart = 0
const getData = async (start = 0, count = 25) => {
  const localUrl = `http://localhost:4001/getGamesOnSale?start=${start}&count=${count}`
  const herokuUrl = `https://steam-sales-server.herokuapp.com/getGamesOnSale?start=${start}&count=${count}`
  const url = window.location.hostname === '127.0.0.1' ? localUrl : herokuUrl
  globalStart += count + 1
  return await fetch(url).then(res => res.json())
}

const buildCardsInHtml = (data) => {
  return data.map(({ name, header_image, discount_percent, initial_formatted, final_formatted, developer, url }) => {
    const card = document.createElement('a')
    card.classList.add('card')
    card.href = url

    const img = document.createElement('div')
    img.classList.add('image-banner')
    img.style.backgroundImage = `url(${header_image})`
    card.appendChild(img)

    const price = document.createElement('div')
    price.classList.add('flex')
    const percentOff = document.createElement('span')
    percentOff.classList.add('percent-off')
    percentOff.innerText = discount_percent

    const container = document.createElement('div')
    container.classList.add('flex', 'spc-btw')

    const priceContainer = document.createElement('div')
    priceContainer.classList.add('flex-col', 'flex-br')
    const initial = document.createElement('span')
    initial.innerText = initial_formatted
    initial.classList.add('initial-price')
    priceContainer.appendChild(initial)
    const discount = document.createElement('span')
    discount.innerText = final_formatted
    discount.classList.add('sale-price')
    priceContainer.appendChild(discount)

    const devContainer = document.createElement('div')
    devContainer.classList.add('flex-col', 'flex-br')
    const label = document.createElement('span')
    label.innerText = 'Developer'
    label.classList.add('label')
    devContainer.appendChild(label)
    const dev = document.createElement('span')
    dev.innerText = developer
    dev.classList.add('developer')
    devContainer.appendChild(dev)

    price.appendChild(percentOff)
    price.appendChild(priceContainer)
    container.appendChild(price)
    container.appendChild(devContainer)
    card.appendChild(container)
    return card
  })
}

function appendChildrenToNode(node, ...children){
  const documentFragment = document.createDocumentFragment();
  children.forEach(child => {
      if (Array.isArray(child)) {
          child.forEach(child => documentFragment.appendChild(child))
      } else {
          documentFragment.appendChild(child);
      }
  });
  node.appendChild(documentFragment);
}

const requestData = async (showMiniLoader) => {
  const loader = document.querySelector('.loader')
  if (showMiniLoader) {
    loader.classList.remove('hidden')
    loader.classList.add('mini-loader')
  }
  const { data } = await getData(globalStart)
  const cards = buildCardsInHtml(data)
  loader.classList.add('hidden')
  appendChildrenToNode(document.querySelector('#game-cards'), cards)
}

const main = () => {
  // make initial request because the element is off screen
  requestData()
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) requestData(true)
  })

  // The element to observe
  let el = document.querySelector('#time-to-load-more-cards')

  // Attach it to the observer
  observer.observe(el)
}
main()