import './style.styl'
import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Flip from 'gsap/Flip'
import Lenis from '@studio-freight/lenis'
import Swiper from 'swiper'
import { Navigation, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

gsap.registerPlugin(CSSRulePlugin, ScrollTrigger, Flip)
const mm = gsap.matchMedia()

const sel = (e) => document.querySelector(e)
const selAll = (e) => document.querySelectorAll(e)

const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

switch (sel('.page-wrapper').getAttribute('data-page')) {
  case 'blog':
    blog()
    break
  case 'blog-post':
    blogPost()
    break
  default:
    home()
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
}

function home() {
  const videoHero$ = sel('.video-hero')
  const introSec$ = sel('.intro-sec')
  const aboutSec$ = sel('.about-sec')
  const mapSec$ = sel('.map-sec')
  const featuresSec$ = sel('.features-sec')
  let mapSwiper

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
      const devRemoveList = [videoHero$, introSec$, aboutSec$]
      devRemoveList.forEach((el) => {
        el.remove()
      })
      // sel('.page-wrapper').style.paddingTop = '80vh'
      console.log('devMode: removing sections')
    }
  }

  const introCard$ = sel('.intro-sec__card-wrap')

  const mapCardsWrapIn_ = '.map-sec__cards-wrapin' // swiper
  const mapCards_ = '.map-sec__cards' // swiper-wrapper
  const mapCardWrap_ = '.map-sec__card-wrap' // swiper-slide
  const mapCardsWrap$ = sel('.map-sec__cards-wrap') // wrapper over swiper
  const mapCardsWrapIn$ = sel(mapCardsWrapIn_) // swiper
  const mapCards$ = sel(mapCards_) // swiper-wrapper
  const mapCardWrap$a = selAll(mapCardWrap_) // swiper-slide
  const mapCard$a = selAll('.map-sec__card')
  const mapCardWrapIn$a = selAll('.map-sec__card-wrapin')

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
  const mapDots$a = selAll('.map__dot')
  const mapBg$ = sel('.map__bg-img')
  const mapBgWrap$ = sel('.map__bg-wrap')

  const mapDotRemoveActiveClass = () => {
    const activeDots = [...mapDots$a].filter((el) => el.classList.contains(mapDotActive_))
    activeDots.forEach((el) => el.classList.remove(mapDotActive_))
  }
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
    // disabled: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    modules: [Navigation, Autoplay, EffectFade],
    speed: 1000,
    // rewind: true,
    fadeEffect: {
      crossFade: true,
    },
    effect: 'fade',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      stopOnLastSlide: true,
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        if (s.activeIndex < 2) {
          const progIndex = s.activeIndex > 1 ? 1 : s.activeIndex
          aboutProgressBar$a[progIndex].style.setProperty('--about-progress', (1 - progress) * 100 + '%')
        }
        // progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      },
      realIndexChange: (s) => {
        selAll('.progress__title.is--active').forEach((el) => {
          el.classList.remove('is--active')
        })
        selAll('.progress__title')[s.realIndex].classList.add('is--active')
        const progress = selAll('.progress-line')
        if (s.realIndex === 1) {
          progress[0].classList.add('hide')
          progress[1].classList.remove('hide')
        } else if (s.realIndex === 0) {
          progress[0].classList.remove('hide')
          progress[1].classList.add('hide')
        }
      },
    },
    navigation: {
      nextEl: '.arrow-right',
      prevEl: '.arrow-left',
    },
  })

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
    mapDotRemoveActiveClass()

    mapCardInAni = (i) => {
      if (elementInViewport('.' + mapSec_)) {
        // prevent overlapping tweens on fast scroll (end/home on keyboard)
        gsap.timeline().to(mapCardWrap$a[i], { opacity: 1, top: '50%', duration: cardSpeed })
        mapDots$a[i].classList.add(mapDotActive_)
      }
    }
    mapCardOutAni = (i, scrollDirection = 'scrollingDown') => {
      const direction = scrollDirection === 'scrollingUp' ? '55%' : '45%'
      gsap.timeline().to(mapCardWrap$a[i], { opacity: 0, top: direction, duration: cardSpeed })
      mapDotRemoveActiveClass()
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
    introCardStTl = gsap.timeline().to(introCard$, { transform: 'translate(0%, -80%)' })
    aboutStTl = gsap
      .timeline({ defaults: { duration: 3 } })
      .set('.card', { position: 'fixed' })
      .set('.about-sec__item-wrap', { clipPath: 'inset(80px round 40px)' })
      .to('.about-sec__item-wrap', { clipPath: 'inset(0px round 0px)' }, '<')
      .to('.about-sec__slide__bg', { scale: 1.05 }, '<')
      .from('.about-sec__progress', { opacity: 0, duration: 2 }, 2)
      // .to('.about-sec__item-wrap', { borderRadius: '0', top: '0', bottom: '0', left: '0', right: '0' }, '<')
      .set('.card', { position: 'absolute' })
    mapScrollTl = gsap
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

    introCardStAnimation = ScrollTrigger.create({
      animation: introCardStTl,
      trigger: '.intro-sec',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    })
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
    mapDotsObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList.contains(mapDotActive_)) {
          window.addEventListener('scroll', () => {
            if (mapStAnimation.isActive || mapInitStAnimation.isActive) {
              const mapFgScale = gsap.getProperty(mapFg$, 'scale')
              const mapFgWrapScale = gsap.getProperty(mapFgWrap$, 'scale')
              const lineWidth = (mutation.target.getBoundingClientRect().left - mapCard$a[0].getBoundingClientRect().right - 30) / (mapFgScale * mapFgWrapScale)
              mutation.target.querySelector('.' + mapDotLine_).style.width = lineWidth + 'px'
            }
          })
        }
      })
    })
    for (let mapDot of mapDots$a) {
      mapDotsObserver.observe(mapDot, { attributes: true, attributeFilter: ['class'] })
    }
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
    mapSwiper.on('slideChange', () => {
      mapDotRemoveActiveClass()
      mapDots$a[mapSwiper.activeIndex].classList.add(mapDotActive_)
    })
    mapSwiper.slideNext()
    mapDots$a.forEach((el, i) => {
      el.style.cursor = 'pointer'
      el.addEventListener('click', () => {
        if (!el.classList.contains(mapDotActive_)) {
          console.log('qwe')
          mapDotRemoveActiveClass()
          el.classList.add(mapDotActive_)
          mapSwiper.slideTo(i)
        }
      })
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
