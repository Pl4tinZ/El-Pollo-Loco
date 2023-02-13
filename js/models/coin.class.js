class Coin extends DrawableObject {
  IMAGES_COIN = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];
  sizefactor = 1.5;
  width = 300 * scalefactor * this.sizefactor;
  height = 300 * scalefactor * this.sizefactor;

  minX = this.leftEnd + 500;
  maxX = this.rightEnd - 700;
  minY = 100;
  maxY = 300;

  x = getRandomArbitrary(this.minX, this.maxX);
  y = getRandomArbitrary(this.minY, this.maxY);

  setCollisionX = 100 * scalefactor * this.sizefactor;
  setCollisionY = 100 * scalefactor * this.sizefactor;
  setCollisionheigt = 200 * scalefactor * this.sizefactor;
  setCollisionWidth = 200 * scalefactor * this.sizefactor;

  constructor() {
    super().loadImage(this.IMAGES_COIN[1]);
    this.loadImages(this.IMAGES_COIN);
  }
}
