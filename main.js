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
// function raf(time) {
//   lenis.raf(time)
//   requestAnimationFrame(raf)
// }
// requestAnimationFrame(raf)
//
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

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
  case 'lp':
    lp()
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
function blogIntroSec() {
  mm.add('(min-width: 992px)', () => {
    const introCardStAnimation = ScrollTrigger.create({
      animation: gsap.timeline().to('.blog-post__intro-sec__card-wrap', { transform: 'translate(0%, calc(-50% - 150px))' }),
      trigger: '.blog-post__intro-sec',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    })
  })
}
function lp() {
  const lpHero$ = sel('.lp-hero')
  const lpHeroInfo$ = sel('.lp-hero__info')
  const lpHeroTitle$ = sel('.lp-hero__title')
  const lpHeroSubtitle$ = sel('.lp-hero__subtitle')
  const lpHeroP$ = sel('.lp-hero__p')
  const lpHeroIntroTl = gsap
    .timeline({ defaults: { ease: 'power4.out', duration: 1 } })
    .from(lpHeroTitle$, { y: '100%' }, 0)
    .from(lpHeroSubtitle$, { opacity: 0 }, 0.5)
    .from(lpHeroP$, { opacity: 0 }, 0.8)
  ScrollTrigger.create({
    animation: gsap.timeline().fromTo(lpHeroInfo$, { y: '20%' }, { y: '-30%' }),
    trigger: lpHero$,
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  })
  mm.add('(min-width: 992px)', () => {
    const lpItem$a = selAll('.lp-content__item')
    const lpContentSec$a = selAll('.lp-content-sec')
    lpContentSec$a.forEach((item) => {
      const lpContentBg$ = item.querySelector('.lp-content__bg-wrap')
      const lpContentBgSt$ = item.querySelector('.lp-content__bg-anist')

      const lpBgScTl = gsap.timeline({ defaults: { ease: 'none', duration: 1 } }).to(lpContentBgSt$, { y: '-100vh' }, 0)
      const qwe = ScrollTrigger.create({
        animation: lpBgScTl,
        trigger: item,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: lpContentBg$,
        delay: 0.0,
      })
      // qwe.normalizeScroll(true)
    })
    lpItem$a.forEach((item) => {
      const imgWrap = item.querySelector('.lp-content__img-wrap')
      const imgWrapOut = item.querySelector('.lp-content__img-wrap-out')
      const info = item.querySelector('.lp-content__info')
      const imgAniSt$ = item.querySelector('.lp-content__img-anist')

      const featuresScrollTl = gsap
        .timeline({ defaults: { ease: 'power4.out', duration: 3 } })
        // .to(imgWrap, { marginLeft: 80, marginRight: 80 }, '0')
        .from(imgWrap, { opacity: 0, y: 100 }, 0)
        .from(info, { opacity: 0, y: 100 }, 0.3)
      ScrollTrigger.create({
        animation: featuresScrollTl,
        trigger: item,
        start: 'top 60%',
        duration: { min: 0.2, max: 1 },
        toggleActions: 'play none none reverse',
      })
      ScrollTrigger.create({
        animation: gsap
          .timeline({ defaults: { ease: 'none', duration: 5 } })
          .fromTo(imgAniSt$, { y: '10%' }, { y: '-10%' }, 0)
          .fromTo(imgWrapOut, { y: '10vh' }, { y: '-10vh' }, 0),
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      })
    })
    const lpImgSec$a = selAll('.lp-bg-image-sec')
    lpImgSec$a.forEach((item) => {
      const lpImgBg$ = item.querySelector('.lp-bg-image__bg-img')
      const lpImgBgSt$ = item.querySelector('.lp-bg-image__bg-img-anist')
      const lpImgInfoIn$ = item.querySelector('.lp-bg-image__info-aniin')

      const lpBgScTl = gsap
        .timeline({ defaults: { ease: 'none', duration: 5 } })
        .fromTo(lpImgBgSt$, { scaleY: '100%', y: '0vh', transformOrigin: '0 0' }, { scaleY: '200%', y: '-2vh' }, 0)
        .fromTo(lpImgInfoIn$, { y: '30vh' }, { y: '-30vh' }, 0)
      // .from(lpImgInfoIn$, { opacity: 0, duration: 1 }, 1.2)
      const qwe = ScrollTrigger.create({
        animation: lpBgScTl,
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      })
      // qwe.normalizeScroll(true)
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
  const heroImg = sel('.blog-hero__img')
  const heroImgWrap = sel('.blog-hero__img-wrap')
  const heroInfo = sel('.blog-hero__info')
  const blogCard$a = selAll('.blog-card')
  const blogItems = sel('.blog__items')
  const filterSelect$ = sel('.filter-select__select')
  filterSelect$.querySelector('option:first-child').setAttribute('selected', '')

  let blogCardsTl = gsap
    .timeline()
    .from([blogCard$a[0], blogCard$a[1], blogCard$a[2]], { opacity: 0, y: 100, duration: 1, ease: 'power2.out', stagger: 0.15 }, 0)
  mm.add('(min-width: 992px)', () => {
    {
      filterSelect$.setAttribute('multiple', '')

      gsap
        .timeline({ defaults: { ease: 'power4.out', duration: 3 } })
        .fromTo('html', { '--blog-hero__img-outline-width': 'calc(100% - 300px)', duration: 1 }, { '--blog-hero__img-outline-width': '100%', duration: 1 }, 0)
        .fromTo(heroImgWrap, { width: '100%' }, { width: 520 }, '-=1.4')
        .from(heroInfo, { opacity: 0, y: 100 }, 0)

      ScrollTrigger.create({
        animation: blogCardsTl,
        trigger: blogItems,
        start: 'top center+=25%',
      })
    }
  })
  mm.add('(max-width: 991px)', () => {
    filterSelect$.removeAttribute('multiple')
  })

  const filterCheckItem$a = selAll('.filter-check__item')

  // filterCheckItem$a.forEach((el, i) => {
  //   el.addEventListener('click', function (e) {
  //     // event.preventDefault() // prevent double click trigger for checkboxes&radios
  //     const filterInput = this.querySelector('input')
  //     const filterValue = this.querySelector('span').textContent
  //     if (!filterInput.checked) {
  //       filterInput.checked = true
  //       sel('.filter-select__select').value = filterValue != 'Show All' ? filterValue : ''
  //       // sel('.filter-select__select').selectIndex = i
  //       selAll('.filter-select__select>option')[i].dispatchEvent(new Event('change'))
  //       sel('.filter-select__select').dispatchEvent(new Event('change'))
  //       // console.log(selAll('.filter-select__select>option')[i], i)
  //     }
  //   })
  // })
  // filterCheckItem$a.forEach((el, i) => {
  //   el.addEventListener('click', function (e) {
  //     // event.preventDefault() // prevent double click trigger for checkboxes&radios
  //     const filterInput = this.querySelector('input')
  //     const filterValue = this.querySelector('span').textContent
  //     if (!filterInput.checked) {
  //       filterInput.checked = true
  //       const $select = document.querySelector('.filter-select__select')
  //       const $options = Array.from($select.options)
  //       const optionToSelect = $options.find((item) => item.text === filterValue)
  //       $select.value = optionToSelect.value
  //       $select.focus()
  //       $select.dispatchEvent(keyboardEvent)

  //       $select.dispatchEvent(new Event('change'))

  //       // sel('.filter-select__select').value = filterValue != 'Show All' ? filterValue : ''
  //       // sel('.filter-select__select').selectIndex = i
  //       selAll('.filter-select__select>option')[i].click()
  //       selAll('.filter-select__select>option')[i].dispatchEvent(new Event('change'))
  //       sel('.filter-select__select>option').click()
  //       sel('.filter-select__select>option').dispatchEvent(new Event('change'))
  //       // sel('.filter-select__select').dispatchEvent(new Event('change'))
  //       // console.log(selAll('.filter-select__select>option')[i], i)
  //     }
  //   })
  // })

  // const filterAllCheckbox$ = sel('.filter-check__item--all>input')
  // filterAllCheckbox$.setAttribute('disabled', '')
  // selAll('.filter-check__item:not(.filter-check__item--all').forEach((el) => {
  //   el.addEventListener('click', () => {
  //     if (filterAllCheckbox$.checked) {
  //       filterAllCheckbox$.checked = false
  //       if (blogCardsTl.progress() !== 1) {
  //         blogCardsTl.progress(1)
  //       }
  //     } else {
  //       if (selAll('.filter-check__item>input:checked').length === 0) {
  //         filterAllCheckbox$.checked = true
  //       }
  //     }
  //   })
  // })
}
function blogPost() {
  console.log('blog post')
  blogIntroSec()
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
  const heroClose$ = sel('#aboutX')
  ;[heroClose$, heroBg$].forEach((el) => {
    el.addEventListener('click', (e) => {
      player.stopVideo()
    })
  })
  heroBtn$.addEventListener('click', (e) => {
    player.playVideo()
  })

  introSec()
  const videoHero$ = sel('.video-hero')
  const introSec$ = sel('.intro-sec')
  const blogSec$ = sel('.home-blog-sec')
  const mapSec$ = sel('.map-sec')
  const featuresSec$ = sel('.features-sec')
  let mapSwiper, blogSwiper

  devMode(0)
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
      const devRemoveList = [videoHero$, introSec$, blogSec$]
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

  const blogSlider$ = sel('.home-blog__items-wrap')
  const blogWrapper$ = sel('.home-blog__items')
  const blogCard$a = selAll('.home-blog-card')

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

  mm.add('(min-width: 992px)', () => {
    const cards = selAll('.home-blog-card')
    aboutStTl = gsap
      .timeline({ defaults: { duration: 3, ease: 'none' } })
      .set('.home-blog-sec__bg-wrap', { clipPath: 'inset(50px round 25px)' })
      .from('.home-blog-card', { y: 50 }, 0)
      .to('.home-blog-sec__bg-wrap', { clipPath: 'inset(0px round 0px)' }, '<')
      .to('.home-blog-sec__bg', { scale: 1.04 }, '<')
      .from('.home-blog__title', { opacity: 0 }, '<')

    aboutStAnimation = ScrollTrigger.create({
      animation: aboutStTl,
      trigger: blogSec$,
      start: 'top top',
      end: 'bottom center',
      pin: blogSec$,
      scrub: 1,
    })
    if (blogSwiper) blogSwiper.destroy(true, true)
    blogSlider$.classList.remove('swiper')
    blogWrapper$.classList.remove('swiper-wrapper')
    blogCard$a.forEach((el) => {
      el.classList.remove('swiper-slide')
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
    gsap.set(mapFg$, { x: '-10vw' })

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
      .to('.map__bg-wrap', { opacity: 0, duration: 3 }, '10')

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
    blogSlider$.classList.add('swiper')
    blogWrapper$.classList.add('swiper-wrapper')
    blogCard$a.forEach((el) => {
      el.classList.add('swiper-slide')
    })
    mapCardsWrapIn$.classList.add('swiper')
    mapCards$.classList.add('swiper-wrapper')
    mapCardWrap$a.forEach((el) => {
      el.classList.add('swiper-slide')
    })
    blogSwiper = new Swiper('.home-blog__items-wrap', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 16,
      // modules: [Autoplay],
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
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
