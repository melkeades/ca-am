import './style.styl'
import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Flip from 'gsap/Flip'
import Lenis from '@studio-freight/lenis'

const devMode = 1
gsap.registerPlugin(CSSRulePlugin, ScrollTrigger, Flip)

const sel = (e) => document.querySelector(e)
const selAll = (e) => document.querySelectorAll(e)

const videoHero$ = sel('.video-hero')
const introSec$ = sel('.intro-sec')
const aboutSec$ = sel('.about-sec')
const mapSec$ = sel('.map-sec')
const featuresSec$ = sel('.features-sec')

if (devMode) {
  const devRemoveList = [videoHero$, introSec$]
  document.querySelectorAll('[data-video-urls]').forEach((el) => {
    el.querySelector('video').remove()
  })
  devRemoveList.forEach((el) => {
    // el.remove()
  })
  // sel('.page-wrapper').style.paddingTop = '80vh'
  console.log('dev mode')
}

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const introCard$ = sel('.intro-sec__card-wrap')

ScrollTrigger.create({
  // markers: true,
  animation: gsap.timeline().to(introCard$, { transform: 'translate(0%, -80%)' }),
  trigger: '.intro-sec',
  start: 'top bottom',
  end: 'bottom top',
  scrub: 1,
})

ScrollTrigger.create({
  // animation: gsap.timeline().to('.about-sec__item', { borderRadius: '0' }, '<').to(aboutSec$, { padding: '0' }, '<'),
  animation: gsap.timeline().to('.about-sec__item-wrap', { borderRadius: '0', top: '0', bottom: '0', left: '0', right: '0' }, '<'),
  trigger: aboutSec$,
  start: 'top top',
  end: 'bottom center',
  pin: aboutSec$,
  scrub: 1,
  // anticipatePin: 1,
  // pinType: 'fixed',
})

const mapCards$ = selAll('.map-sec__card')
const mapCardsWrap$ = selAll('.map-sec__card-wrap')
const mapCardsWrapIn$ = selAll('.map-sec__card-wrapin')

mapCardsWrap$.forEach((el) => {
  gsap.set(el, { opacity: 0, position: 'fixed', top: '55%', translateY: '-50%' })
})

// ScrollTrigger.create({
//   // animation: gsap.timeline().to(mapCards[0], { opacity: 0.5 }),
//   trigger: mapCards$[1],
//   start: 'center center',
//   end: 'top top',
//   // pin: mapCards[1],
//   scrub: 1,
//   // snap: 1,
// })

const mapSec_ = 'map-sec'
const mapDot_ = 'map__dot'
const mapDotA_ = 'map__dot--red-dog'
const mapDotB_ = 'map__dot--fort-knox'
const mapDotC_ = 'map__dot--usibelli'
const mapDotActive_ = 'map__dot--active'
const mapDotLine_ = 'map__dot__line'

const map$ = sel('.map-sec__map')
const mapWrap$ = sel('.map-sec__map-wrap')
const mapFg$ = sel('.map__fg')
const mapFgWrap$ = sel('.map__fg-wrap')
const mapDots$ = selAll('.map__dot')
const mapBg$ = sel('.map__bg-img')
const mapBgWrap$ = sel('.map__bg-wrap')

const mapDotRemoveActiveClass = () => {
  const activeDots = [...mapDots$].filter((el) => el.classList.contains(mapDotActive_))
  activeDots.forEach((el) => el.classList.remove(mapDotActive_))
}
const cardSpeed = 0.5
const mapCardInAni = (i) => {
  if (elementInViewport('.' + mapSec_)) {
    // prevent overlapping tweens on fast scroll (end/home on keyboard)
    gsap.timeline().to(mapCardsWrap$[i], { opacity: 1, top: '50%', duration: cardSpeed })
    mapDots$[i].classList.add(mapDotActive_)
  }
}
const mapCardOutAni = (i, scrollDirection = 'scrollingDown') => {
  const direction = scrollDirection === 'scrollingUp' ? '55%' : '45%'
  // prevent overlapping tweens on fast scroll (end/home on keyboard)
  gsap.timeline().to(mapCardsWrap$[i], { opacity: 0, top: direction, duration: cardSpeed })
  // gsap.set(mapCardsWrap$[i], { opacity: 0, top: direction })
  mapDotRemoveActiveClass()
}
mapDotRemoveActiveClass()
const mapScrollInitTl = gsap
  .timeline({ defaults: { ease: 'none', duration: 5 } })
  .to(mapFg$, { y: '-20vh' }, 0)
  .to(mapBg$, { y: '-10vh' }, 0)
  .to(mapFg$, { scale: 1.2 }, 0)
  .to(mapBg$, { scale: 1.2 * 0.84 }, 0)
  .to(
    {},
    {
      onComplete: mapCardInAni,
      onCompleteParams: [0],
      onReverseComplete: mapCardOutAni,
      onReverseCompleteParams: [0, 'scrollingUp'],
      duration: 0.001,
    },
    3.5
  )
  .addLabel('mapIntroDone', '>')

const mapInitStAnimation = ScrollTrigger.create({
  animation: mapScrollInitTl,
  trigger: mapSec$,
  start: 'top 80%',
  end: 'top top',
  scrub: 1,
  snap: 1,
})
const mapScrollTl = gsap
  .timeline({ defaults: { ease: 'none', duration: 5 } })
  .addLabel('card-a')
  .to(mapFgWrap$, { y: '-60vh' }, 0)
  .to(mapBgWrap$, { y: -60 * 0.8 + 'vh' }, 0)
  .to(
    {},
    {
      onComplete: mapCardOutAni,
      onCompleteParams: [0],
      onReverseComplete: mapCardInAni,
      onReverseCompleteParams: [0],
      duration: 0.001,
    },
    2.5 // DO NOT OVERLAP EVENT TWEENS!!!
  )
  // .to(mapCardsWrapIn[0], { opacity: 0, y: '-5vh', duration: 1 }, 1)
  .addLabel('card-b', 5)
  .to(
    {},
    {
      onComplete: mapCardInAni,
      onCompleteParams: [1],
      onReverseComplete: mapCardOutAni,
      onReverseCompleteParams: [1, 'scrollingUp'],
      duration: 0.001,
    },
    3.5
  )
  .set([mapFgWrap$, mapBgWrap$], { transformOrigin: '100% 60%' })
  .to(mapFgWrap$, { scale: 1.9 }, 5)
  .to(mapBgWrap$, { scale: 1.9 * 0.8 }, 5)
  .to(
    {},
    {
      onComplete: mapCardOutAni,
      onCompleteParams: [1],
      onReverseComplete: mapCardInAni,
      onReverseCompleteParams: [1],
      duration: 0.001,
    },
    7.5
  )
  .addLabel('card-c', 10)
  .to(
    {},
    {
      onComplete: mapCardInAni,
      onCompleteParams: [2],
      onReverseComplete: mapCardOutAni,
      onReverseCompleteParams: [2, 'scrollingUp'],
      duration: 0.001,
    },
    8.5
  )
  .to(mapFgWrap$, { y: '-85vh' }, 10)
  .to(mapBgWrap$, { y: -85 * 0.8 + 'vh' }, 10)
  .to(
    {},
    {
      onComplete: mapCardOutAni,
      onCompleteParams: [2],
      onReverseComplete: mapCardInAni,
      onReverseCompleteParams: [2],
      duration: 0.001,
    },
    14
  )
  .addLabel('finish', 15)

const mapStAnimation = ScrollTrigger.create({
  animation: mapScrollTl,
  trigger: mapSec$,
  // startTrigger: '.map-sec',
  // endTrigger: mapCards[2],
  start: 'top top',
  end: 'bottom+=1000 top',
  pin: '.map-sec__map-wrap',
  scrub: 1,
  snap: 'labelsDirectional',
  duration: { min: 0.2, max: 1 },
  // delay: 0.0,
  // anticipatePin: true,
  // pinSpacing: true,
  // pinType: 'fixed',
})

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // if (mutationRecord.target.className === mapDotActive_) {
    if (mutation.target.classList.contains(mapDotActive_)) {
      window.addEventListener('scroll', () => {
        if (mapStAnimation.isActive || mapInitStAnimation.isActive) {
          const mapFgScale = gsap.getProperty(mapFg$, 'scale')
          const mapFgWrapScale = gsap.getProperty(mapFgWrap$, 'scale')
          const lineWidth = (mutation.target.getBoundingClientRect().left - mapCards$[0].getBoundingClientRect().right - 30) / (mapFgScale * mapFgWrapScale)
          // console.log(mapFgScale, window.getComputedStyle(mapFg$).getPropertyValue(display), lineWidth)
          // console.log(mapFgScale, mapFgWrapScale, lineWidth)
          mutation.target.querySelector('.' + mapDotLine_).style.width = lineWidth + 'px'
          // const line = mutation.target.querySelector('.' + mapDotLine_)
          // gsap.timeline().fromTo(line, { width: 0 }, { width: lineWidth, ease: 'none' }, 0)
        }
      })
    }
  })
})

for (let mapDot of mapDots$) {
  observer.observe(mapDot, { attributes: true, attributeFilter: ['class'] })
}

const featuresItem$ = selAll('.features-sec__item')
const featuresImg_ = 'features-sec__img'
const featuresImgWrap_ = 'features-sec__img-wrap'
const featuresInfo_ = 'features-sec__info'

featuresItem$.forEach((item) => {
  const img = item.querySelector('.' + featuresImg_)
  const imgWrap = item.querySelector('.' + featuresImgWrap_)
  const info = item.querySelector('.' + featuresInfo_)
  const featuresScrollTl = gsap
    .timeline({ defaults: { ease: 'power2.out', duration: 2 } })
    .to(imgWrap, { marginLeft: 80, marginRight: 80 }, '0')
    .from(imgWrap, { width: '100%' }, '0')
    // .to(imgWrap, { paddingLeft: '80px', paddingRight: '80px' }, '0')
    .from(info, { opacity: 0, y: 100 }, '0')
  ScrollTrigger.create({
    animation: featuresScrollTl,
    trigger: item,
    start: 'top 80%',
    // end: 'top 15%',
    // scrub: 1,
    // snap: 1,
    duration: { min: 0.2, max: 1 },
  })
  // gsap.from(imgWrap, { width: '100%', duration: 1, scrollTrigger: { trigger: imgWrap, start: 'top 85%', end: 'top 15%', scrub: true } })
})

const mqInit = () => {
  console.log(mqMin('desk'))
}

const screen = {
  mob: 0,
  mobLand: 479,
  tab: 768,
  desk: 992,
  hd: 1440,
  uhd: 1920,
}
let screenMq = {}
Object.entries(screen).forEach(([scr, mq], i) => {
  if (i === 0) {
    // mobile
    screenMq[scr] = window.matchMedia(`(max-width: ${Object.values(screen)[i + 1] - 1}px)`)
  } else if (i === Object.keys(screen).length - 1) {
    // uhd/4k
    screenMq[scr] = window.matchMedia(`(min-width: ${mq}px)`)
  } // the rest
  else screenMq[scr] = window.matchMedia(`(min-width: ${mq}px) and (max-width: ${Object.values(screen)[i + 1]}px)`)
})

// media query change events
for (let [scr, mq] of Object.entries(screenMq)) {
  mq.addEventListener('change', mqHandler)
  // console.log('mq added:' + scr)
}

// media query handler function
let mqNow = null
function mqHandler() {
  for (let [scr, mq] of Object.entries(screenMq)) {
    if (mq.matches) mqNow = scr
  }
  mqInit()
  // console.log(mqNow)
}
mqHandler()

function mqMax(device) {
  const deviceIndex = Object.keys(screen).indexOf(device)
  const mqNowIndex = Object.keys(screen).indexOf(mqNow)
  if (mqNowIndex <= deviceIndex) return true
  else return false
}
function mqMin(device) {
  const deviceIndex = Object.keys(screen).indexOf(device)
  const mqNowIndex = Object.keys(screen).indexOf(mqNow)
  if (mqNowIndex >= deviceIndex) return true
  else return false
}
// window.addEventListener('resize', () => {
//   // if (mqMin('tab')) // console.log('qwe')
//   mqInit()
// })

function elementInViewport(el) {
  const element = el instanceof Element ? el : document.querySelector(el)
  const bounding = element.getBoundingClientRect()
  const elementHeight = element.offsetHeight
  const elementWidth = element.offsetWidth
  if (
    bounding.top >= -elementHeight &&
    bounding.left >= -elementWidth &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + elementWidth &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + elementHeight
  ) {
    return true
  } else {
    return false
  }
}
