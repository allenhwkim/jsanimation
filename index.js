// Import stylesheets
import './style.css';
import {Animation, animate, zoomIn} from './animation';

const durationEl = document.querySelector('.duration select');
[1000, 250, 500, 2000, 3000, 5000].forEach((key) => {
  durationEl.insertAdjacentHTML('beforeend',
      `<option value="${key}">${key}</option>`);
});
durationEl.size = 6;

const timingsEl = document.querySelector('.timing select');
for (var key in Animation.timingFunctions) {
  timingsEl.insertAdjacentHTML('beforeend',
      `<option value="${key}">${key}</option>`);
}
timingsEl.size = Object.keys(Animation.timingFunctions).length; ;

const drawEl = document.querySelector('.draw select');
for (var key in Animation.drawFunctions) {
  drawEl.insertAdjacentHTML('beforeend',
      `<option value="${key}">${key}</option>`);
}
drawEl.size = Object.keys(Animation.drawFunctions).length; ;

let timer;
const el = document.querySelector('.target');
const txtEls = document.querySelectorAll('.ani');
window.run = function(key) {
  const drawFn = Animation.drawFunctions[drawEl.value].bind(el);
  Animation.DURATION = durationEl.value;
  Animation.TIMING = timingsEl.value;
  txtEls.forEach((el) => el.innerHTML = drawEl.value);

  clearTimeout(timer);
  el.removeAttribute('style');
  animate(Animation.DURATION, Animation.TIMING, drawFn)
      .then((_) =>
        timer = setTimeout((_) => el.removeAttribute('style'), 3000)
      );
};

zoomIn(el);
