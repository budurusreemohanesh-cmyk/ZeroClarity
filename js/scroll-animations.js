/* =============================================
   js/scroll-animations.js — GSAP ScrollTrigger
   ============================================= */

window.addEventListener('load', () => {
  const waitForGSAP = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      requestAnimationFrame(waitForGSAP);
      return;
    }
    initScrollAnimations();
  };

  const initScrollAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    // ============================
    // NAVBAR — Scroll Progress Indicator
    // ============================
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
      gsap.to(scrollProgress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }

    // ============================
    // HERO — Reveal animations
    // ============================
    const heroElements = document.querySelectorAll('.hero [data-animate]');
    if (heroElements.length) {
      gsap.fromTo(
        heroElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2, // Faster start
        }
      );
    }

    // ============================
    // STATS — Fade up stagger
    // ============================
    const statCards = document.querySelectorAll('[data-stat]');
    if (statCards.length) {
      gsap.fromTo(
        statCards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats',
            start: 'top 75%',
            once: true,
          },
        }
      );
    }

    // ============================
    // ABOUT — Content fade up
    // ============================
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
      gsap.fromTo(
        aboutContent.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            once: true,
          },
        }
      );
    }

    const aboutVisual = document.querySelector('.about-visual');
    if (aboutVisual) {
      gsap.fromTo(
        aboutVisual,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            once: true,
          },
        }
      );
    }

    // ============================
    // SERVICES — Stagger cards
    // ============================
    const serviceCards = document.querySelectorAll('[data-service]');
    if (serviceCards.length) {
      gsap.fromTo(
        serviceCards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services',
            start: 'top 70%',
            once: true,
          },
        }
      );
    }

    // ============================
    // PORTFOLIO — Clip-path reveal
    // ============================
    const portfolioItems = document.querySelectorAll('[data-portfolio]');
    if (portfolioItems.length) {
      gsap.fromTo(
        portfolioItems,
        {
          clipPath: 'inset(20% 0% 80% 0%)',
          opacity: 0,
          y: 30,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 75%',
            once: true,
          },
        }
      );
    }

    // ============================
    // PROCESS — Step reveal
    // ============================
    const processSteps = document.querySelectorAll('[data-step]');
    if (processSteps.length) {
      gsap.fromTo(
        processSteps,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process',
            start: 'top 70%',
            once: true,
          },
        }
      );
    }

    // ============================
    // SECTION HEADERS
    // ============================
    document.querySelectorAll('.section-header').forEach((el) => {
      gsap.fromTo(
        el.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });

    // ============================
    // CONTACT — Form fields animate
    // ============================
    const formGroups = document.querySelectorAll('.form-group');
    if (formGroups.length) {
      gsap.fromTo(
        formGroups,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }

    // Contact info fade
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
      gsap.fromTo(
        contactInfo.children,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            once: true,
          },
        }
      );
    }

    console.log('[Zero Clarity] Scroll animations initialized');
  };

  waitForGSAP();
});
