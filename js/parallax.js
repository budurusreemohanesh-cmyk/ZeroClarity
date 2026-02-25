/* =============================================
   js/parallax.js — Multi-layer Parallax System
   ============================================= */

window.addEventListener('load', () => {
  const waitForGSAP = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      requestAnimationFrame(waitForGSAP);
      return;
    }
    initParallax();
  };

  const initParallax = () => {
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector('.hero');
    const layer1 = document.querySelector('.hero-layer-1');
    const layer2 = document.querySelector('.hero-layer-2');
    const layer3 = document.querySelector('.hero-layer-3');
    const heroGrid = document.querySelector('.hero-grid');

    if (!hero) return;

    // Layer 1 — Slowest, deepest
    if (layer1) {
      gsap.to(layer1, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }

    // Layer 2 — Medium speed
    if (layer2) {
      gsap.to(layer2, {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Layer 3 — Fastest, closest
    if (layer3) {
      gsap.to(layer3, {
        yPercent: 70,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }

    // Grid subtle parallax
    if (heroGrid) {
      gsap.to(heroGrid, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }

    // Hero content counter-parallax (subtle pull back)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }

    // Scroll indicator fade out
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 0,
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '15% top',
          scrub: true,
        },
      });
    }

    // About cards subtle depth
    const acards = document.querySelectorAll('.acard');
    acards.forEach((card, i) => {
      gsap.to(card, {
        y: (i % 2 === 0 ? -1 : 1) * 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1 + i * 0.3,
        },
      });
    });

    console.log('[Zero Clarity] Parallax system initialized');
  };

  waitForGSAP();
});
