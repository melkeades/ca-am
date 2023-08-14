import './style.styl'
import '@chenfengyuan/datepicker/src/css/datepicker.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Flip from 'gsap/Flip'
import Lenis from '@studio-freight/lenis'
import Swiper from 'swiper'
import { Navigation, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import $ from 'jquery'
import * as datepicker from '@chenfengyuan/datepicker'
// import { Application, Assets, Sprite } from 'pixi.js'
// import * as PIXI from 'pixi.js'

gsap.registerPlugin(ScrollTrigger, Flip)
const mm = gsap.matchMedia()

const sel = (e) => document.querySelector(e)
const selAll = (e) => document.querySelectorAll(e)

const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

const globalStylesEmbed$ = sel('.global-styles')
const primColor = getComputedStyle(globalStylesEmbed$).getPropertyValue('color')
document.querySelector(':root').style.setProperty('--primary-color', primColor, 'important')
// const connectBtn$ = document.querySelector('.navbar .btn')
// const connectLink$ = document.querySelector('.navbar__link--connect')
// ;[connectBtn$, connectLink$].forEach((el) => {
//   el.addEventListener('click', () => {
//     // document.querySelector('.connect-mod__trigger').click()
//   })
// })

switch (sel('.page-wrapper').getAttribute('data-page')) {
  case 'home':
    home()
    break
  case 'canvas':
    canvas()
    break
  case 'blog':
    blog()
    break
  case 'blog-post':
    blogPost()
    break
  case 'news':
    news()
    break
  case 'contest':
    contest()
    break
  case '':
    console.log('no data-page provided')
    break
  default:
    console.log('unknown data-page')
}

function introSec() {
  mm.add('(min-width: 992px)', () => {
    const introCardStAnimation = ScrollTrigger.create({
      animation: gsap.timeline().to('.intro-sec__card-wrap', { transform: 'translate(0%, -80%)' }),
      trigger: '.intro-sec',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    })
  })
}
function contest() {
  // console.log('co')
  $('[data-toggle="datepicker"]').datepicker({
    format: 'mm-dd-yyyy',
  })
  // Available date placeholders:
  // Year: yyyy
  // Month: mm
  // Day: dd
  if (window.innerWidth < 768) {
    $('[data-toggle="datepicker"]').attr('readonly', 'readonly')
  }
}

function canvas() {
  console.log('canvas')

  const canvasWrap$ = sel('.canvas-wrap')
  let canvasWrapWidth = canvasWrap$.clientWidth
  let canvasWrapHeight = canvasWrap$.clientHeight
  const app = new PIXI.Application({
    width: canvasWrapWidth,
    height: canvasWrapHeight,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    antialias: true,
    backgroundAlpha: 0,
  })
  canvasWrap$.appendChild(app.view)

  // const svg = 'https://uploads-ssl.webflow.com/64b5d89ecbb311f07e71739b/64c4afa6434d9807c6f188a7_map-woDots-pos2.svg'
  const svg = 'https://uploads-ssl.webflow.com/64b5d89ecbb311f07e71739b/64c5e88c111fbd713e2bc774_map-woDots-pos4096.svg'
  // const svg = 'https://uploads-ssl.webflow.com/64b5d89ecbb311f07e71739b/64c5e28cf22c3195f7e614c7_map-woDots-pos9000-01.svg'
  // const svg = 'https://uploads-ssl.webflow.com/64b5d89ecbb311f07e71739b/64c5e3610bcb95fd6720e36d_map-woDots-pos9000-01.webp'
  const tex = PIXI.Texture.from(svg)
  // const tex = PIXI.Texture.from(svg, { resourceOptions: { scale: 3 } })
  const sprite = new PIXI.Sprite(tex)
  const cont = new PIXI.Container()
  cont.pivot.set(1, 0)
  app.stage.addChild(cont)
  sprite.scale.set(0.1)
  sprite.anchor.set(1, 0)
  sprite.position.set(canvasWrapWidth, 0)
  cont.addChild(sprite)

  app.ticker.stop()
  gsap.ticker.add(() => {
    // sprite.position.set(canvasWrapWidth, 0)
    app.ticker.update()
  })
  let canvasSc = null
  const canvasScInit = () => {
    canvasSc = ScrollTrigger.create({
      animation: gsap
        .timeline({ defaults: { ease: 'none' } })
        .to(sprite.scale, { x: 1, y: 1 }, 0)
        .to(sprite, { y: -5400 }, 0)
        .to(cont, { x: 1000 }),
      pin: true,
      trigger: '.canvas-wrap',
      start: 'top top',
      end: 'bottom+=1000 top',
      scrub: 1,
    })
  }
  canvasScInit()
  window.addEventListener(
    'resize',
    debounce(() => {
      canvasSc.kill()
      canvasWrapWidth = canvasWrap$.clientWidth
      canvasWrapHeight = canvasWrap$.clientHeight
      app.renderer.resize(canvasWrapWidth, canvasWrapHeight)
      sprite.position.set(canvasWrapWidth, 0)
      canvasScInit()
    })
  )
}
function news() {
  // const heroTitle$ = sel('.blog-hero__title')
  // const heroBtn$ = sel('.blog-hero__info .btn-outline')
  // const heroVideo$ = sel('.blog-hero__video')
  // ;[heroTitle$, heroBtn$].forEach((el) => {
  //   const rec = heroVideo$.getBoundingClientRect()
  //   el.addEventListener('click', (e) => {
  //     heroVideo$.click()
  //   })
  // })
  const lightbox_ = '.w-lightbox-content.w-lightbox-group'
  const lightboxStrip_ = '.w-lightbox-strip'
  const sheet = new CSSStyleSheet()
  sheet
    .replace(`${lightbox_} { height: 100% !important; } ${lightboxStrip_} { display: none !important;}`)
    .then((document.adoptedStyleSheets = [sheet]))
    .catch((err) => {
      console.error('Failed to replace styles:', err)
    })
}
function blog() {
  mm.add('(min-width: 992px)', () => {
    {
      const heroImg = sel('.blog-hero__img')
      const heroImgWrap = sel('.blog-hero__img-wrap')
      const heroInfo = sel('.blog-hero__info')
      const blogCard$a = selAll('.blog-card')
      const blogItems = sel('.blog__items')

      gsap
        .timeline({ defaults: { ease: 'power4.out', duration: 3 } })
        .from('html', { '--blog-hero__img-outline-width': 'calc(100% - 300px)', duration: 1 }, 0)
        .fromTo(heroImgWrap, { width: '100%' }, { width: 520 }, '-=1.4')
        .from(heroInfo, { opacity: 0, y: 100 }, 0)

      if (document.documentElement.clientHeight / 2 < blogCard$a[0].getBoundingClientRect().top) {
        ScrollTrigger.create({
          animation: gsap
            .timeline()
            .from([blogCard$a[0], blogCard$a[1], blogCard$a[2]], { opacity: 0, y: 100, duration: 1, ease: 'power2.out', stagger: 0.15 }, 0),
          trigger: blogItems,
          start: 'top center',
        })
      }
    }
  })
}
function blogPost() {
  console.log('blog post')
  introSec()
  const videoFrame = sel('.intro-sec__video iframe')
  const blogPostIntroSec$ = sel('.blog-post__intro-sec-wrap')
  if (!blogPostIntroSec$.classList.contains('w-condition-invisible')) {
    const ytRegEx = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi
    const ytId = ytRegEx.exec(videoFrame.src)[1]
    const ytLink = `https://www.youtube.com/embed/${ytId}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=${ytId}`
    videoFrame.src = ytLink
    console.log(ytLink)
  }
}

function home() {
  const heroBtn$ = sel('#aboutBtn')
  const heroBg$ = sel('#aboutBg')
  // ;[heroBtn$, heroBg$].forEach((el) => {    addEventListener(el, 'click', (e) => {})  })
  heroBtn$.addEventListener('click', (e) => {
    // console.log('play')
    player.playVideo()
  })

  heroBg$.addEventListener('click', (e) => {
    // console.log('stop')
    player.stopVideo()
  })
  introSec()

  const videoHero$ = sel('.video-hero')

  const introSec$ = sel('.intro-sec')
  const aboutSec$ = sel('.about-sec')
  const mapSec$ = sel('.map-sec')
  const featuresSec$ = sel('.features-sec')
  let mapSwiper

  devMode(1)
  function devMode(mode) {
    if (mode === 0) {
      return
    } else if (mode === 1) {
      let i = 0
      document.querySelectorAll('[data-video-urls]').forEach((el) => {
        el.querySelector('video').remove()
        i++
      })
      console.log('devMode, removed videos:', i)
    } else if (mode === 2) {
      const devRemoveList = [videoHero$, introSec$, aboutSec$]
      devRemoveList.forEach((el) => {
        el.remove()
      })
      // sel('.page-wrapper').style.paddingTop = '80vh'
      console.log('devMode: removing sections')
    }
  }

  const mapCardsWrapIn_ = '.map-sec__cards-wrapin' // swiper
  const mapCards_ = '.map-sec__cards' // swiper-wrapper
  const mapCardWrap_ = '.map-sec__card-wrap' // swiper-slide
  const mapCardsWrapIn$ = sel(mapCardsWrapIn_) // swiper
  const mapCardsWrapIn$a = selAll(mapCardsWrapIn_) // swiper
  const mapCards$ = sel(mapCards_) // swiper-wrapper
  const mapCardWrap$a = selAll(mapCardWrap_) // swiper-slide

  const mapSec_ = 'map-sec'

  const mapFg$ = sel('.map__fg')
  const mapFgWrap$ = sel('.map__fg-wrap')
  const mapBg$ = sel('.map__bg-img')
  const mapBgWrap$ = sel('.map__bg-wrap')

  const cardSpeed = 0.5
  let mapCardInAni
  let mapCardOutAni
  let mapScrollInitTl

  let mapScrollTl
  const featuresItem$a = selAll('.features-sec__item')
  const featuresImg_ = 'features-sec__img'
  const featuresImgWrap_ = 'features-sec__img-wrap'
  const featuresInfo_ = 'features-sec__info'
  const aboutProgressBar$a = selAll('.progress-line__bar')

  let introCardStAnimation, aboutStAnimation, mapStAnimation, mapInitStAnimation, featuresStAnimation, featuresScrollTl
  let introCardStTl
  let aboutStTl
  let mapDotsObserver

  const aboutSwiper = new Swiper('.about-sec__slider', {
    // init: false,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    modules: [Navigation, Autoplay, EffectFade],
    speed: 1000,
    rewind: true, // nextEl button rewinds
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    effect: 'fade',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      stopOnLastSlide: false,
    },
    on: {
      realIndexChange: (s) => {
        selAll('.progress__title.is--active').forEach((el) => {
          el.classList.remove('is--active')
        })
        selAll('.progress__title')[s.realIndex].classList.add('is--active')
      },
    },
    navigation: {
      nextEl: '.arrow-right',
      prevEl: '.arrow-left',
    },
  })
  aboutSwiper.autoplay.pause()
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSwiper.autoplay.resume()
          // console.log('about swiper started')
        } else {
          aboutSwiper.autoplay.pause()
          // console.log('about swiper stopped')
        }
      })
    },
    {
      root: null, // relative to the viewport
      threshold: 0.8, // 80% of the section's in viewport
    }
  ).observe(aboutSec$)

  mm.add('(min-width: 992px)', () => {
    console.log('adding sc')
    selAll('.progress__title').forEach((el, i) => {
      el.addEventListener('click', () => {
        aboutSwiper.slideTo(i)
      })
    })

    if (mapSwiper) mapSwiper.destroy(true, true)
    mapCardsWrapIn$.classList.remove('swiper')
    mapCards$.classList.remove('swiper-wrapper')
    mapCardWrap$a.forEach((el) => {
      el.classList.remove('swiper-slide')
    })

    mapCardInAni = (i) => {
      if (elementInViewport('.' + mapSec_)) {
        // prevent overlapping tweens on fast scroll (end/home on keyboard)
        gsap.timeline().to(mapCardWrap$a[i], { opacity: 1, top: '50%', duration: cardSpeed })
      }
    }
    mapCardOutAni = (i, scrollDirection = 'scrollingDown') => {
      const direction = scrollDirection === 'scrollingUp' ? '55%' : '45%'
      gsap.timeline().to(mapCardWrap$a[i], { opacity: 0, top: direction, duration: cardSpeed })
    }

    mapScrollInitTl = gsap
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
    aboutStTl = gsap
      .timeline({ defaults: { duration: 3 } })
      // .set('.card', { position: 'fixed' })
      .set('.about-sec__item-wrap', { clipPath: 'inset(80px round 40px)' })
      .to('.about-sec__item-wrap', { clipPath: 'inset(0px round 0px)' }, '<')
      .to('.about-sec__slide__bg', { scale: 1.06 }, '<')
      // .from('.card', { y: 50, opacity: 0, duration: 1.2 }, 0)
      .from('.about-sec__progress', { opacity: 0, duration: 2 }, 1)
    // .to('.about-sec__item-wrap', { borderRadius: '0', top: '0', bottom: '0', left: '0', right: '0' }, '<')
    // .set('.card', { position: 'absolute' })
    const mapDuration = 15
    const mapShift = 100
    mapScrollTl = gsap
      .timeline({ defaults: { ease: 'none', duration: 5 } })
      .addLabel('card-a')
      .to(mapFgWrap$, { y: -mapShift + 'vh', duration: mapDuration }, 0)
      .to(mapBgWrap$, { y: -mapShift * 0.4 + 'vh', duration: mapDuration }, 0)
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
      .set(selAll('.map-sec__card-wrapin')[0], { opacity: 0 }, 3.49)
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

    aboutStAnimation = ScrollTrigger.create({
      animation: aboutStTl,
      trigger: aboutSec$,
      start: 'top top',
      end: 'bottom center',
      pin: aboutSec$,
      scrub: 1,
    })
    mapStAnimation = ScrollTrigger.create({
      animation: mapScrollTl,
      trigger: mapSec$,
      start: 'top top',
      end: 'bottom+=1000 top',
      pin: '.map-sec__map-wrap',
      scrub: 1,
      snap: 'labelsDirectional',
      duration: { min: 0.2, max: 1 },
    })

    mapCardWrap$a.forEach((el) => {
      gsap.set(el, { opacity: 0, position: 'fixed', top: '55%', translateY: '-50%' })
    })
    mapInitStAnimation = ScrollTrigger.create({
      animation: mapScrollInitTl,
      trigger: mapSec$,
      start: 'top 80%',
      end: 'top top',
      scrub: 1,
      snap: 1,
    })
    featuresItem$a.forEach((item) => {
      const img = item.querySelector('.' + featuresImg_)
      const imgWrap = item.querySelector('.' + featuresImgWrap_)
      const info = item.querySelector('.' + featuresInfo_)

      featuresScrollTl = gsap
        .timeline({ defaults: { ease: 'power2.out', duration: 2 } })
        .to(imgWrap, { marginLeft: 80, marginRight: 80 }, '0')
        .from(imgWrap, { width: '100%' }, '0')
        .from(info, { opacity: 0, y: 100 }, '0')
      featuresStAnimation = ScrollTrigger.create({
        animation: featuresScrollTl,
        trigger: item,
        start: 'top 80%',
        duration: { min: 0.2, max: 1 },
        toggleActions: 'play none none reverse',
      })
    })
  })
  mm.add('(max-width: 991px)', () => {
    mapCardsWrapIn$.classList.add('swiper')
    mapCards$.classList.add('swiper-wrapper')
    mapCardWrap$a.forEach((el) => {
      el.classList.add('swiper-slide')
    })
    mapSwiper = new Swiper('.map-sec__cards-wrapin', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      modules: [Autoplay],
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    })
  })
}

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

function debounce(func, time = 100) {
  let timer
  return function (event) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(func, time, event)
  }
}
