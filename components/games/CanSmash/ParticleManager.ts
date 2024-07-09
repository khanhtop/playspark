import {
  Color4,
  Mesh,
  MeshBuilder,
  ParticleSystem,
  SphereParticleEmitter,
  Texture,
  Vector3,
} from "@babylonjs/core";
import { GameData } from "./GameData";
import { Events } from "./Events";
import { ICan } from "./Can/ICan";
import { LevelCreator } from "./LevelCreator";
import { Materials } from "./Materials";
import { Images } from "./Images";

export class ParticleManager {
  static instance: ParticleManager = null;
  particlePool: ParticleSystem[];
  scene: any;
  constructor() {
    this.particlePool = [];

    ParticleManager.instance = this;

    this.scene = GameData.instance.getScene();

    /* let particle = this.createParticle();

    particle.isLocal = true;
    particle.emitter = new Vector3(0, 0.5, 5);
    particle.start();*/

    let color1 = new Color4(0.7, 0.8, 1.0, 1.0);
    let color2 = new Color4(0.2, 0.5, 1.0, 1.0);
    let colorDead = new Color4(0, 0, 0.2, 0.0);

    Events.hits.add((_data: any) => {
      switch (_data.name) {
        case "powerup":
          color1 = new Color4(0.7, 0.8, 1.0, 1.0);
          color2 = new Color4(0.2, 0.5, 1.0, 1.0);
          colorDead = new Color4(0, 0, 0.2, 0.0);

          this.showParticle(color1, color2, colorDead, _data.target);
          break;
        case "enemy":
          color1 = new Color4(1, 0.71, 0.7);
          color2 = new Color4(1, 0.2, 0.2);
          colorDead = new Color4(0, 0, 0.2, 0.0);
          this.showParticle(
            color1,
            color2,
            colorDead,
            _data.data.sender.canContainer
          );
          break;

        case "can":
          color1 = new Color4(0.2, 0.2, 1.0, 1.0);
          color2 = new Color4(1, 1, 1, 1.0);
          colorDead = new Color4(0.99, 0.99, 0.9, 0);
          this.showParticle(
            color1,
            color2,
            colorDead,
            _data.data.sender.canContainer
          );
          break;
      }
    });
  }

  private showParticle(
    color1: Color4,
    color2: Color4,
    colorDead: Color4,
    canContainer: Mesh
  ) {
    let particle = null;
    for (var i = 0; i < this.particlePool.length; i++) {
      if (!this.particlePool[i].isAlive()) {
        particle = this.particlePool[i];
        break;
      }
    }

    if (particle == null) {
      particle = this.createParticle();
      this.particlePool.push(particle);
    }

    particle.color1 = color1;
    particle.color2 = color2;
    particle.colorDead = colorDead;
    particle.isLocal = true;
    particle.emitter = canContainer.position.clone();
    particle.start();
  }

  createParticle() {
    const particleSystem = new ParticleSystem("particles", 100, this.scene);

    particleSystem.particleTexture = new Texture(Images.data.flare);

    // Size of each particle (random between...
    particleSystem.minSize = 0.05;
    particleSystem.maxSize = 0.1;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 0.5;

    particleSystem.targetStopDuration = 0.5;

    // Emission rate
    particleSystem.emitRate = 500;

    /******* Emission Space ********/
    particleSystem.createSphereEmitter(0.2, 0.2);

    // Speed
    particleSystem.minEmitPower = 0.1;
    particleSystem.maxEmitPower = 0.1;
    particleSystem.updateSpeed = 0.03;

    return particleSystem;
  }
}
