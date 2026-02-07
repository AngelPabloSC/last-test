/**
 * Scroll Animations Hook
 * Observes elements with data-animate attribute and adds animated class when visible
 */

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
}

export function initScrollAnimations(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    staggerDelay = 0
  } = options;

  const animatedElements = document.querySelectorAll("[data-animate]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          
          // Apply stagger delay if specified
          const delay = staggerDelay > 0 ? index * staggerDelay : 100;
          
          setTimeout(() => {
            el.classList.add("animated");
          }, delay);
          
          observer.unobserve(el);
        }
      });
    },
    {
      threshold,
      rootMargin
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

/**
 * Initialize scroll animations with stagger effect for cards
 */
export function initStaggeredAnimations(staggerDelay: number = 150) {
  initScrollAnimations({ staggerDelay });
}

/**
 * Initialize scroll animations with custom options
 */
export function initCustomScrollAnimations(options: ScrollAnimationOptions) {
  initScrollAnimations(options);
}
