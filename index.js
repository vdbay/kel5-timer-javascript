const timer = document.querySelector('#time');
const start_btn = document.querySelector('#start_btn');
const pause_btn = document.querySelector('#pause_btn');
const reset_btn = document.querySelector('#reset_btn');
const total = document.querySelector('#total');

var timerOn = false;

let time = 0,
  interval;

window.onload = function () {
  if (localStorage.getItem('UTCtimeold') !== null) {
    time=localStorage.getItem('UTCtimeold');
    console.log('onload getitem :' + time);
  } else {
    localStorage.setItem("UTCtimenew", time);
    console.log('onload setitem' + time);
  };
};

function showTime() {
  time += 1;
  timer.innerHTML = toHHMMSS(time);
}

function start() {
  interval = setInterval(showTime, 1000);
  hideBtn([start_btn]);
  hideTotal(total);
  showBtn([pause_btn, reset_btn]);
  timerOn = true;
}

function pause() {
  timerOn = false;
  if (interval) {
    clearInterval(interval);
    interval = null;
    pause_btn.innerHTML = 'RESUME';
  } else {
    interval = setInterval(showTime, 1000);
    pause_btn.innerHTML = 'PAUSE';
  }
}

function reset() {
  timerOn = false;
  clearInterval(interval);
  interval = null;
  pause_btn.innerHTML = 'PAUSE';
  showTotal(total);
  //total.innerHTML = 'Total waktu pengerjaan: '
  total.innerHTML = 'Total : ' + toTotal(time);
  time = 0;
  timer.innerHTML = toHHMMSS(time);
  hideBtn([pause_btn, reset_btn]);
  showBtn([start_btn]);
}

function toHHMMSS(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time - hours * 3600) / 60);
  let seconds = time - hours * 3600 - minutes * 60;

  hours = `${hours}`.padStart(2, '0');
  minutes = `${minutes}`.padStart(2, '0');
  seconds = `${seconds}`.padStart(2, '0');

  return hours + ':' + minutes + ':' + seconds;
}

function toTotal(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time - hours * 3600) / 60);
  let seconds = time - hours * 3600 - minutes * 60;

  hours = `${hours}`;
  minutes = `${minutes}`;
  seconds = `${seconds}`;

  return hours + ' Hours ' + minutes + ' Minute ' + seconds + ' Seconds';
}

function showBtn(btnArr) {
  btnArr.forEach((btn) => (btn.style.display = 'inline-block'));
}
function hideBtn(btnArr) {
  btnArr.forEach((btn) => (btn.style.display = 'none'));
}
function showTotal(Total) {
  Total.style.display = "block";
}
function hideTotal(Total) {
  Total.style.display = "none";
}

window.onbeforeunload = function () {
  if (timerOn) {
    localStorage.setItem("UTCTimeold", time);
    console.log('onbeforeunload setitem' + time);
  }
  else {
    localStorage.removeItem("UTCTimeold");
    console.log('onbeforeunload removeitem');
  }
};
