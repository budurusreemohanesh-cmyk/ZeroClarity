/* =============================================
   js/counters.js — Scroll-triggered Counters
   ============================================= */

window.addEventListener('load', () => {
  const waitForGSAP = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      requestAnimationFrame(waitForGSAP);
      return;
    }
    initCounters();
  };

  const initCounters = () => {
    gsap.registerPlugin(ScrollTrigger);

    const counters = document.querySelectorAll('.counter');

    if (!counters.length) return;

    ScrollTrigger.create({
      trigger: '.stats',
      start: 'top 70%',
      once: true,
      onEnter: () => {
        // Animate counters
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = target > 100 ? 2 : 1.5;

          gsap.fromTo(
            counter,
            { innerText: 0 },
            {
              innerText: target,
              duration,
              ease: 'power2.out',
              snap: { innerText: 1 },
              onUpdate() {
                counter.textContent = Math.ceil(
                  parseFloat(counter.innerText || 0)
                );
              },
            }
          );
        });

        // Animate progress bars
        const bars = document.querySelectorAll('.stat-bar-fill');
        bars.forEach((bar) => {
          const fillPercent = bar.getAttribute('data-fill');
          gsap.to(bar, {
            width: `${fillPercent}%`,
            duration: 1.8,
            ease: 'power3.out',
            delay: 0.3,
          });
        });
      },
    });

    console.log('[ProjectForge] Counters initialized');
  };

  waitForGSAP();
});
