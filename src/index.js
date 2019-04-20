const Animation = {DURATION: 250, TIMING: undefined, timingFunctions: {}, drawFunctions: {}};

/**
 * timing functions
 */
function tLinear(k) { return k; }
function tEaseIn(k) { return Math.pow(k, 1.675); }
function tEaseOut(k) { return 1 - Math.pow(1 - k, 1.675); }
function tEaseInOut(k) { return .5*(Math.sin((k - .5)*Math.PI) + 1); }
function tInExpo(n) { return 0 == n ? 0 : Math.pow(1024, n - 1); }
function tOutExpo(n) { return 1 == n ? n : 1 - Math.pow(2, -10 * n); }
function tInOutExpo(n) {
  if (0 == n) return 0;
  if (1 == n) return 1;
  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
}
function tBounceEaseOut(t) {
  function bounce(t) {
    for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
      if (t >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * t) / 4, 2) + Math.pow(b, 2);
      }
    }
  }
  return 1 - bounce(1 - t);
}
Animation.TIMING = tLinear;
Animation.timingFunctions = {
  linear: tLinear, easeIn: tEaseIn, easeOut: tEaseOut, easeInOut: tEaseInOut,
  inExpo: tInExpo, outExpo: tOutExpo, inOutExpo: tInOutExpo, bounceEaseOut: tBounceEaseOut,
};

/**
 * draw functions
 */
function _draw(el, transform, opacity) { el.style.transform = transform; el.style.opacity = opacity; }
function dFadeIn(timing) { this.style.opacity = timing; }
function dFadeOut(timing) { this.style.opacity = 1-timing; }
function dSlideInLeft(timing) { _draw(this, `translateX(${-100+timing*100}%)`, timing); }
function dSlideOutLeft(timing) { _draw(this, `translateX(${-1*timing*100}%)`, 1-timing); }
function dSlideInRight(timing) { _draw(this, `translateX(${100 - timing*100}%)`, timing); }
function dSlideOutRight(timing) { _draw(this, `translateX(${1*timing*100}%)`, 1-timing); }
function dSlideInTop(timing) { _draw(this, `translateY(${-100+timing*100}%)`, timing); }
function dSlideOutTop(timing) { _draw(this, `translateY(${-1*timing*100}%)`, 1-timing); }
function dSlideInBottom(timing) { _draw(this, `translateY(${100 - timing*100}%)`, timing); }
function dSlideOutBottom(timing) { _draw(this, `translateY(${1*timing*100}%)`, 1-timing); }
function dZoomIn(timing) { _draw(this, `scale(${timing})`, timing); }
function dZoomOut(timing) { _draw(this, `scale(${1-timing})`, 1-timing); }
function dRotateIn(timing) { _draw(this, `rotate(${-180 + timing * 180}deg)`, timing); }
function dRotateOut(timing) { _draw(this, `rotate(${timing * 180 * -1}deg)`, 1-timing); }
Animation.drawFunctions = {
  fadeIn: dFadeIn, fadeOut: dFadeOut, zoomIn: dZoomIn, zoomOut: dZoomOut, rotateIn: dRotateIn, rotateOut: dRotateOut,
  slideInLeft: dSlideInLeft, slideOutleft: dSlideOutLeft, slideInRight: dSlideInRight, slideOutRight: dSlideOutRight,
  slideInTop: dSlideInTop, slideOutTop: dSlideOutTop, slideInBottom: dSlideInBottom, slideOutBottom: dSlideOutBottom,
};

// return promise, so that user can take after action
function animate(duration, timing, draw) {
  duration = duration || 250;
  timing = timing || Animation.timingFunctions.easeInOut;

  const start = performance.now();
  return new Promise(function(resolve) {
    requestAnimationFrame(function animate(time) {
      let pct = (time - start) / duration;
      (pct > 1) && (pct = 1);
      draw(timing(pct), pct);
      pct < 1 ? requestAnimationFrame(animate) : resolve(true);
    });
  });
}

/**
 * public users functions
 */
function __ani(el, drawFn) { return animate(Animation.DURATION, Animation.TIMING, drawFn.bind(el)); }
export const fadeIn = el => __ani(el, dFadeIn);
export const fadeOut = el => __ani(el, dFadeOut);
export const slideInLeft = el => __ani(el, dSlideInLeft);
export const slideOutLeft = el => __ani(el, dSlideOutLeft);
export const slideInRight = el => __ani(el, dSlideInRight);
export const slideOutRight = el => __ani(el, dSlideOutRight);
export const slideInTop = el => __ani(el, dSlideInTop);
export const slideOutTop = el => __ani(el, dSlideOutTop);
export const slideInBottom = el => __ani(el, dSlideInBottom);
export const slideOutBottom = el => __ani(el, dSlideOutBottom);
export const zoomIn = el => __ani(el, dZoomIn);
export const zoomOut = el => __ani(el, dZoomOut);
export const rotateIn = el => __ani(el, dRotateIn);
export const rotateOut = el => __ani(el, dRotateIn);

export {
  animate, // for customized animation
  Animation, // for simple animation so that users can
             //  1. see all timing/draw functions, 2. set common duration and timing function
};
