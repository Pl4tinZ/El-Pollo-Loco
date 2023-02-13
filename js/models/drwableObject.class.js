class DrawableObject {
  height = 100;
  width = 100;

  leftEnd = 2 * -canvasWidth + 200;
  rightEnd = bgCounter * canvasWidth - 400;

  x = 0;
  y = this.canvasHeight - this.height - this.walkLine;

  characterEnergy = 100;
  coinWallet = 0;
  bottleBag = 0;

  img;
  imageCache = [];
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['./img/image1', './img/image2', './img/image3', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    this.drawOriginalSize(ctx);
    if (this.isEnemy()) {
      this.drawCalculatedFrame(ctx);
    }
  }

  drawOriginalSize(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  drawCalculatedFrame(ctx) {
    ctx.beginPath();
    ctx.rect(this.x + this.setCollisionX, this.y + this.setCollisionY, this.width - this.setCollisionWidth, this.height - this.setCollisionheigt);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }

  isEnemy() {
    return (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof SmallChicken
    );
  }

  isColliding(mo) {
    let enemyYtop = mo.y + mo.setCollisionY;
    let enemyYbottom = mo.y + mo.setCollisionY + mo.height - mo.setCollisionheigt;
    let enemyXleft = mo.x + mo.setCollisionX;
    let enemyXright = mo.x + mo.setCollisionX + mo.width - mo.setCollisionWidth;

    let characterYtop = this.y + this.setCollisionY;
    let characterYbottom = this.y + this.setCollisionY + this.height - this.setCollisionheigt;
    let characterXleft = this.x + this.setCollisionX;
    let characterXright = this.x + this.setCollisionX + this.width - this.setCollisionWidth;

    return enemyXleft < characterXright && enemyXright > characterXleft && enemyYtop < characterYbottom && enemyYbottom > characterYtop;
    /** 
      (characterXright > enemyXleft &&
        characterXright < enemyXright &&
        characterYbottom > enemyYtop &&
        characterYbottom < enemyYbottom) ||
      (characterXright > enemyXleft &&
        characterXright < enemyXright &&
        characterYtop > enemyYtop &&
        characterYtop < enemyYbottom) ||
      (characterXleft > enemyXleft &&
        characterXleft < enemyXright &&
        characterYtop > enemyYtop &&
        characterYtop < enemyYbottom) ||
      (characterXleft > enemyXleft &&
        characterXleft < enemyXright &&
        characterYbottom > enemyYtop &&
        characterYbottom < enemyYbottom) ||
      (enemyYtop > characterYtop &&
        enemyYbottom < characterYbottom &&
        enemyXleft > characterXleft &&
        enemyXleft < characterXright) ||
      (enemyYtop > characterYtop &&
        enemyYbottom < characterYbottom &&
        enemyXright > characterXleft &&
        enemyXright < characterXright) ||
*/
  }

  /** Is not working!!!
     * 
    isColliding(mo) {
        return this.x + this.width > mo.x &&
        this.y +this.height > mo.y &&
        this.x < mo.x + mo.with &&
        this.y > mo.y + mo.height
    } */
}
