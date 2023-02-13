class Endboss extends MovableObjekt {
  height = 1217 * scalefactor;
  width = 1045 * scalefactor;

  startX = bgCounter * canvasWidth - this.width * 3;
  x = this.startX;

  endbossWalkline = this.characterWalkline - 39 + this.characterWalkline;
  gravityY = canvasHeight - this.height - (this.walkLine + this.endbossWalkline) * scalefactor;
  y = this.gravityY;

  setCollisionX = 100 * scalefactor;
  setCollisionY = 200 * scalefactor;
  setCollisionWidth = 200 * scalefactor;
  setCollisionheigt = 250 * scalefactor;

  minSpeed = 2;
  maxSpeed = levelIndex + 1;
  animationSpeed = getRandomArbitrary(this.minSpeed, this.maxSpeed);

  distanceToCharacter = 5000;
  animationIndex = 0;
  firstContact = false;
  hitCharacter = false;
  id = Math.random();

  maxEnergy = 100 * levelIndex;
  energy = this.maxEnergy;
  damage = 30;
  isDead = false;

  IMAGES_WALKING = ['img/4_enemie_boss_chicken/1_walk/G1.png', 'img/4_enemie_boss_chicken/1_walk/G2.png', 'img/4_enemie_boss_chicken/1_walk/G3.png'];
  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];
  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];
  IMAGES_HURT = ['img/4_enemie_boss_chicken/4_hurt/G21.png', 'img/4_enemie_boss_chicken/4_hurt/G22.png', 'img/4_enemie_boss_chicken/4_hurt/G23.png'];
  IMAGES_DEAD = ['img/4_enemie_boss_chicken/5_dead/G24.png', 'img/4_enemie_boss_chicken/5_dead/G25.png', 'img/4_enemie_boss_chicken/5_dead/G26.png'];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.proofAlive();
  }

  animate() {
    setStoppableInterval(this.imgAnimation.bind(this), 100);
    setStoppableInterval(this.move.bind(this), 1000 / 60);
    setStoppableInterval(this.animationControle.bind(this), 100);
  }

  imgAnimation() {
    if (play) {
      if (this.animationIndex < 15) {
        this.playAnimation(this.IMAGES_HURT);
      }
      if (!this.isDead && this.animationIndex > 15) {
        if (this.distanceToCharacter < 800) {
          this.animationSpeed = levelIndex + 10;
          this.playAnimation(this.IMAGES_ATTACK);
        } else {
          this.animationSpeed = getRandomArbitrary(this.minSpeed, this.maxSpeed);
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
      if (this.isDead) {
        this.playAnimation(this.IMAGES_DEAD);
        this.y += 30;
      }
    }
  }

  move() {
    if (this.firstContact && this.animationIndex > 15 && !this.isDead) {
      this.moveLeft();
    }
  }

  animationControle() {
    if (this.firstContact) {
      this.animationIndex++;
    }
  }
}
