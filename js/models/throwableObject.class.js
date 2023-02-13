class ThrowableObject extends MovableObjekt {
  world;
  x = 100;
  y = canvasHeight - 300;

  width = 400 * scalefactor;
  height = 400 * scalefactor;

  setCollisionX = 62 * scalefactor;
  setCollisionY = 62 * scalefactor;
  setCollisionWidth = 100 * scalefactor;
  setCollisionheigt = 100 * scalefactor;

  speedX = 20;
  speedY = 55;
  gravityY = canvasHeight - 250 * scalefactor - this.height;
  accceleration = 10;

  hit = false;
  splashTime = 0;

  SOUND_SPLASH = new Audio('audio/bottlesplash.mp3');

  IMAGES_BOTTLE_ROTATE = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];
  IMAGES_BOTTLE_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  constructor(x, y, direction, walkLeft, walkRight) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.x = x - this.width * 0.5;
    this.y = y;
    this.throw(direction, walkLeft, walkRight);
    this.loadImages(this.IMAGES_BOTTLE_ROTATE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
  }

  throw(direction, walkLeft, walkRight) {
    this.setThrow(direction, walkLeft, walkRight);
    this.setImages();
    this.applyGravity(this.gravityY);
    this.setAudio();
  }

  setImages() {
    let id = setInterval(() => {
      if (this.y < this.gravityY && !this.hit) {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
      } else {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
      }
    }, 50);
    intervalIds.push(id);
  }

  setAudio() {
    let id = setInterval(() => {
      if ((this.hit || this.y >= this.gravityY) && this.splashTime < 20) {
        this.SOUND_SPLASH.play();
        this.splashTime++;
      }
      if (this.splashTime > 200) {
        clearInterval(id);
      }
    }, 1);
    intervalIds.push(id);
  }

  setThrow(direction, walkLeft, walkRight) {
    let id = setInterval(() => {
      if (direction) {
        this.throwLeft(walkLeft);
      } else {
        this.throwRight(walkRight);
      }
    }, interval);
    intervalIds.push(id);
  }

  throwLeft(walkLeft) {
    if (walkLeft) {
      this.x -= this.speedX + 15;
    } else {
      this.x -= this.speedX;
    }
  }

  throwRight(walkRight) {
    if (walkRight) {
      this.x += this.speedX + 15;
    } else {
      this.x += this.speedX;
    }
  }
}
