class World {
  deebugmode = false;

  ctx;
  canvas;
  keyboard;

  moveableObject;
  throwableObject;
  character;
  chicken;
  barbedWire;
  endboss;
  level;
  cameraX;
  lastThrow;
  playTime = 0;
  killedEnemies = 0;

  SOUND_THROWING = new Audio('audio/throwing.mp3');
  SOUND_HURT = new Audio('audio/hurt.mp3');
  SOUND_ENDBOSS_HIT = new Audio('audio/chickenHit.mp3');
  SOUND_GAME_OVER = new Audio('audio/gameover.mp3');
  SOUND_COIN_COLLECT = new Audio('audio/coin_collect.mp3');
  SOUND_BOTTLE_COLLECT = new Audio('audio/botle_collect.mp3');

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level1;
    this.ctx = canvas.getContext('2d');
    this.setObjects();
    this.draw();
    this.setWorld();
    this.setLevel();
    this.run();
  }

  setObjects() {
    this.setEnemyObjects();
    this.setBarObjects();
    this.setArreysForItemObjects();
    this.moveableObject = new MovableObjekt();
    this.drawableObject = new DrawableObject();
    this.character = new Character();
  }

  setArreysForItemObjects() {
    this.throwableObject = [];
    this.coins = [];
    this.bottles = [];
  }

  setBarObjects() {
    this.healthBar = new HealthBar();
    this.coinBar = new CoinBar();
    this.bottleBar = new BottleBar();
    this.endbossHealthBar = [];
    this.endboss.forEach((eb, i) => {
      this.endbossHealthBar.push(new EndbossHealthBar());
      this.endbossHealthBar[i].maxEnergy = eb.maxEnergy;
    });
  }

  setEnemyObjects() {
    this.chicken = new Chicken();
    this.smallChicen = new SmallChicken();
    this.endboss = [new Endboss()];
    this.barbedWire = new BarbedWire();
  }

  run() {
    setWorldInterval(this.pepeCollidingEnemies.bind(this), 1);
    setWorldInterval(this.enemyCollidingPepe.bind(this), 1);
    setWorldInterval(this.checkThrowing.bind(this), 1);
    setWorldInterval(this.throwingBottleColliding.bind(this), 1);
    setWorldInterval(this.coinColliding.bind(this), 1);
    setWorldInterval(this.bottleColliding.bind(this), 1);
    setWorldInterval(this.proofCharacterSeeBoss.bind(this), 1);
    setWorldInterval(this.proofGameEnd.bind(this), 100);
    setWorldInterval(this.deleteEnemiesIfdead.bind(this), 1);
    setWorldInterval(this.playtimecounter.bind(this), 1000);
  }

  playtimecounter() {
    if (play) {
      this.playTime += 1;
    }
  }

  deleteEnemiesIfdead() {
    this.level.enemies.forEach((enemy, i) => {
      if (enemy.deadTime > 100) {
        this.level.enemies.splice(i, 1);
      }
    });
    this.endboss.forEach((eb, i) => {
      if (eb.isDead && eb.animationIndex > 15) {
        this.character.distanceToEndboss = 5000;
        this.endboss.splice(i, 1);
      }
    });
  }

  pepeCollidingEnemies() {
    this.pepeColliding(this.level.enemies);
    this.pepeColliding(this.endboss);
  }

  proofCharacterSeeBoss() {
    this.endboss.forEach((eb) => {
      eb.distanceToCharacter = eb.x - this.character.x;
      if (!eb.dead) {
        this.character.distanceToEndboss = eb.x - this.character.x;
      }
      if (!eb.firstContact && eb.x - this.character.x < 1370) {
        eb.firstContact = true;
      }
    });
  }

  proofGameEnd() {
    if (this.endboss.length <= 0) {
      stoppEnemyIntervalls();
      play = false;
    }
    this.disableMouseByFullscreen();
    if (this.character.energy <= 0) {
      this.SOUND_GAME_OVER.play();
    }
    if (this.character.y >= canvasHeight) {
      stoppAllIntervalls();
      this.endGameShowLoseIMG();
    }
    if (this.endboss.length == 0) {
      this.endGameShowWinScreen();
    }
  }

  disableMouseByFullscreen() {
    if (!exitHandler()) {
      document.querySelector('body').style = 'cursor: none;';
    } else {
      document.querySelector('body').style = 'cursor: default;';
    }
  }

  endGameShowLoseIMG() {
    this.calculatePoints();
    if (!exitHandler()) {
      document.exitFullscreen();
      document.querySelector('body').style = 'cursor: default;';
    }
    this.setIndexDivsforLose();
  }

  setIndexDivsforLose() {
    closeMobileFullscreen();
    document.getElementById('fullscreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('mobile-control').style.display = 'none';
    document.getElementById('game-over').style.display = 'flex';
    document.getElementById('points-quantity').innerHTML = `${points}`;
    document.getElementById('killed-enemies').innerHTML = `${this.killedEnemies}`;
    document.getElementById('level-index').innerHTML = `${levelIndex}`;
    document.getElementById('game-over-text').innerHTML = `¿Qué has hecho? <br> ¡Un huno te mató!`;
    document.getElementById('next-level-btn').setAttribute('onClick', 'reload()');
    document.getElementById('next-level-btn').innerHTML = `Neu laden`;
  }

  endGameShowWinScreen() {
    this.calculatePoints();
    if (!exitHandler()) {
      document.exitFullscreen();
      document.querySelector('body').style = 'cursor: default;';
    }
    this.setIndexDivForWin();
    stoppEnemyIntervalls();
  }

  setIndexDivForWin() {
    document.getElementById('fullscreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('mobile-control').style.display = 'none';
    document.getElementById('points-quantity').innerHTML = `${points}`;
    document.getElementById('killed-enemies').innerHTML = `${this.killedEnemies}`;
    document.getElementById('level-index').innerHTML = `${levelIndex}`;
    document.getElementById('game-over').style.display = 'flex';
  }

  calculatePoints() {
    points = (this.character.energy + this.killedEnemies + this.bottleBar.bottles + this.coinBar.coins) * levelIndex;
  }

  checkThrowing() {
    let x = this.character.x + this.character.width * 0.5;
    let y = this.character.y + this.character.height * 0.5;
    let directionLeft = this.character.otherDirection;
    let left = this.keyboard.left;
    let right = this.keyboard.right;
    if (this.proofCanThrow()) {
      this.letBottleThrow(x, y, directionLeft, left, right);
    }
    if (!this.prooflastThrow(1000)) {
      this.throwableObject.splice(0, 1);
    }
  }

  proofCanThrow() {
    return this.keyboard.d && !this.prooflastThrow(1001) && this.bottleBar.bottles > 0;
  }

  prooflastThrow(ms) {
    let timepassed = new Date().getTime() - this.lastThrow;
    return timepassed < ms;
  }

  letBottleThrow(x, y, directionLeft, left, right) {
    let bottle = new ThrowableObject(x, y, directionLeft, left, right);

    this.throwableObject.push(bottle);
    this.lastThrow = new Date().getTime();
    this.character.idleCounter = 0;
    this.bottleBar.bottles--;
    this.SOUND_THROWING.play();
  }

  pepeColliding(enemies) {
    enemies.forEach((enemy) => {
      if (this.isPepeColliding(enemy)) {
        this.killEnemy(enemy);
      } else if (this.wasPepeColliding(enemy)) {
        this.pepeHitEnemy(enemy);
      }
    });
  }

  killEnemy(enemy) {
    enemy.energy = 0;
    enemy.isDead = true;
    this.killedEnemies++;
    this.character.speedY = 30;
  }

  wasPepeColliding(enemy) {
    return this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isDead;
  }

  isPepeColliding(enemy) {
    return (
      this.character.isColliding(enemy) &&
      this.character.y < this.character.gravityY &&
      (enemy instanceof Chicken || enemy instanceof SmallChicken) &&
      !this.character.isHurt() &&
      this.character.speedY < -10
    );
  }

  pepeHitEnemy(enemy) {
    this.drawableObject.characterEnergy -= enemy.damage;
    this.character.energy = this.drawableObject.characterEnergy;
    this.healthBar.setHealthBar(this.drawableObject.characterEnergy);
    this.SOUND_HURT.play();
    this.character.lastHit = new Date().getTime();
    if (enemy instanceof Endboss) {
      enemy.animationIndex = 0;
    }
  }

  enemyCollidingPepe() {
    this.level.enemies.forEach((enemy) => {
      if (this.proofForChangeDirection(enemy)) {
        enemy.directionIndex++;
        enemy.directionTime = 0;
        enemy.animationSpeed = enemy.animationSpeed + 1;
        enemy.damage = enemy.animationSpeed * 2;
      }
    });
  }

  proofForChangeDirection(enemy) {
    return (
      ((enemy.isColliding(this.character) && this.character.isHurt()) || enemy.x < 2 * -canvasWidth + 900 || enemy.x > bgCounter * canvasWidth - 1200) &&
      enemy.directionTime > 200
    );
  }

  throwingBottleColliding() {
    if (this.throwableObject.length > 0) {
      this.enemyHitByBottle();
      this.endbossHitByBottle();
    }
  }

  enemyHitByBottle() {
    this.level.enemies.forEach((e) => {
      if (e.isColliding(this.throwableObject[0]) && !this.throwableObject[0].hit) {
        e.energy -= this.coinBar.coins;
        this.throwableObject[0].hit = true;
      }
    });
  }

  endbossHitByBottle() {
    this.endboss.forEach((eb, i) => {
      if (eb.isColliding(this.throwableObject[0]) && !this.throwableObject[0].hit) {
        this.SOUND_ENDBOSS_HIT.play();
        eb.energy -= this.coinBar.coins;
        this.throwableObject[0].hit = true;
        this.endbossHealthBar[i].setHealthBar(eb.energy);
        if (eb.animationIndex > (100 * levelIndex) / 2) {
          eb.animationIndex = 0;
        }
      }
    });
  }

  coinColliding() {
    this.coins.forEach((coin, i) => {
      if (coin.isColliding(this.character)) {
        this.coins.splice(i, 1);
        this.coinBar.coins++;
        this.SOUND_COIN_COLLECT.loop = false;
        this.SOUND_COIN_COLLECT.play();
      }
    });
  }

  bottleColliding() {
    this.bottles.forEach((bottle, i) => {
      if (bottle.isColliding(this.character)) {
        this.bottles.splice(i, 1);
        this.bottleBar.bottles++;
        this.SOUND_BOTTLE_COLLECT.loop = false;
        this.SOUND_BOTTLE_COLLECT.play();
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.drawMovableImgs();
    this.ctx.translate(-this.cameraX, 0);
    this.drawStaticElements();
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  drawMovableImgs() {
    this.addObjectsToMap(this.level.backgrounds);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.endboss);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
    this.addToMapp(this.character);
  }

  drawStaticElements() {
    this.addToMapp(this.healthBar);
    this.addToMapp(this.coinBar);
    this.addToMapp(this.bottleBar);
    this.numberOfcollectedItems();
    this.showLevel();
    this.endboss.forEach((eb) => {
      if (eb.firstContact) {
        this.addObjectsToMap(this.endbossHealthBar);
      }
    });
  }

  numberOfcollectedItems() {
    this.ctx.font = '80px Boogaloo';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.coinBar.coins, this.coinBar.width + this.coinBar.x, this.coinBar.y + 70);
    this.ctx.fillText(this.bottleBar.bottles, this.bottleBar.width + this.bottleBar.x, this.bottleBar.y + 70);
  }

  showLevel() {
    let x = 20;
    let y = this.healthBar.height * 3 + 10;
    this.ctx.font = '80px Boogaloo';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Level ' + levelIndex, x, y);
  }

  setLevel() {
    let imageCounter = 0;
    for (let i = -4; i < bgCounter + 2; i++) {
      imageCounter++;
      if (imageCounter == 3) {
        imageCounter = 1;
      }
      this.setBackgroundParts(i, imageCounter);
    }
    this.createClouds();
    this.setObstacles();
    this.setEnemies(levelIndex * 2);
    this.setCoins();
    this.setBottles();
  }

  setBackgroundParts(i, imageCounter) {
    this.level.backgrounds.push(
      new BackgroundParts('img/5_background/layers/air.png', canvasWidth * i - 2 * i, 0),
      new BackgroundParts(`img/5_background/layers/3_third_layer/${imageCounter}.png`, canvasWidth * i - 2 * i, 0),
      new BackgroundParts(`img/5_background/layers/2_second_layer/${imageCounter}.png`, canvasWidth * i - 2 * i, 0),
      new BackgroundParts(`img/5_background/layers/1_first_layer/${imageCounter}.png`, canvasWidth * i - 2 * i, 0)
    );
  }

  createClouds() {
    let imageCounter = 0;
    for (let i = -2; i < bgCounter * 2; i++) {
      imageCounter++;
      if (imageCounter == 3) {
        imageCounter = 1;
      }
      this.setClouds(i, imageCounter);
    }
  }

  setClouds(i, imageCounter) {
    this.level.clouds.push(
      new Cloud(`img/5_background/layers/4_clouds/${imageCounter}.png`, canvasWidth * i - i, 0),
      new Cloud(`img/5_background/layers/4_clouds/${imageCounter}.png`, canvasWidth * i - i, 0)
    );
  }

  setEnemies(qantity) {
    for (let i = 0; i < qantity * 2; i++) {
      this.level.enemies.push(new Chicken(), new SmallChicken());
    }
  }

  setObstacles() {
    this.setLeftObstacles();
    this.setRightObstacles();
  }

  setLeftObstacles() {
    this.level.enemies.push(
      new BarbedWire(this.barbedWire.leftEnd, this.barbedWire.bottom),
      new BarbedWire(this.barbedWire.leftEnd + 160, this.barbedWire.bottom),
      new BarbedWire(this.barbedWire.leftEnd + 320, this.barbedWire.bottom),
      new BarbedWire(this.barbedWire.leftEnd + 80, this.barbedWire.bottom - 120),
      new BarbedWire(this.barbedWire.leftEnd + 240, this.barbedWire.bottom - 120),
      new BarbedWire(this.barbedWire.leftEnd + 160, this.barbedWire.bottom - 240)
    );
  }

  setRightObstacles() {
    this.level.enemies.push(
      new BarbedWire(this.barbedWire.rightEnd - 200, this.barbedWire.bottom),
      new BarbedWire(this.barbedWire.rightEnd - 160 - 200, this.barbedWire.bottom),
      new BarbedWire(this.barbedWire.rightEnd - 320 - 200, this.barbedWire.bottom),
      new BarbedWire(this.barbedWire.rightEnd - 80 - 200, this.barbedWire.bottom - 120),
      new BarbedWire(this.barbedWire.rightEnd - 240 - 200, this.barbedWire.bottom - 120),
      new BarbedWire(this.barbedWire.rightEnd - 160 - 200, this.barbedWire.bottom - 240)
    );
  }

  setBottles() {
    let preBottlesTEST = [];
    for (let i = 0; i < 6 * bgCounter; i++) {
      preBottlesTEST.push(new Bottle());
    }
    preBottlesTEST.forEach((b) => {
      if (b.x < this.character.x - 400 || b.x > this.character.x + this.character.width + 400) {
        this.bottles.push(b);
      }
    });
  }

  setCoins() {
    let preCoinsTEST = [];
    for (let i = 0; i < 6 * bgCounter; i++) {
      preCoinsTEST.push(new Coin());
    }
    preCoinsTEST.forEach((c) => {
      if (c.x < this.character.x - 400 || c.x > this.character.x + this.character.width + 400) {
        this.coins.push(c);
      }
    });
  }

  addToMapp(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (this.deebugmode) {
      mo.drawFrame(this.ctx);
    }
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMapp(o);
    });
  }

  setWorld() {
    this.character.world = this;
    this.throwableObject.world = this;
  }

  startNextLevel() {
    this.deleteOldLevel();
    this.renderNewLevel();
    closeRest();
    document.getElementById('canvas').style.display = 'flex';
    startGame();
  }

  deleteOldLevel() {
    stoppEnemyIntervalls();
    this.level = new Level([], [], []);
    this.coins = [];
    this.bottles = [];
    this.endboss = [];
    this.endbossHealthBar = [];
  }

  renderNewLevel() {
    levelIndex++;
    generateLevelsize();
    this.barbedWire.rightEnd = bgCounter * canvasWidth - 400;
    this.setLevel();
    this.endboss.push(new Endboss());
    this.endboss.forEach((eb, i) => {
      this.endbossHealthBar.push(new EndbossHealthBar());
      this.endbossHealthBar[i].maxEnergy = eb.maxEnergy;
    });
    this.refreshCharachter();
    this.coinBar.coins = (this.coinBar.coins / 2).toFixed();
    this.bottleBar.bottles = (this.bottleBar.bottles / 4).toFixed();
  }

  refreshCharachter() {
    this.character.x = 0;
    this.drawableObject.characterEnergy = 100;
    this.healthBar.setHealthBar(this.drawableObject.characterEnergy);
  }
}
