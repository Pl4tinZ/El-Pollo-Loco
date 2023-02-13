class BarbedWire extends DrawableObject {
  IMAGE = 'img/new_items/barbed_wire.png';

  width = (1920 * scalefactor) / 3;
  height = (1222 * scalefactor) / 3;

  bottom = canvasHeight - this.height - 100;

  x = this.leftEnd;
  y = this.bottom;

  setCollisionX = 0 * scalefactor;
  setCollisionY = 0 * scalefactor;
  setCollisionWidth = 0 * scalefactor;
  setCollisionheigt = 0 * scalefactor;

  damage = 40;

  constructor(x, y) {
    super().loadImage(this.IMAGE);
    this.x = x;
    this.y = y;
  }
}
