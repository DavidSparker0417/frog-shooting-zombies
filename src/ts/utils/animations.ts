import gsap from 'gsap'

export const gsapFadeIn = (el: string) => {
  gsap.fromTo(
    el,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      ease: 'expo',
    }
  )
}

export const gsapFadeOut = (el: string, onComplete: () => void) => {
  gsap.to(el, {
    opacity: 0,
    scale: 0.8,
    duration: 0.4,
    ease: 'expo.in',
    onComplete,
  })
}
