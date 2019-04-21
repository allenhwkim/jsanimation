const timingFunctions = {
  linear: function(n) { return n; },
  easeIn: function(n) { return Math.pow(n, 1.675); },
  easeOut: function(n) { return 1 - Math.pow(1 - n, 1.675); },
  easeInOut: function(n) { return .5*(Math.sin((n - .5)*Math.PI) + 1); },
  inExpo: function(n) { return 0 == n ? 0 : Math.pow(1024, n - 1); },
  outExpo: function(n) { return 1 == n ? n : 1 - Math.pow(2, -10 * n); },
  inOutExpo: function(n) {
    if (0 == n) return 0;
    if (1 == n) return 1;
    if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
    return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
  },
  bounceEaseOut: function(n) {
    function bounce(n) {
      for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (n >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * n) / 4, 2) + Math.pow(b, 2);
        }
      }
    }
    return 1 - bounce(1 - n);
  }
};

function _draw(el, transform, opacity) { el.style.transform = transform; el.style.opacity = opacity; }
const drawFunctions = {
  fadeIn: function(pct) { this.style.opacity = pct; },
  fadeOut: function(pct) { this.style.opacity = 1-pct; },
  slideInLeft: function(pct) { _draw(this, `translateX(${-100+pct*100}%)`, pct); },
  slideOutLeft: function(pct) { _draw(this, `translateX(${-1*pct*100}%)`, 1-pct); },
  slideInRight: function(pct) { _draw(this, `translateX(${100 - pct*100}%)`, pct); },
  slideOutRight: function(pct) { _draw(this, `translateX(${1*pct*100}%)`, 1-pct); },
  slideInTop: function(pct) { _draw(this, `translateY(${-100+pct*100}%)`, pct); },
  slideOutTop: function(pct) { _draw(this, `translateY(${-1*pct*100}%)`, 1-pct); },
  slideInBottom: function(pct) { _draw(this, `translateY(${100 - pct*100}%)`, pct); },
  slideOutBottom: function(pct) { _draw(this, `translateY(${1*pct*100}%)`, 1-pct); },
  zoomIn: function(pct) { _draw(this, `scale(${pct})`, pct); },
  zoomOut: function(pct) { _draw(this, `scale(${1-pct})`, 1-pct); },
  rotateIn: function(pct) { _draw(this, `rotate(${-180 + pct * 180}deg)`, pct); },
  rotateOut: function(pct) { _draw(this, `rotate(${pct * 180 * -1}deg)`, 1-pct); }
};

function runAnimation(el, drawFn) {
  return animate.bind(el)(Animation.DURATION, Animation.TIMING, drawFunctions[drawFnName]);
}

// return promise, so that user can take after action
export function animate(duration, timingFn, draw) {
  duration = duration || 250;
  timingFn = timingFn || timingFunctions.easeInOut;

  const start = performance.now();
  return new Promise(function(resolve) {
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      (timeFraction > 1) && (timeFraction = 1);
      draw(timingFn(timeFraction), timeFraction);
      timeFraction < 1 ? requestAnimationFrame(animate) : resolve(true);
    });
  });
}

export function fadeIn(el) { runAnimation(el, 'fadeIn'); }
export function fadeOut(el) { runAnimation(el, 'fadeOut'); }
export function slideInLeft(el) { runAnimation(el, 'slideInLeft'); }
export function slideOutLeft(el) { runAnimation(el, 'slideOutLeft'); }
export function slideInRight(el) { runAnimation(el, 'slideInRight'); }
export function slideOutRight(el) { runAnimation(el, 'slideOutRight'); }
export function slideInTop(el) { runAnimation(el, 'slideInTop'); }
export function slideOutTop(el) { runAnimation(el, 'slideOutTop'); }
export function slideInBottom(el) { runAnimation(el, 'slideInBottom'); }
export function slideOutBottom(el) { runAnimation(el, 'slideOutBottom'); }
export function zoomIn(el) { runAnimation(el, 'zoomIn'); }
export function zoomOut(el) { runAnimation(el, 'zoomOut'); }
export function rotateIn(el) { runAnimation(el, 'rotateIn'); }
export function rotateOut(el) { runAnimation(el, 'rotateIn'); }
export const Animation = {DURATION: 250, TIMING: timingFunctions.linear, timingFunctions, drawFunctions};

