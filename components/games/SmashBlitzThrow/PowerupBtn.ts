import { BudgetCounter } from "./BudgetCounter";

export class PowerupBtn {
  scene: Phaser.Scene;
  group: Phaser.GameObjects.Container;
  budgetCounter: BudgetCounter;
  icon: Phaser.GameObjects.Sprite;
  clickArea:Phaser.GameObjects.GameObject;
  constructor(_scene: Phaser.Scene , x:number,y:number,texture:string,count:string) {
    this.budgetCounter = new BudgetCounter(_scene);
    this.budgetCounter.instance.setPosition(30, -30);
    this.budgetCounter.instance.setScale(0.4, 0.4);
    this.budgetCounter.setText("00");

    this.scene = _scene;
    this.group = _scene.add.container();

    this.clickArea = _scene.add
      .sprite(0, 0, "budget_bg")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(70, 70)
      .setInteractive()

    this.icon = _scene.add
      .sprite(0, 0, "budget_bg")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(50, 50)
  

    this.group.add(this.clickArea);
    this.group.add(this.icon);
    this.group.add(this.budgetCounter.instance);

    this.group.setPosition(x, y);
    this.budgetCounter.setText(count);
    this.icon.setTexture(texture);
  }
  public setPos(x: number, y: number) {
    this.group.setPosition(x, y);
  }
  public setText(counter: string) {
    this.budgetCounter.setText(counter);
  }
  public setTexture(textureName: string) {
    this.icon.setTexture(textureName);
  }
}
