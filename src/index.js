import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import './scss/app.scss';
const SmoothScroll = require('smooth-scroll');
const scroll = new SmoothScroll('a[href*="#"]');

const allLinks = [...document.querySelectorAll('a')];
allLinks.map(link => {
  if (!link.getAttribute("href").includes('#')) {
    link.target = "_blank"
  }
});