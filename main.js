import './style.styl'
import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

const devMode = 0
gsap.registerPlugin(CSSRulePlugin, ScrollTrigger)

const sel = (e) => document.querySelector(e)

if (devMode) {
  document.querySelectorAll('[data-video-urls]').forEach((el) => {
    el.querySelector('video').remove()
    // el.setAttribute('data-video-urls', '')
  })
  console.log('all videos disabled')
}

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const introCard = sel('.intro-sec__card')
const aboutSec = sel('.about-sec')
const mapWrap = sel('.map__map-wrap')
const mapBg = sel('.map__bg-svg')

ScrollTrigger.create({
  // markers: true,
  animation: gsap.timeline().to(introCard, { transform: 'translate(0%, -80%)' }),
  trigger: '.intro-sec',
  start: 'top bottom',
  end: 'bottom top',
  // toggleActions: 'play reverse restart reverse',
  scrub: 1,
})

ScrollTrigger.create({
  // markers: true,
  animation: gsap.timeline().to('.about-sec__item', { borderRadius: '0' }, '<').to(aboutSec, { padding: '0' }, '<'),
  trigger: aboutSec,
  start: 'top top',
  end: 'bottom center',
  pin: aboutSec,
  // anticipatePin: 1,
  // pinType: 'fixed',
  // pinSpacing: false,
  // toggleActions: 'play reverse restart reverse',
  scrub: 1,
})

const mapCards = document.querySelectorAll('.map-sec__card')
ScrollTrigger.create({
  // animation: gsap.timeline().to(mapCards[0], { opacity: 0.5 }),
  trigger: mapCards[0],
  start: 'center center',
  end: 'top top',
  pin: mapCards[0],
  scrub: 1,
  snap: 0.33,
})
ScrollTrigger.create({
  // animation: gsap.timeline().to(mapCards[0], { opacity: 0.5 }),
  trigger: mapCards[1],
  start: 'center center',
  end: 'top top',
  pin: mapCards[1],
  scrub: 1,
  snap: 0.33,
})
ScrollTrigger.create({
  // animation: gsap.timeline().to(mapCards[0], { opacity: 0.5 }),
  trigger: mapCards[2],
  start: 'center center',
  end: 'top top',
  pin: mapCards[2],
  scrub: 1,
  snap: 0.33,
})
ScrollTrigger.create({
  startTrigger: '.map-sec',
  endTrigger: mapCards[2],
  start: 'top top',
  end: 'top top',
  pin: '.map-sec__map',
  pinSpacing: true,
  pinType: 'fixed',
})

// const approachImg = document.querySelector('.approach-sec__img-wrap')
// const approachTitle = document.querySelector('.approach-sec__title-fg')

const mqInit = () => {
  // let approachTitleMask = approachImg.getBoundingClientRect().left - approachTitle.getBoundingClientRect().left
  // approachTitle.style.clipPath = 'inset(0 0 -50px ' + approachTitleMask + 'px )'
}
mqInit()
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
window.addEventListener('resize', () => {
  // if (mqMin('tab')) // console.log('qwe')
  mqInit()
})
