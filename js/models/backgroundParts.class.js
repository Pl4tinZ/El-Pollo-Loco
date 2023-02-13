class BackgroundParts extends MovableObjekt {
  height = 1080 * scalefactor * sizeVariable;
  width = 1920 * scalefactor * sizeVariable;
  y = canvasHeight - this.height;
  x = 0;

  constructor(imgPath, x, y) {
    super().loadImage(imgPath);
    this.x = x;
    this.y = y;
  }
}
