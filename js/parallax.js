/* =============================================
   js/parallax.js — Canvas Image Sequence & Parallax System
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
    if (!hero) return;

    // ============================
    // CANVAS IMAGE SEQUENCE
    // ============================
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
      const context = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const frameCount = 192;
      const currentFrame = index => `./HERO/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images = [];
      const heroSprite = { frame: 0 };

      // Preload images
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      const render = () => {
        const img = images[heroSprite.frame];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        // Scale to cover the canvas exactly like object-fit: cover, plus zoom to crop the VEO watermark
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const baseRatio = Math.max(hRatio, vRatio);
        
        // Zoom factor of 1.15 to ensure the edges (containing the VEO logo) are cropped out
        const zoomFactor = 1.15;
        const ratio = baseRatio * zoomFactor;

        // Optionally, shift slightly further down if the logo is at the very bottom
        // but centerShift_y natively forces a center crop which usually handles bottom watermarks well.
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      };

      images[0].onload = render;

      // Auto-play the image sequence like a video at ~30 frames per second
      // 192 frames at 30 fps = ~6.4 seconds per loop
      gsap.to(heroSprite, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 6.4,
        repeat: -1, // Infinite loop
        onUpdate: render,
      });

      // Keep canvas sized correctly on window resize
      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
      });
    }

    // ============================
    // COUNTER-PARALLAX (Text & Elements)
    // ============================
    // Ensure the content subtly fades or moves when the user scrolls down,
    // but the hero section itself will NOT be pinned anymore.
    const heroContainer = document.querySelector('.hero-container');
    if (heroContainer) {
      gsap.to(heroContainer, {
        y: 100, // Move down slightly instead
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top", 
          scrub: 1,
        },
      });
    }

    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=30%', // Fade out very quickly
          scrub: true,
        },
      });
    }

    // ============================
    // ABOUT SECTION DEPTH
    // ============================
    // Preserved the subtle floating depth added to the "about" section elements
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

    console.log('[Zero Clarity] Canvas Sequence & Parallax initialized');
  };

  waitForGSAP();
});
