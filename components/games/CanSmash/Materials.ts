import { Color3, Scene, StandardMaterial, Texture } from "@babylonjs/core";
import { Images } from "./Images";

export class Materials {
  static Instance: Materials = null;
  transparentMaterial: StandardMaterial;
  cans: StandardMaterial[];
  canUp: StandardMaterial;
  bg: StandardMaterial;
  ground: StandardMaterial;
  background: StandardMaterial;
  redMat: StandardMaterial;
  powerup: StandardMaterial;
  enemy: StandardMaterial;
  barrelBody: StandardMaterial;
  ledgesBody: StandardMaterial;
  barrelUp: StandardMaterial;
  ball: StandardMaterial;
  constructor(cansTextures: string[]) {
    Materials.Instance = this;
    this.transparentMaterial = new StandardMaterial("canMat");
    //this.canMaterial.diffuseTexture = new Texture(Images.data.logo_label);
    this.transparentMaterial.alpha = 0;

    let diffuseColor = new Color3(3, 3, 3);
    this.cans = [];
    for (let i = 0; i < cansTextures.length; i++) {
      this.cans[i] = new StandardMaterial("can2Mat");
      this.cans[i].diffuseTexture = new Texture(cansTextures[i]);
  
      this.cans[i].diffuseColor = diffuseColor;

      // this.cans[i].meta = 0.1;
      //this.cans[i].roughness = 0.5;

      //this.cans[i].specularColor = new Color3(2, 2,2);
      //this.cans[i].emissiveColor = Color3.Red();
    }
    this.barrelBody = new StandardMaterial("barrel");
    this.barrelBody.diffuseTexture = new Texture(Images.data.barrel);
    this.barrelBody.diffuseColor = diffuseColor;

    this.ledgesBody = new StandardMaterial("ledgesBody");
    this.ledgesBody.diffuseColor = new Color3(0.4, 0.4, 0.4);
    this.ledgesBody.specularColor = new Color3(0.4, 0.4, 0.4);
    this.ledgesBody.emissiveColor = Color3.Gray();
    //this.ledgesBody.diffuseColor = diffuseColor;


    this.barrelUp = new StandardMaterial("barrel");
    this.barrelUp.diffuseTexture = new Texture(Images.data.barrel_up);
    this.barrelUp.diffuseColor = diffuseColor;

    //this.barrelBody.diffuseColor = diffuseColor;

    this.enemy = new StandardMaterial("can2Mat");
    this.enemy.diffuseTexture = new Texture(Images.data.enemy);
    this.enemy.diffuseColor = diffuseColor;

    this.canUp = new StandardMaterial("canUpMat");
    this.canUp.diffuseTexture = new Texture(Images.data.can_up);

    this.background = new StandardMaterial("backgroundMat");
    this.background.diffuseTexture = new Texture(Images.data.background);
    this.background.diffuseColor = diffuseColor;

    this.ground = new StandardMaterial("bgMat");
    this.ground.diffuseTexture = new Texture(Images.data.greengrass);
    this.ground.diffuseColor = diffuseColor;

    this.powerup = new StandardMaterial("powerupCredit");
    this.powerup.diffuseTexture = new Texture(Images.data.powerup_credit);
    this.powerup.diffuseColor = diffuseColor;

    this.ball = new StandardMaterial("ball");
    this.ball.diffuseTexture = new Texture(Images.data.ball);
    this.ball.diffuseColor = diffuseColor;

    // var redMat = new StandardMaterial("redMat", scene);
    // redMat.diffuseColor = new Color3(1, 0, 0);
    //redMat.alpha = 0.5;
    this.redMat = new StandardMaterial("redMat");
    this.redMat.diffuseColor = new Color3(0.4, 0.4, 0.4);
    this.redMat.specularColor = new Color3(0.4, 0.4, 0.4);
    this.redMat.emissiveColor = Color3.Red();
  }

  public static get instance(): Materials {
    return Materials.Instance;
  }
}
