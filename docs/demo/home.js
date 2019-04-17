function setOptions() {
  const durationEl = document.querySelector('.selection .duration-ms select');
  [1000, 250, 500, 2000, 3000, 5000].forEach((key) => {
    durationEl.insertAdjacentHTML('beforeend',
        `<option value="${key}">${key}</option>`);
  });
  durationEl.size = 6;

  const timingsEl = document.querySelector('.selection .timing select');
  for (var key in Animation.timingFunctions) {
    timingsEl.insertAdjacentHTML('beforeend',
        `<option value="${key}">${key}</option>`);
  }
  timingsEl.size = Object.keys(Animation.timingFunctions).length; ;

  const drawEl = document.querySelector('.selection .draw select');
  for (var key in Animation.drawFunctions) {
    drawEl.insertAdjacentHTML('beforeend',
        `<option value="${key}">${key}</option>`);
  }
  drawEl.size = Object.keys(Animation.drawFunctions).length; ;
}

var timer;
function run(key) {
  const el = document.querySelector('.target');
  const durationEl = document.querySelector('.selection .duration-ms select');
  const timingsEl = document.querySelector('.selection .timing select');
  const drawEl = document.querySelector('.selection .draw select');
  const drawFn = Animation.drawFunctions[drawEl.value].bind(el);
  Animation.DURATION = parseInt(durationEl.value);
  Animation.TIMING = Animation.timingFunctions[timingsEl.value];
  document.querySelectorAll('.draw-fn').forEach((el) => el.innerHTML = drawEl.value);
  document.querySelector('.timing-fn').innerHTML = timingsEl.value;
  document.querySelector('.duration').innerHTML = durationEl.value;

  clearTimeout(timer);
  el.removeAttribute('style');
  animate(Animation.DURATION, Animation.TIMING, drawFn)
    .then(function() {
      timer = setTimeout((_) => el.removeAttribute('style'), 1000);
    });
}

function toggleShow() {
  document.querySelector('.show-more').classList.toggle('visible');
  document.querySelector('.show-less').classList.toggle('visible');
}

setOptions();
zoomIn(document.querySelector('.target'));
