import {animate, drawFns} from './animate';
import {timings} from './timings';

const Animation = {
  DURATION: 250,
  TIMING: 'linear',
  timingFunctions: timings,
  drawFunctions: drawFns
};

function __ani(el, drawFn) {
  return animate(Animation.DURATION, Animation.TIMING, drawFn.bind(el));
}
export const fadeIn = el => __ani(el, drawFns.fadeIn);
export const fadeOut = el => __ani(el, drawFns.fadeOut);
export const slideInLeft =  el => __ani(el, drawFns.slideInLeft);
export const slideOutLeft =  el => __ani(el, drawFns.slideOutLeft);
export const slideInRight =  el => __ani(el, drawFns.slideInRight);
export const slideOutRight =  el => __ani(el, drawFns.slideOutRight);
export const slideInTop =  el => __ani(el, drawFns.slideInTop);
export const slideOutTop =  el => __ani(el, drawFns.slideOutTop);
export const slideInBottom =  el => __ani(el, drawFns.slideInBottom);
export const slideOutBottom =  el => __ani(el, drawFns.slideOutBottom);
export const zoomIn =  el => __ani(el, drawFns.zoomIn);
export const zoomOut =  el => __ani(el, drawFns.zoomOut);
export {animate} from './animate'
export const Animation = Animation;
