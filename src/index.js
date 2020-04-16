import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import './scss/app.scss';
const SmoothScroll = require('smooth-scroll');
const navLinks = [...document.querySelectorAll('a[href*="#"]')];
const scroll = new SmoothScroll();
const body = document.body;
const heroes = [...document.querySelectorAll('.hero')];
let currentHero = null;

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

navLinks.forEach((link) => {
  link.onclick = (e) => {
    e.preventDefault();
    console.log(e.target)
    if (e.target.localName !== 'a') makeLinkActive(e.target.parentElement);
    makeLinkActive(e.target);
  }
});

const disableAllLinks = (links) => {
  links.forEach((link) => link.classList.remove('active'));
};

const makeLinkActive = (link) => {
  disableAllLinks(navLinks);
  link.classList.add('active');
  const id = link.href.split('#')[1];
  const el = document.getElementById(id);
  currentHero = el;
  scroll.animateScroll(el);
};

const allLinks = [...document.querySelectorAll('a')];
allLinks.map(link => {
  if (!link.getAttribute("href").includes('#')) {
    link.target = "_blank"
  }
});

const scrollDown = (index) => {
  if (index === heroes.length-1) return;
  if (index < 0) {
    scroll.animateScroll(heroes[0], null, {speed: 500});
    makeLinkActive(document.querySelector(`a[href="#${heroes[0].id}"]`));
    return;
  }
  scroll.animateScroll(heroes[index+1], null, {speed: 500});
  makeLinkActive(document.querySelector(`a[href="#${heroes[index+1].id}"]`));
};

const scrollUp = (index) => {
  if (index <= 0) {
    currentHero = null;
    disableAllLinks(navLinks);
    scroll.animateScroll(body, null, {speed: 500});
    return;
  }
  scroll.animateScroll(heroes[index-1], null, {speed: 500});
  makeLinkActive(document.querySelector(`a[href="#${heroes[index-1].id}"]`));
};

const enableScrollEvent = () => {
  let time = Date.now();
  window.addEventListener('wheel', (e) => {
    if (window.innerWidth <= 1366) return;
    e.preventDefault();
    if ((time + 1200 - Date.now()) < 0) {
      const index = heroes.indexOf(currentHero);
      if (Math.sign(e.deltaY) < 0) scrollUp(index);
      else scrollDown(index);
      time = Date.now()
    }
  }, {passive: false});
};

enableScrollEvent();