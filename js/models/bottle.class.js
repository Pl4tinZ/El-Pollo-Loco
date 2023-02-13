class Bottle extends DrawableObject {
  IMAGES_BOTTLE = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'];
  sizefactor = 0.4;
  width = 400 * this.sizefactor;
  height = 400 * this.sizefactor;

  minX = this.leftEnd + 500;
  maxX = this.rightEnd - 700;

  x = getRandomArbitrary(this.minX, this.maxX);
  y = canvasHeight - this.height - 115;

  setCollisionX = 107 * scalefactor * this.sizefactor;
  setCollisionY = 107 * scalefactor * this.sizefactor;
  setCollisionheigt = 216 * scalefactor * this.sizefactor;
  setCollisionWidth = 216 * scalefactor * this.sizefactor;

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE[getRandomInt(2)]);
    this.loadImages(this.IMAGES_BOTTLE);
  }
}
