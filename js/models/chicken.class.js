class Chicken extends MovableObjekt {
  height = 243 * scalefactor;
  width = 248 * scalefactor;

  x = 1800 + getRandomArbitrary(0, canvasWidth * bgCounter - 3000);
  chickenWalkline = this.characterWalkline - 15 + this.characterWalkline;
  gravityY = canvasHeight - this.height - (this.walkLine + this.chickenWalkline) * scalefactor;
  y = this.gravityY;

  setCollisionX = 0 * scalefactor;
  setCollisionY = 10 * scalefactor;
  setCollisionWidth = 0 * scalefactor;
  setCollisionheigt = 40 * scalefactor;

  minSpeed = 1;
  maxSpeed = 5;
  animationSpeed = getRandomArbitrary(this.minSpeed, this.maxSpeed);
  movingSpeed = 160 / this.animationSpeed; // for setting interval

  directionIndex = getRandomInt(3); // even for left; odd for right
  directionTime = 199;
  otherDirection = false;
  id = Math.random();

  energy = 10 * levelIndex;
  damage = this.animationSpeed * 2;
  isDead = false;
  deadIndex = false;

  SOUND_CHICKEN_DEAD = new Audio('audio/chickenDead.mp3');

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];
  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.moving();
    this.proofAlive();
  }

  moving() {
    setStoppableInterval(this.animate.bind(this), this.movingSpeed);
    setStoppableInterval(this.direction.bind(this), interval);
  }

  animate() {
    if (play) {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }
  }

  direction() {
    if (play) {
      if (!this.isDead) {
        this.directionTime += 1;
        if (this.directionIndex % 2) {
          this.moveRight();
          this.otherDirection = true;
        } else {
          this.moveLeft();
          this.otherDirection = false;
        }
      } else if (!this.deadIndex) {
        this.y += 5;
        this.SOUND_CHICKEN_DEAD.play();
      }
      if (this.y > this.gravityY + 200) {
        this.SOUND_CHICKEN_DEAD.pause();
        this.deadIndex = true;
      }
    }
  }
}
