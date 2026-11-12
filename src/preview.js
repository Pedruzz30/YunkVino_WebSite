// Portable preview only: core Vite app uses GSAP/ScrollTrigger (main.js).
const trigger = document.querySelector('#menuTrigger');
const overlay = document.querySelector('#fullMenu');
const body = document.body;
const progress = document.querySelector('.progress__bar');
const header = document.querySelector('.site-header');
const menuLinks = Array.from(overlay.querySelectorAll('a'));
function setOpen(open) {
  body.classList.toggle('menu-open', open);
  trigger.setAttribute('aria-expanded', String(open));
  trigger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  overlay.setAttribute('aria-hidden', String(!open));
  overlay.inert = !open;
  (open ? menuLinks[0] : trigger).focus({ preventScroll: true });
}
trigger.addEventListener('click', () => setOpen(!body.classList.contains('menu-open')));
menuLinks.forEach(link => link.addEventListener('click', () => setOpen(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && body.classList.contains('menu-open')) setOpen(false);
  if (event.key === 'Tab' && body.classList.contains('menu-open')) {
    const controls = [trigger, ...menuLinks];
    const i = controls.indexOf(document.activeElement);
    if (event.shiftKey && i === 0) { event.preventDefault(); controls.at(-1).focus(); }
    else if (!event.shiftKey && i === controls.length - 1) { event.preventDefault(); controls[0].focus(); }
  }
});
function update() {
  header.classList.toggle('is-scrolled', scrollY > 45);
  progress.style.transform = `scaleX(${Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight))})`;
}
window.addEventListener('scroll', update, { passive: true });
update();
document.querySelector('#year').textContent = new Date().getFullYear();
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.animate([{ opacity: .25, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 780, easing: 'cubic-bezier(.22,1,.36,1)' });
        observer.unobserve(target);
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll('[data-reveal], .release').forEach(el => observer.observe(el));
}
