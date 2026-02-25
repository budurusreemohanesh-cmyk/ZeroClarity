/* =============================================
   js/svg-animations.js — SVG Path Drawing
   ============================================= */

window.addEventListener('load', () => {
  const waitForGSAP = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      requestAnimationFrame(waitForGSAP);
      return;
    }
    initSVGAnimations();
  };

  const initSVGAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    // ============================
    // About SVG paths
    // ============================
    const svgPaths = document.querySelectorAll('.svg-draw');
    svgPaths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 400;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.about',
          start: 'top 65%',
          once: true,
        },
      });
    });

    // ============================
    // Process timeline path
    // ============================
    const processPath = document.querySelector('.process-path');
    if (processPath) {
      gsap.to(processPath, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.process',
          start: 'top 65%',
          once: true,
        },
      });
    }

    // ============================
    // Service card icon micro-animations
    // ============================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
      const icon = card.querySelector('.service-icon');
      const svgPaths = card.querySelectorAll('path, circle, rect');

      card.addEventListener('mouseenter', () => {
        gsap.fromTo(
          svgPaths,
          { opacity: 0.6, strokeDashoffset: 10 },
          {
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
          }
        );
      });
    });

    // ============================
    // Hero Grid subtle animation
    // ============================
    const heroGrid = document.querySelector('.hero-grid');
    if (heroGrid) {
      gsap.fromTo(
        heroGrid,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power2.out', delay: 1 }
      );
    }

    console.log('[Zero Clarity] SVG animations initialized');
  };

  waitForGSAP();
});
