class Character extends MovableObjekt {
  height = 1200 * scalefactor;
  width = 610 * scalefactor;
  world;

  energy = this.characterEnergy;

  first_positionOfCharacter = canvasWidth / 4;
  x = this.first_positionOfCharacter;
  gravityY = canvasHeight - this.height - (this.walkLine + this.characterWalkline) * scalefactor;
  y = this.gravityY;

  setCollisionX = 100 * scalefactor;
  setCollisionY = 500 * scalefactor;
  setCollisionWidth = 200 * scalefactor;
  setCollisionheigt = 550 * scalefactor;

  otherDirection = false;
  animationSpeed = 18;
  accceleration = 10;
  jumpPower = 90;

  idleCounter = 0;

  distanceToEndboss = 5000;

  SOUND_WALKING = new Audio('audio/157038_2835342-lq (mp3cut.net).mp3');
  SOUND_JUMP = new Audio('audio/jump.mp3');

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
  ];
  IMAGES_JUMP = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];
  IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png', 'img/2_character_pepe/4_hurt/H-42.png', 'img/2_character_pepe/4_hurt/H-43.png'];
  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];
  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];
  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadAllImages();
    this.animate();
    this.applyGravity(this.gravityY);
  }

  loadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
  }

  animate() {
    this.proofAlive();
    this.setIntervals();
  }

  setIntervals() {
    setCharacterInterval(this.playAudio.bind(this), 100);
    setCharacterInterval(this.setMove.bind(this), interval);
    setCharacterInterval(this.setImages.bind(this), 150);
  }

  playAudio() {
    this.SOUND_WALKING.pause();
    if ((this.proofRightWalking() || this.proofLeftWalking()) && this.y == this.gravityY) {
      this.SOUND_WALKING.play();
    }
  }

  setMove() {
    if (play) {
      if (this.proofRightWalking()) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.proofLeftWalking()) {
        this.moveLeft();
        this.otherDirection = true;
        1;
      }
      if (this.proofJump()) {
        this.jump(this.jumpPower);
        this.SOUND_JUMP.play();
      }
      this.cameraView();
    }
  }

  setImages() {
    if (this.isDead) {
      this.playAnimationDead();
    } else if (this.isHurt()) {
      this.playAnimationHurt();
    } else if (this.isAboveGround(this.gravityY)) {
      this.playAnimationJump();
    } else if (this.proofWalking()) {
      this.playAnimation(this.IMAGES_WALKING);
      this.idleCounter = 0;
    } else {
      if (this.idleCounter > 10) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
        this.idleCounter += 0.5;
      }
    }
  }

  playAnimationDead() {
    this.playAnimation(this.IMAGES_DEAD);
    if (!this.isHurt()) {
      this.y -= 30;
    } else {
      this.y += 5;
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    return timepassed < 500;
  }

  playAnimationHurt() {
    this.applyCollidingMove();
    this.idleCounter = 0;
  }

  playAnimationJump() {
    this.playAnimation(this.IMAGES_JUMP);
    this.idleCounter = 0;
  }

  setCollidingTime() {
    this.lastHit = new Date().getTime();
  }

  applyCollidingMove() {
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  proofWalking() {
    return this.proofRightWalking() || this.proofLeftWalking();
  }

  proofRightWalking() {
    return keyboard.right && this.proofCanvasEndRight() && this.distanceToEndboss > 160;
  }

  proofLeftWalking() {
    return keyboard.left && this.proofCanvasEndLeft();
  }

  proofJump() {
    return keyboard.space && this.y == this.gravityY;
  }

  proofCanvasEndRight() {
    return this.x < bgCounter * canvasWidth - this.width;
  }

  proofCanvasEndLeft() {
    return this.x > -2 * canvasWidth;
  }

  cameraView() {
    if (this.x > -2 * canvasWidth + this.first_positionOfCharacter) {
      this.world.cameraX = this.first_positionOfCharacter - this.x;
    }
    if (this.x < bgCounter * canvasWidth - canvasWidth + this.first_positionOfCharacter) {
      this.world.cameraX = this.first_positionOfCharacter - this.x;
    }
  }
}
