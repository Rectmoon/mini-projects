const audio = document.getElementById('audio')
const musicContainer = document.getElementById('music-container')
const post = document.querySelector('#post')
const title = document.querySelector('#title')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const lyricsContainer = document.querySelector('#lyrics-container')
const lyricsList = document.getElementById('lyrics-list')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

const INTERVALDURATION = 1000
let currentIndex = 0
let timer
let j = 1

const data = [
  {
    img: 'http://imge.kugou.com/stdmusic/20161109/20161109171040932108.jpg',
    play_url:
      'https://webfs.yun.kugou.com/202002092209/171f2c0cf60aabece18ebc51d99ada6e/G078/M08/18/17/jg0DAFgi6G-AKqsqADDP_nSW5F4051.mp3',
    lyrics:
      '[id:$00000000]\r\n[ar:李玉刚]\r\n[ti:刚好遇见你]\r\n[by:]\r\n[hash:cb7ee97f4cc11c4ea7a1fa4b516a5d97]\r\n[al:]\r\n[sign:]\r\n[qq:]\r\n[total:0]\r\n[offset:0]\r\n[00:00.02]李玉刚 - 刚好遇见你\r\n[00:00.75]词：高进\r\n[00:00.85]曲：高进\r\n[00:00.94]编曲：关天天\r\n[00:13.13]我们哭了\r\n[00:15.79]我们笑着\r\n[00:18.83]我们抬头望天空\r\n[00:21.86]星星还亮着几颗\r\n[00:24.98]我们唱着\r\n[00:27.96]时间的歌\r\n[00:31.09]才懂得相互拥抱\r\n[00:33.98]到底是为了什么\r\n[00:37.30]因为我刚好遇见你\r\n[00:40.77]留下足迹才美丽\r\n[00:43.79]风吹花落泪如雨\r\n[00:46.80]因为不想分离\r\n[00:49.95]因为刚好遇见你\r\n[00:53.10]留下十年的期许\r\n[00:55.99]如果再相遇\r\n[00:59.21]我想我会记得你\r\n[01:14.32]我们哭了\r\n[01:17.23]我们笑着\r\n[01:20.34]我们抬头望天空\r\n[01:23.33]星星还亮着几颗\r\n[01:26.51]我们唱着\r\n[01:29.53]时间的歌\r\n[01:32.59]才懂得相互拥抱\r\n[01:35.59]到底是为了什么\r\n[01:38.73]因为我刚好遇见你\r\n[01:42.23]留下足迹才美丽\r\n[01:45.30]风吹花落泪如雨\r\n[01:48.39]因为不想分离\r\n[01:51.55]因为刚好遇见你\r\n[01:54.54]留下十年的期许\r\n[01:57.61]如果再相遇\r\n[02:00.81]我想我会记得你\r\n[02:03.99]因为刚好遇见你\r\n[02:06.86]留下足迹才美丽\r\n[02:09.94]风吹花落泪如雨\r\n[02:13.03]因为不想分离\r\n[02:16.06]因为刚好遇见你\r\n[02:19.16]留下十年的期许\r\n[02:22.21]如果再相遇\r\n[02:25.34]我想我会记得你\r\n[02:31.40]因为我刚好遇见你\r\n[02:34.51]留下足迹才美丽\r\n[02:37.59]风吹花落泪如雨\r\n[02:40.67]因为不想分离\r\n[02:43.77]因为刚好遇见你\r\n[02:46.84]留下十年的期许\r\n[02:49.94]如果再相遇\r\n[02:53.11]我想我会记得你\r\n'
  },
  {
    img: 'http://imge.kugou.com/stdmusic/20160907/20160907172212861609.jpg',
    play_url: 'mp3/decades.mp3',
    lyrics:
      '[id:$00000000]\r\n[ar:陈奕迅]\r\n[ti:十年]\r\n[by:]\r\n[hash:8c743a283935ff2c1eb62a8fa855db60]\r\n[al:]\r\n[sign:]\r\n[qq:]\r\n[total:205561]\r\n[offset:0]\r\n[00:00.25]陈奕迅 - 十年\r\n[00:00.65]作词：林夕\r\n[00:00.80]作曲：陈小霞\r\n[00:00.95]编曲：陈辉阳\r\n[00:15.54]如果那两个字没有颤抖\r\n[00:19.26]我不会发现我难受\r\n[00:22.64]怎么说出口\r\n[00:26.08]也不过是分手\r\n[00:30.77]如果对于明天没有要求\r\n[00:34.86]牵牵手就像旅游\r\n[00:37.96]成千上万个门口\r\n[00:41.70]总有一个人要先走\r\n[00:47.40]怀抱既然不能逗留\r\n[00:50.89]何不在离开的时候\r\n[00:53.77]一边享受一边泪流\r\n[01:00.93]十年之前\r\n[01:02.95]我不认识你\r\n[01:04.89]你不属于我\r\n[01:06.87]我们还是一样\r\n[01:09.24]陪在一个陌生人左右\r\n[01:13.12]走过渐渐熟悉的街头\r\n[01:16.46]十年之后\r\n[01:18.33]我们是朋友\r\n[01:20.31]还可以问候\r\n[01:22.27]只是那种温柔\r\n[01:24.70]再也找不到拥抱的理由\r\n[01:28.64]情人最后难免沦为朋友\r\n[01:57.07]怀抱既然不能逗留\r\n[02:00.54]何不在离开的时候\r\n[02:03.58]一边享受一边泪流\r\n[02:10.63]十年之前\r\n[02:12.65]我不认识你\r\n[02:14.63]你不属于我\r\n[02:16.50]我们还是一样\r\n[02:18.98]陪在一个陌生人左右\r\n[02:22.72]走过渐渐熟悉的街头\r\n[02:26.15]十年之后我们是朋友\r\n[02:30.04]还可以问候\r\n[02:32.01]只是那种温柔\r\n[02:34.38]再也找不到拥抱的理由\r\n[02:38.27]情人最后难免沦为朋友\r\n[02:48.19]直到和你做了多年朋友\r\n[02:52.38]才明白我的眼泪\r\n[02:55.21]不是为你而流\r\n[02:58.99]也为别人而流\r\n'
  }
]

initSong(data[j])

function initSong(song) {
  const { img, play_url, lyrics } = song
  post.src = img
  audio.src = play_url
  initLyrics(lyrics)
}

function initLyrics(lyrics) {
  clearInterval(timer)
  let lyricsArr = []
  lyrics.replace(/\[(\d{2})\:(\d{2})\.(?:\d{2})\](.*)/g, (_, minutes, seconds, content) => {
    lyricsArr.push({
      minutes,
      seconds,
      content
    })
  })
  lyricsList.innerHTML = ''
  lyricsArr.forEach(({ minutes, seconds, content }) => {
    const lyricLi = document.createElement('li')
    lyricLi.innerText = content
    lyricLi.setAttribute('data-current', parseInt(minutes) * 60 + parseInt(seconds))
    lyricsList.appendChild(lyricLi)
  })
  lyricsList.style.transform = `translateY(0)`
}

function togglePlay() {
  const isPlaying = musicContainer.classList.contains('playing')
  isPlaying ? pauseSong() : playSong()
}

function updateLyricList() {
  const [...lyriclis] = lyricsList.querySelectorAll('li')
  const h = lyriclis[0].clientHeight
  const { currentTime } = audio
  let n

  for (let i in lyriclis) {
    const s = lyriclis[i].getAttribute('data-current') - 0
    if (s === Math.round(currentTime)) {
      n = i
      break
    }
  }

  if (n && n !== currentIndex) {
    lyriclis.forEach((l, i) => i !== n && l.classList.remove('current'))
    lyriclis[n].classList.add('current')
    n > 3 && (lyricsList.style.transform = `translateY(${-(n - 3) * h}px)`)
    currentIndex = n
  }
}

function playSong() {
  musicContainer.classList.add('playing')
  playBtn.querySelector('i.fa').classList.remove('fa-play')
  playBtn.querySelector('i.fa').classList.add('fa-pause')
  audio.play()
  clearInterval(timer)
  timer = setInterval(updateLyricList, INTERVALDURATION)
}

function pauseSong() {
  musicContainer.classList.remove('playing')
  playBtn.querySelector('i.fa').classList.remove('fa-pause')
  playBtn.querySelector('i.fa').classList.add('fa-play')
  audio.pause()
  clearInterval(timer)
}

function prevSong() {
  j--
  j = j < 0 ? data.length - 1 : j
  initSong(data[j])
  playSong()
}

function nextSong() {
  j++
  j = j > data.length - 1 ? 0 : j
  initSong(data[j])
  playSong()
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  progress.style.width = `${(currentTime / duration) * 100}%`
}

function setProgress(e) {
  audio.currentTime = (e.offsetX / this.clientWidth) * audio.duration
}

playBtn.addEventListener('click', togglePlay)
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', pauseSong)
