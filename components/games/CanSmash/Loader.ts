import {
  HavokPlugin,
  ISceneLoaderAsyncResult,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";
import * as GUI from "@babylonjs/gui";

export class Loader {
  static instance: Loader = null;
  meshLoaderResult: ISceneLoaderAsyncResult[];
  private loadCount = 0;
  private callBack: any;
  private scene: Scene;
  constructor(scene: Scene, callBack: any) {
    this.scene = scene;
    this.meshLoaderResult = [];
    Loader.instance = this;
    this.callBack = callBack;
  }
  loadFont(name :string,url: string) {
    this.loadCount++;
    const font = new FontFace(name, `url(${url})`, {
      style: "normal",
      weight: "400",
      stretch: "condensed",
    });
    //@ts-ignore
    document.fonts.add(font);

    var self = this;
    async function check() {
      await font.load();
      self.checkLoadComplete();
    }
    check();
  }
  async loadImage(url: string) {
    this.loadCount++;
    let elem = new Image();
    async function loadImage(url, elem) {
      return new Promise((resolve, reject) => {
        elem.onload = () => resolve(elem);
        elem.onerror = reject;
        elem.src = url;
      });
    }
    await loadImage(url, elem);
   // console.log("image loded",url)
    this.checkLoadComplete();
  }
  loadMesh(name: string) {
    this.loadCount++;
    const resultPromise = SceneLoader.ImportMeshAsync("", "./", name);

    // Result has meshes, particleSystems, skeletons, animationGroups and transformNodes
    resultPromise.then((result) => {
      result.meshes[0].setEnabled(false);

      this.meshLoaderResult[name] = result;
      this.meshLoaderResult[name].isCloned = false;

      this.checkLoadComplete();
    });
  }

  loadPhysic() {
    this.loadCount++;
    const hsk = HavokPhysics().then((ksk) => {
      //  console.log(ksk);
      var hk = new HavokPlugin(true, ksk);
      //@ts-ignore
      window.hk = hk;

      this.scene.enablePhysics(new Vector3(0, -9.8, 0), hk);
      //this.scene.enablePhysics(new Vector3(0, -1, 0), new OimoJSPlugin());

      this.checkLoadComplete();
    });
  }

  checkLoadComplete() {
    this.loadCount--;

    if (this.loadCount == 0) {
      this.callBack();
    }
  }
}
