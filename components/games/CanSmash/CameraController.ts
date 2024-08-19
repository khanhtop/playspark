import {
  ArcRotateCamera,
  Camera,
  FreeCamera,
  Matrix,
  Scene,
  TargetCamera,
  Tools,
  UniversalCamera,
  Vector3,
  Viewport,
} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import { GameData } from "./GameData";
export class CameraController {
  static camera: TargetCamera = null;
  constructor(scene: Scene, canvas: any) {
    let engine = GameData.instance.getEngine();
    /* var camera: ArcRotateCamera = new ArcRotateCamera(
            "Camera",
            -Math.PI / 2,
            Math.PI / 2,
            2,
            new Vector3(0,0,-0.1),
            scene
          );*/

    //TargetCamera
    //var camera: FreeCamera = new FreeCamera(
    var camera: TargetCamera = new TargetCamera(
      "Camera",
      new Vector3(0, 1.81, -2.05),
      scene
    );
    camera.setTarget(Vector3.Zero());
    camera.rotation = new Vector3(0.33, 0, 0);

    // camera.speed = 0.01;
    // camera.angularSensibility = 10000;
    camera.fov = 0.8;//Tools.ToRadians(60);
    camera.viewport = new Viewport(0, 0.0, 1, 1);

    camera.onProjectionMatrixChangedObservable.add(() => {
      //camera._projectionMatrix.copyFrom(BABYLON.Matrix.PerspectiveLH(2, 1, camera.minZ, camera.maxZ, engine.isNDCHalfZRange, camera.projectionPlaneTilt));
      const aspectRatio = canvas.width / canvas.height;
      camera._projectionMatrix.copyFrom(
        Matrix.PerspectiveFovLH(
          camera.fov,
          aspectRatio,
          camera.minZ,
          camera.maxZ,
          engine.isNDCHalfZRange,
          camera.projectionPlaneTilt
        )
      );
    });

    camera.attachControl(canvas, true);

    CameraController.camera = camera;

    /*const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const meshesLength = new GUI.TextBlock();

    meshesLength.text = `x:${camera.position.x} y:${camera.position.y} z:${camera.position.z} rot:${camera.rotation.x}`;
    meshesLength.height = "20px";
    meshesLength.width = "200px";
    meshesLength.color = "white";
    meshesLength.fontSize = 14;
    meshesLength.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    meshesLength.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    meshesLength.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    meshesLength.topInPixels = 100;
    meshesLength.leftInPixels = 0;
    advancedTexture.addControl(meshesLength);

    scene.registerBeforeRender(() => {
      meshesLength.text = `x:${camera.position.x.toFixed(2)} y:${camera.position.y.toFixed(2)} z:${camera.position.z.toFixed(2)} rot:${camera.rotation.x.toFixed(2)}`;
    });*/
  }
}
