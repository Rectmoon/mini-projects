const DEFAULT_CONFIG = {
  columnWidth: 190,
  gapWidth: 15,
  gapHeight: 15
}

class Masonry {
  constructor (container, options = DEFAULT_CONFIG) {
    const { columnWidth, gapWidth, gapHeight } = options

    this.columnWidth = columnWidth
    this.gapWidth = gapWidth
    this.gapHeight = gapHeight

    this.container = container
    this.columnCount = 0
    this.columnHeights = []
  }

  init () {
    this.initColumnCount()
    this.initHeights()
    this.initCells()
    this.bindEvents()
  }

  initColumnCount () {
    this.columnCount = Math.max(
      2,
      Math.floor(
        (document.body.offsetWidth + this.gapWidth) /
          (this.columnWidth + this.gapWidth)
      )
    )
  }

  initHeights () {
    this.columnHeights = new Array(this.columnCount).fill(0)
    this.container.style.width =
      this.columnCount * (this.columnWidth + this.gapWidth) -
      this.gapWidth +
      'px'
  }

  initCells () {
    const viewportBottom =
      document.documentElement.clientHeight +
      document.documentElement.scrollTop -
      this.container.offsetHeight

    if (viewportBottom >= Math.min(...this.columnHeights)) {
      this.loaderMoreCells()
    }
  }

  reflowCells () {
    this.initColumnCount()
    if (this.columnCount !== this.columnHeights.length) {
      this.initHeights()
      this.adjustCells([...this.container.children])
    }
    this.initCells()
  }

  bindEvents () {
    let scrollTimer = null
    let resizeTimer = null

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => this.initCells(), 300)
    })

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => this.reflowCells(), 300)
    })
  }

  async loaderMoreCells () {
    const cells = await this.appendCells()
    this.adjustCells(cells)
  }

  async appendCells () {
    const pictures = await this.fetchData()
    const fragment = document.createDocumentFragment()
    const cells = []

    pictures.forEach(picture => {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerHTML = `
        <div class='img-box'>
          <img src=${picture.src} width=${
        this.columnWidth
      } height=${(picture.width * picture.height) / this.columnWidth}/>
      123
        </div>
      `
      cells.push(cell)
      fragment.appendChild(cell)
    })

    this.container.appendChild(fragment)

    return cells
  }

  adjustCells (cells) {
    cells.forEach(cell => {
      const minHeight = Math.min(...this.columnHeights)
      const minHeightIndex = this.columnHeights.indexOf(minHeight)

      cell.style.left =
        minHeightIndex * (this.columnWidth + this.gapWidth) + 'px'
      cell.style.top = minHeight + 'px'

      this.columnHeights[minHeightIndex] =
        minHeight + this.gapHeight + cell.offsetHeight
    })
    this.container.style.height = Math.max(...this.columnHeights)
  }

  fetchData () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(new Array(10).fill(null).map(() => this.getRandomPicture()))
      }, 500)
    })
  }

  getRandomPicture () {
    const rangeWidth = [180, 320]
    const rangeHeight = [60, 168]
    const randomWidth =
      rangeWidth[0] +
      Math.floor(Math.random() * (rangeWidth[1] - rangeWidth[0]))
    const randomHeight =
      rangeWidth[0] +
      Math.floor(Math.random() * (rangeHeight[1] - rangeHeight[0]))
    const random = Math.floor(Math.random() * 1000)

    return {
      width: randomWidth,
      height: randomHeight,
      src: `https://picsum.photos/${randomWidth}/${randomHeight}?random=${random}`
    }
  }
}
