const PROXY_HOST = 'https://cors-anywhere.herokuapp.com'
const API_URL = `${PROXY_HOST}/https://api.darksky.net/forecast/99c5d4f13064a78e3ae97440412c94b6`
const locationTimezone = document.querySelector('.location-timezone')
const degree = document.querySelector('.degree')
const description = document.querySelector('.description')
const temperatureUnit = document.querySelector('.temperature-unit')
const C = '℃'
const F = '℉'
const temperatureMap = { [C]: '', [F]: '' }
const sc = new Skycons({ color: 'white' })
sc.add('weather', Skycons.CLEAR_DAY)

function initIcon(id, icon) {
  const currentIcon = icon.replace(/-/g, '_').toUpperCase()
  sc.set(id, Skycons[currentIcon])
  sc.play()

  temperatureUnit.addEventListener('click', function() {
    if (this.textContent === C) {
      this.textContent = F
      degree.textContent = temperatureMap[F]
    } else {
      this.textContent = C
      degree.textContent = temperatureMap[C]
    }
  })
}

const fetchWeatherInfo = api => fetch(api).then(resp => resp.json())

async function handleGetPosition(lat, lon) {
  try {
    const {
      currently: { summary, temperature, icon },
      timezone
    } = await fetchWeatherInfo(`${API_URL}/${lat},${lon}`)
    temperatureMap[C] = (((parseFloat(temperature) - 32) * 5) / 9).toFixed(2)
    temperatureMap[F] = temperature
    degree.textContent = temperatureMap[C]
    locationTimezone.textContent = timezone
    description.textContent = summary
    initIcon('weather', icon)
  } catch (e) {
    console.error(e)
  }
}

new BMap.Geolocation().getCurrentPosition(function(r) {
  if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    const { lat, lng } = r.point
    handleGetPosition(lat, lng)
  }
})
