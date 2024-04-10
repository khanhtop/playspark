export class BlackBG extends Phaser.GameObjects.Graphics {
  drawBlackBg: () => void;
  private static instance: BlackBG;
  constructor(_scene: Phaser.Scene) {
    super(_scene);
    let width = _scene.renderer.width;
    let height = _scene.renderer.height;

    this.drawBlackBg = () => {
      this.clear()
        .fillStyle(0x000000, 0.5)
        .fillRect(-width / 2, -height / 2, width, height)
        .setInteractive();
    };
  }
  public static getInstance(_scene: Phaser.Scene, parent: any): BlackBG {
    if (!BlackBG.instance) {
      BlackBG.instance = new BlackBG(_scene);
    }
    parent.add(BlackBG.instance);
    return BlackBG.instance;
  }
  setShowState(value: boolean): void {
    if (value) this.drawBlackBg();
    else this.clear();
  }
}
