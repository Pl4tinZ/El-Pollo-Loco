class Cloud extends MovableObjekt {
  height = 1080 * scalefactor * sizeVariable;
  width = 1920 * scalefactor * sizeVariable;

  y = canvasHeight - this.height;

  constructor(imgPath, x, y) {
    super().loadImage(imgPath);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setStoppableInterval(this.wind.bind(this), 1000 / 60);
  }

  wind() {
    this.moveLeft();
  }
}
