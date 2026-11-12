import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const body = document.body;
const header = document.querySelector('.site-header');
const menuTrigger = document.querySelector('#menuTrigger');
const menuOverlay = document.querySelector('#fullMenu');
const menuLinks = [...document.querySelectorAll('.menu-overlay a')];
const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

let isMenuOpen = false;
function setMenu(open) {
  isMenuOpen = open;
  body.classList.toggle('menu-open', open);
  menuTrigger.setAttribute('aria-expanded', String(open));
  menuTrigger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuOverlay.setAttribute('aria-hidden', String(!open));
  menuOverlay.inert = !open;
  if (open) {
    menuLinks[0]?.focus({ preventScroll: true });
  } else {
    menuTrigger.focus({ preventScroll: true });
  }
}
menuTrigger.addEventListener('click', () => setMenu(!isMenuOpen));
menuLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && isMenuOpen) setMenu(false);
  if (event.key === 'Tab' && isMenuOpen) {
    const focusables = [menuTrigger, ...menuLinks];
    const idx = focusables.indexOf(document.activeElement);
    if (event.shiftKey && idx === 0) { event.preventDefault(); focusables.at(-1).focus(); }
    else if (!event.shiftKey && idx === focusables.length - 1) { event.preventDefault(); focusables[0].focus(); }
  }
});

// Sticky navigation and scroll-progress indicator.
const progressBar = document.querySelector('.progress__bar');
let ticking = false;
function updateScrollState() {
  const y = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle('is-scrolled', y > 45);
  progressBar.style.transform = `scaleX(${total > 0 ? Math.min(y / total, 1) : 0})`;
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(updateScrollState); }
}, { passive: true });
updateScrollState();
document.querySelector('#year').textContent = String(new Date().getFullYear());

const animations = gsap.context(() => {
  if (motionReduced.matches) return;

  const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
  entrance
    .from('.hero__photo', { scale: 1.085, opacity: .5, duration: 1.75, ease: 'power2.out' }, 0)
    .from('.hero__left-index', { y: 12, opacity: 0, duration: .7 }, .2)
    .from('.hero__eyebrow', { y: 18, opacity: 0, duration: .8 }, .22)
    .from('[data-hero-word]', { yPercent: 115, duration: 1.1, stagger: .13, ease: 'power4.out' }, .26)
    .from('.hero__subline', { y: 20, opacity: 0, duration: .85 }, .86)
    .from('.hero__categories', { y: 10, opacity: 0, duration: .7 }, 1.03)
    .from('.hero__bottom', { y: 10, opacity: 0, duration: .7 }, 1.13);

  // Parallax is intentionally subtle to preserve photographic art direction.
  gsap.to('.hero__photo', {
    yPercent: 10, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.hero__contents', {
    yPercent: 16, opacity: .45, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.fromTo('.identity__image-wrap img', { scale: 1.1, yPercent: -3 }, {
    scale: 1, yPercent: 3, ease: 'none',
    scrollTrigger: { trigger: '.identity', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });
  gsap.fromTo('.live__image img', { scale: 1.14, yPercent: -3 }, {
    scale: 1.04, yPercent: 3, ease: 'none',
    scrollTrigger: { trigger: '.live', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    gsap.from(el, {
      y: el.classList.contains('archive-tile') ? 48 : 34,
      opacity: 0,
      duration: 1.05,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });
  gsap.from('.release', {
    y: 65, opacity: 0, stagger: .13, duration: 1.1, ease: 'power3.out',
    clearProps: 'transform,opacity',
    scrollTrigger: { trigger: '.releases', start: 'top 85%', once: true }
  });
});

// Keep media size changes from offsetting ScrollTrigger calculations.
window.addEventListener('load', () => ScrollTrigger.refresh());
if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

// When system reduced-motion setting changes, rebuild animation state.
motionReduced.addEventListener?.('change', () => {
  animations.revert();
  window.location.reload();
});
