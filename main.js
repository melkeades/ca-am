import './style.styl'
import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

const devMode = 1
gsap.registerPlugin(CSSRulePlugin, ScrollTrigger)

const sel = (e) => document.querySelector(e)
const selAll = (e) => document.querySelectorAll(e)

const videoHero = sel('.video-hero')
const introSec = sel('.intro-sec')
const aboutSec = sel('.about-sec')

if (devMode) {
  const devRemoveList = [videoHero, introSec]
  document.querySelectorAll('[data-video-urls]').forEach((el) => {
    // el.querySelector('video').remove()
    // devRemoveList.push(el)
  })
  devRemoveList.forEach((el) => {
    el.remove()
  })
  // console.log('all videos disabled ')
}

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const introCard = sel('.intro-sec__card')

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

const mapCards = selAll('.map-sec__card')
const mapCardsWrap = selAll('.map-sec__card-wrap')
const mapCardsWrapIn = selAll('.map-sec__card-wrapin')

mapCardsWrap.forEach((el) => {
  gsap.set(el, { opacity: 0, position: 'fixed', top: '55%', translateY: '-50%' })
  // el.style.opacity = 0
  // el.style.display = 'none'
})

ScrollTrigger.create({
  // animation: gsap.timeline().to(mapCards[0], { opacity: 0.5 }),
  trigger: mapCards[1],
  start: 'center center',
  end: 'top top',
  // pin: mapCards[1],
  scrub: 1,
  // snap: 1,
})
const mapSec = sel('.map-sec')
const map = sel('.map-sec__map')
const mapWrap = sel('.map-sec__map-wrap')
const mapWrapIn = sel('.map-sec__map-wrapIn')
const mapFg = sel('.map__fg')
const mapFgWrap = sel('.map__fg-wrap')
const mapDots = selAll('.map__dot')
const mapBg = sel('.map__bg-img')
const mapBgWrap = sel('.map__bg-wrap')

const cardSpeed = 0.5

ScrollTrigger.create({
  animation: gsap
    .timeline({ defaults: { ease: 'none', duration: 5 } })
    // .set([...mapCards], { opacity: 0.001 }, '<')
    .to(mapFg, { y: '-20vh' }, 0)
    .to(mapBg, { y: '-10vh' }, 0)
    .to(mapFg, { scale: 1.2 }, 0)
    .to(mapBg, { scale: 1.2 * 0.84 }, 0)
    .to(
      {},
      {
        onComplete: () => gsap.timeline().to(mapCardsWrap[0], { opacity: 1, top: '50%', duration: cardSpeed }),
        onReverseComplete: () => {
          // gsap.killTweensOf(mapCardsWrap[0])
          gsap.timeline().to(mapCardsWrap[0], { opacity: 0, top: '55%', duration: cardSpeed })
        },
        duration: 0.001,
      },
      3
    )
    .addLabel('mapIntroDone', '>'),
  trigger: mapSec,
  start: 'top 80%',
  end: 'top top',
  scrub: 1,
  // snap: 1,
})
const mapScrollTl = gsap
  .timeline({ defaults: { ease: 'none', duration: 5 } })
  .addLabel('card-a')
  .to(mapFgWrap, { y: '-60vh' }, 0)
  .to(mapBgWrap, { y: -60 * 0.8 + 'vh' }, 0)
  .to(
    {},
    {
      onComplete: () => gsap.timeline().to(mapCardsWrap[0], { opacity: 0, top: '45%', duration: cardSpeed }),
      onReverseComplete: () => gsap.timeline().to(mapCardsWrap[0], { opacity: 1, top: '50%', duration: cardSpeed }),
      duration: 0.001,
    },
    2.5 // DO NOT OVERLAP EVENT TWEENS!!! EVA
  )
  // .to(mapCardsWrapIn[0], { opacity: 0, y: '-5vh', duration: 1 }, 1)
  .addLabel('card-b', 5)
  .to(
    {},
    {
      onStart: () => gsap.timeline().to(mapCardsWrap[1], { opacity: 1, top: '50%', duration: cardSpeed }),
      onReverseComplete: () => {
        // gsap.killTweensOf(mapCardsWrap[1])
        gsap.timeline().to(mapCardsWrap[1], { opacity: 0, top: '55%', duration: cardSpeed })
      },
      duration: 0.001,
    },
    3.5
  )
  .set([mapFgWrap, mapBgWrap], { transformOrigin: '100% 60%' })
  .to(mapFgWrap, { scale: 1.9 }, 5)
  .to(mapBgWrap, { scale: 1.9 * 0.8 }, 5)
  .to(
    {},
    {
      onComplete: () => gsap.timeline().to(mapCardsWrap[1], { opacity: 0, top: '45%', duration: cardSpeed }),
      onReverseComplete: () => gsap.timeline().to(mapCardsWrap[1], { opacity: 1, top: '50%', duration: cardSpeed }),
      duration: 0.001,
    },
    7.5
  )
  .addLabel('card-c', 10)
  .to(
    {},
    {
      onStart: () => gsap.timeline().to(mapCardsWrap[2], { opacity: 1, top: '50%', duration: cardSpeed }),
      onReverseComplete: () => {
        // gsap.killTweensOf(mapCardsWrap[2])
        gsap.timeline().to(mapCardsWrap[2], { opacity: 0, top: '55%', duration: cardSpeed })
      },
      duration: 0.001,
    },
    8.5
  )
  .to(mapFgWrap, { y: '-85vh' }, 10)
  .to(mapBgWrap, { y: -85 * 0.8 + 'vh' }, 10)
  .to(
    {},
    {
      onStart: () => gsap.timeline().to(mapCardsWrap[2], { opacity: 0, top: '45%', duration: cardSpeed }),
      // onComplete: () => gsap.timeline().set(mapCardsWrap[1], { opacity: 0, top: '60%' }),
      onReverseComplete: () => gsap.timeline().to(mapCardsWrap[2], { opacity: 1, top: '50%', duration: cardSpeed }),
      duration: 0.001,
    },
    14
  )
  .addLabel('finish', 15)

ScrollTrigger.create({
  animation: mapScrollTl,
  trigger: mapSec,
  // startTrigger: '.map-sec',
  // endTrigger: mapCards[2],
  start: 'top top',
  end: 'bottom+=1000 top',
  pin: '.map-sec__map-wrap',
  scrub: 1,
  // snap: 'labelsDirectional',
  duration: { min: 0.2, max: 1 },
  // delay: 0.0,
  // anticipatePin: true,
  // pinSpacing: true,
  // pinType: 'fixed',
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
