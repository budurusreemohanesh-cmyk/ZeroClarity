/* =============================================
   js/lenis-init.js — Smooth Scroll Setup
   ============================================= */

window.addEventListener('DOMContentLoaded', () => {
  // Wait for GSAP and Lenis to be available
  const initLenis = () => {
    if (typeof Lenis === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      requestAnimationFrame(initLenis);
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose globally for other modules
    window.lenisInstance = lenis;

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker for RAF sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP lag smoothing interference
    gsap.ticker.lagSmoothing(0);

    console.log('[ProjectForge] Lenis smooth scroll initialized');
  };

  initLenis();
});
