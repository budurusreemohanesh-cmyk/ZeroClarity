/* =============================================
   js/main.js — Core UI Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // NAV — Scroll behavior
  // ============================
  const nav = document.getElementById('nav');

  const updateNav = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ============================
  // NAV — Hamburger toggle
  // ============================
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.transform = '';
      }
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.transform = '';
      });
    });
  }

  // ============================
  // PORTFOLIO FILTERS (Optimized with GSAP)
  // ============================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  let filterAnimTL = null;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const itemsToHide = [];
      const itemsToShow = [];

      portfolioItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          itemsToShow.push(item);
        } else {
          itemsToHide.push(item);
        }
      });

      // Disable vanilla CSS transitions to prevent conflicts with GSAP
      portfolioItems.forEach(item => item.style.transition = 'none');

      // Kill any running filter animation
      if (filterAnimTL) filterAnimTL.kill();
      filterAnimTL = gsap.timeline();

      // 1. Zoom out and fade out non-matching items
      if (itemsToHide.length) {
        filterAnimTL.to(itemsToHide, {
          opacity: 0,
          scale: 0.85,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            itemsToHide.forEach(item => item.style.display = 'none');
          }
        });
      }

      // 2. Reveal matching items with a staggered bounce effect
      if (itemsToShow.length) {
        filterAnimTL.add(() => {
          itemsToShow.forEach(item => {
            item.style.display = 'block';
            gsap.set(item, { opacity: 0, scale: 0.85, y: 30 });
          });
        });

        filterAnimTL.to(itemsToShow, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          clearProps: 'transform'
        }, itemsToHide.length ? '+=0.05' : 0);
      }
      
      // 3. Refresh ScrollTrigger when done so the page height adjusts properly
      filterAnimTL.add(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });
    });
  });

  // ============================
  // CONTACT FORM — Submission
  // ============================
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalContent = btn.innerHTML;

      // Simple validation
      const inputs = form.querySelectorAll('[required]');
      let valid = true;
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#e74c3c';
          input.addEventListener('input', () => {
            input.style.borderColor = '';
          }, { once: true });
        }
      });

      if (!valid) return;

      // Simulate submission
      btn.innerHTML = '<span>Sending...</span>';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<span>Message Sent! ✓</span>';
        btn.style.background = '#27ae60';
        form.reset();

        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ============================
  // SMOOTH ANCHOR SCROLL (fallback)
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      // Use Lenis if available
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(target, { offset: -80, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================
  // MICRO-INTERACTIONS — Cards tilt
  // ============================
  const tiltCards = document.querySelectorAll('.service-card, .stat-card, [data-tilt]');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });

  // ============================
  // HERO MOUSE INTERACTIONS
  // ============================
  const heroSection = document.getElementById('hero');
  const heroBgFx = document.querySelector('.hero-bg-glow');
  const hCanvas = document.getElementById('hero-canvas');
  
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (heroBgFx) {
        // Glow follows cursor
        heroBgFx.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,200,255,0.25), transparent 60%), linear-gradient(135deg, #081421, #0b2a4a, #0e3a5f)`;
        // Subtle shift (parallax)
        const moveX = (window.innerWidth / 2 - e.clientX) * 0.02;
        const moveY = (window.innerHeight / 2 - e.clientY) * 0.02;
        heroBgFx.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
      
      if (hCanvas) {
        const moveX = (window.innerWidth / 2 - e.clientX) * 0.01;
        const moveY = (window.innerHeight / 2 - e.clientY) * 0.01;
        hCanvas.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });

    // Reset on leave
    heroSection.addEventListener('mouseleave', () => {
      if (heroBgFx) {
        heroBgFx.style.background = `radial-gradient(circle at 30% 40%, rgba(0,200,255,0.2), transparent 60%), linear-gradient(135deg, #081421, #0b2a4a, #0e3a5f)`;
        heroBgFx.style.transform = 'translate(0,0)';
      }
      if (hCanvas) {
        hCanvas.style.transform = 'translate(0,0)';
      }
    });
  }

  // ============================
  // LAZY LOAD — Images
  // ============================
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imgObserver.unobserve(img);
          }
        });
      },
      { rootMargin: '100px' }
    );

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imgObserver.observe(img);
    });
  }

  console.log('[Zero Clarity] Main interactions initialized');
});
