// =========================================================
// ArchiGreenCard — shared behaviour
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---- navbar scroll shadow ---- */
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    });
  }

  /* ---- mobile nav toggle ---- */
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.innerHTML = isOpen
        ? '<i class="fas fa-xmark"></i>'
        : '<i class="fas fa-bars"></i>';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  /* ---- hero slider ---- */
  const slider = document.getElementById('hero-slider');
  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const dotsWrap = slider.querySelector('.slider-dots');
    let current = 0, timer;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.querySelectorAll('.dot'));

    function goTo(i) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function startAuto() { timer = setInterval(next, 5000); }
    function stopAuto() { clearInterval(timer); }

    const nextBtn = slider.querySelector('.slider-arrow.next');
    const prevBtn = slider.querySelector('.slider-arrow.prev');
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); stopAuto(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
    startAuto();
  }

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll('.card, .project-item, .mosaic-tile');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

});
