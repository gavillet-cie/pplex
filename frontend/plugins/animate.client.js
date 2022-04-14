import Vue from 'vue'

const animateOnScrollObserver = new IntersectionObserver(
  (entries, animateOnScrollObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('animate-before-enter')
        entry.target.classList.add('animate-enter')

        setTimeout(() => {
          entry.target.classList.remove('animate')
          entry.target.classList.remove('animate-enter')
        }, 1500)

        animateOnScrollObserver.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.2,
  }
)

Vue.directive('animate', {
  bind: (el) => {
    el.classList.add('animate')
    el.classList.add('animate-before-enter')
    animateOnScrollObserver.observe(el)
  },

  unbind: (el) => {
    animateOnScrollObserver.unobserve(el)
  },
})
