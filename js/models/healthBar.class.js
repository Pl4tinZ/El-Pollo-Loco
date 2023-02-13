class HealthBar extends DrawableObject {
  IMAGES_HEALTH = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  width = 595 * scalefactor;
  height = 158 * scalefactor;
  x = 10;
  y = 10;

  constructor() {
    super().loadImage(this.IMAGES_HEALTH[5]);
    this.loadImages(this.IMAGES_HEALTH);
    this.setHealthBar(100);
  }

  setHealthBar(characterEnergy) {
    this.characterEnergy = characterEnergy;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.characterEnergy == 100) {
      return 5;
    } else if (this.characterEnergy > 80) {
      return 4;
    } else if (this.characterEnergy > 60) {
      return 3;
    } else if (this.characterEnergy > 40) {
      return 2;
    } else if (this.characterEnergy > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
