let world;
let keyboard = new Keyboard();
let play = false;

function init() {
  let canvas = document.getElementById('canvas');
  setCanvas();
  world = new World(canvas, keyboard);
}

// set Cavas to 16/9 view format
function setCanvas() {
  canvas.height = canvasHeight; // to change the resolution, set canvasHeight "1080(= Full-HD)"
  canvas.width = canvasWidth;
}

window.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowRight') {
    keyboard.right = true;
  }
  if (e.key == 'ArrowLeft') {
    keyboard.left = true;
  }
  if (e.key == ' ') {
    keyboard.space = true;
  }
  if (e.key == 'Shift') {
    keyboard.shift = true;
  }
  if (e.key == 'd') {
    keyboard.d = true;
  }
  if (e.key == 'Escape') {
    keyboard.esc = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key == 'ArrowRight') {
    keyboard.right = false;
  }
  if (e.key == 'ArrowLeft') {
    keyboard.left = false;
  }
  if (e.key == ' ') {
    keyboard.space = false;
  }
  if (e.key == 'Shift') {
    keyboard.shift = false;
  }
  if (e.key == 'd') {
    keyboard.d = false;
  }
  if (e.key == 'Escape') {
    keyboard.esc = false;
  }
});

// Mobile Control
/**
 *
 */
document.getElementById('canvas').addEventListener('touchstart', (e) => {
  e.preventDefault();
});

document.getElementById('m-left').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.left = true;
});

document.getElementById('m-right').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.right = true;
});

document.getElementById('m-d').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.d = true;
});

document.getElementById('m-space').addEventListener('touchstart', (e) => {
  e.preventDefault();
  keyboard.space = true;
});

document.getElementById('m-left').addEventListener('touchend', (e) => {
  keyboard.left = false;
});

document.getElementById('m-right').addEventListener('touchend', (e) => {
  keyboard.right = false;
});

document.getElementById('m-d').addEventListener('touchend', (e) => {
  keyboard.d = false;
});

document.getElementById('m-space').addEventListener('touchend', (e) => {
  keyboard.space = false;
});

function setMobileControle() {
  document.getElementById('mobile-control').style.display = 'flex';
}

function startGame() {
  if ('ontouchstart' in window) {
    setTimeout(setMobileControle(), 1000);
    fullscreenMobile();
  } else {
    //fullscreenDesktop();
    document.getElementById('fullscreen').style.display = 'flex';
    document.getElementById('fullscreen').innerHTML = `
        <img onclick="fullscreenDesktop()" src="img/new_items/enter_fullscreen.png" alt="">
    `;
    closeRest();
    document.getElementById('canvas').style.display = 'flex';
  }

  document.getElementById('start').innerHTML = `Neu Laden`;
  document.getElementById('start').setAttribute('onClick', 'reload()');
  play = true;
}

function openMobileFullscreen() {
  fullscreenMobile();
  document.getElementById('fullscreen').innerHTML = `
        <img onclick="closeMobileFullscreen()" src="img/new_items/exit_fullscreen.png" alt="">
    `;
}

function closeMobileFullscreen() {
  document.getElementById('fullscreen').innerHTML = `
        <img onclick="openMobileFullscreen()" src="img/new_items/enter_fullscreen.png" alt="">
    `;

  document.getElementById('info').style.display = 'flex';
  document.getElementById('mobile-control').style.display = 'flex';
  document.getElementById('canvas').className = '';
  document.getElementById('content').className = 'content';
  document.getElementById('canvas').style.display = 'flex';
}

function openSettings() {
  world.endGameShowLoseIMG();
  closeRest();
  document.getElementById('settings').style.display = 'flex';
}

function openMusic() {
  world.endGameShowLoseIMG();
  closeRest();
  document.getElementById('music').style.display = 'flex';
}

function openBestPlayer() {
  world.endGameShowLoseIMG();
  closeRest();
  document.getElementById('best-player').style.display = 'flex';
}

function closeRest() {
  document.getElementById('start-img').style.display = 'none';
  document.getElementById('best-player').style.display = 'none';
  document.getElementById('music').style.display = 'none';
  document.getElementById('settings').style.display = 'none';
  document.getElementById('game-over').style.display = 'none';
}

function reload() {
  window.location.reload();
}

function fullscreenDesktop() {
  let elem = document.getElementById('canvas');

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    // IE/Edge
    elem.msRequestFullscreen();
  } else if (elem.webkitEnterFullScreen) {
    elem.webkitEnterFullScreen();
  }
}

function fullscreenMobile() {
  document.getElementById('start-img').style.display = 'none';
  document.getElementById('info').style.display = 'none';
  document.getElementById('mobile-control').style.display = 'flex';
  document.getElementById('fullscreen').style.display = 'flex';
  document.getElementById('canvas').classList.add('mobile-canvas');
  document.getElementById('content').className = 'mobile-fullscreen';
}

/**
 * this fn is the global fn for a stoppable setInterval
 *
 * @param {function} fn
 * @param {time} t milliseconds
 */
function setStoppableInterval(fn, t) {
  let id = setInterval(fn, t);
  intervalIds.push(id);
  enemyIntervals.push(id);
}

function setCharacterInterval(fn, t) {
  let id = setInterval(fn, t);
  intervalIds.push(id);
  characterIntervals.push(id);
}

function setWorldInterval(fn, t) {
  let id = setInterval(fn, t);
  worldIntervals.push(id);
}

function stoppAllIntervalls() {
  intervalIds.forEach(clearInterval);
  enemyIntervals.forEach(clearInterval);
  worldIntervals.forEach(clearInterval);
  characterIntervals.forEach(clearInterval);
  intervalIds = [];
  enemyIntervals = [];
  worldIntervals = [];
  characterIntervals = [];
}

function stoppEnemyIntervalls() {
  enemyIntervals.forEach(clearInterval);
}

if (document.addEventListener) {
  document.addEventListener('fullscreenchange', exitHandler, false);
  document.addEventListener('mozfullscreenchange', exitHandler, false);
  document.addEventListener('MSFullscreenChange', exitHandler, false);
  document.addEventListener('webkitfullscreenchange', exitHandler, false);
}

function exitHandler() {
  if (document.webkitIsFullScreen === false) {
    return true;
  } else if (document.mozFullScreen === false) {
    return true;
  } else if (document.msFullscreenElement === false) {
    return true;
  } else {
    return false;
  }
}

function nextLevel() {
  world = [];
  world.push(new World(canvas, keyboard));
}
