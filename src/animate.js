// timing functions - easein etc
import {timings} from './timings.js';

function draw(el, transform, opacity) {
  el.style.transform = transform;
  el.style.opacity = opacity;
}

export const drawFns = {
  fadeIn: function(pct) {
    this.style.opacity = pct;
  },
  fadeOut: function(pct) {
    this.style.opacity = 1-pct;
  },
  slideInLeft:
    function(pct) {
      draw(this, `translateX(${-100+pct*100}%)`, pct);
    },
  slideOutLeft:
    function(pct) {
      draw(this, `translateX(${-1*pct*100}%)`, 1-pct);
    },
  slideInRight:
    function(pct) {
      draw(this, `translateX(${100 - pct*100}%)`, pct);
    },
  slideOutRight:
    function(pct) {
      draw(this, `translateX(${1*pct*100}%)`, 1-pct);
    },
  slideInTop:
    function(pct) {
      draw(this, `translateY(${-100+pct*100}%)`, pct);
    },
  slideOutTop:
    function(pct) {
      draw(this, `translateY(${-1*pct*100}%)`, 1-pct);
    },
  slideInBottom:
    function(pct) {
      draw(this, `translateY(${100 - pct*100}%)`, pct);
    },
  slideOutBottom:
    function(pct) {
      draw(this, `translateY(${1*pct*100}%)`, 1-pct);
    },
  zoomIn:
    function(pct) {
      draw(this, `scale(${pct})`, pct);
    },
  zoomOut:
    function(pct) {
      draw(this, `scale(${1-pct})`, 1-pct);
    },
  rotateIn:
    function(pct) {
      draw(this, `rotate(${-180 + pct * 180}deg)`, pct);
    },
  rotateOut:
    function(pct) {
      draw(this, `rotate(${pct * 180 * -1}deg)`, 1-pct);
    },
};

export function animate(duration, timing, draw) {
  duration = duration || 250;
  (typeof timing === 'string') && (timing = timings[timing]);
  timing = timing || timings['ease-in-out'];
  // if we only have one argument as function given
  (typeof arguments[0] === 'function') && (draw = arguments[0]);

  const start = performance.now();
  // return promise, so that user can take after action
  return new Promise(function(resolve) {
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      (timeFraction > 1) && (timeFraction = 1);
      draw(timing(timeFraction));
      timeFraction < 1 ? requestAnimationFrame(animate) : resolve(true);
    });
  });
}
