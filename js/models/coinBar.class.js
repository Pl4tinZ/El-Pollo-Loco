class CoinBar extends DrawableObject {
  IMAGES_COINBAR = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
  ];
  IMAGE_COIN = 'img/7_statusbars/3_icons/icon_coin.png';

  /**
   * only for status Bar
   * width = 595 * scalefactor;
   * height = 158 * scalefactor;
   */
  width = 158 * scalefactor;
  height = 158 * scalefactor;
  x = 10;
  y = this.height + 10;

  coins = 0;

  constructor() {
    super().loadImage(this.IMAGE_COIN);
  }
}
