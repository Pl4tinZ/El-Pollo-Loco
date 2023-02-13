class BottleBar extends DrawableObject {
  IMAGES_Bottle = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];
  IMAGE_BOTTLE = ['img/7_statusbars/3_icons/icon_salsa_bottle.png'];

  /**
   * only for status Bar
   * width = 595 * scalefactor;
   * height = 158 * scalefactor;
   */
  width = 158 * scalefactor;
  height = 158 * scalefactor;
  x = this.width + 120;
  y = this.height + 10;

  bottles = 0;

  constructor() {
    super().loadImage(this.IMAGE_BOTTLE);
    /** 
        super().loadImage(this.IMAGES_Bottle[0])
        this.loadImages(this.IMAGES_Bottle);
        this.setBottleBar(0);
        */
  }

  setBottleBar(bottleBag) {
    this.bottleBag = bottleBag;
    let path = this.IMAGES_Bottle[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.bottleBag == 100) {
      return 5;
    } else if (this.bottleBag > 80) {
      return 4;
    } else if (this.bottleBag > 60) {
      return 3;
    } else if (this.bottleBag > 40) {
      return 2;
    } else if (this.bottleBag > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
