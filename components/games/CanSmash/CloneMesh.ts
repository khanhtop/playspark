import { Loader } from "./Loader";

export class CloneMesh {
  constructor() {}

  get(name: string) {
    let result = Loader.instance.meshLoaderResult[name]; //ISceneLoaderAsyncResult
    let clonedResult = null;

   if (result.isCloned) {
      clonedResult = {
        animationGroups: result.animationGroups.map((ag) => ag.clone()),
        geometries: result.geometries.slice(), // geometries are usually shared and don't need cloning
        lights: result.lights.map((light) => light.clone()),
        meshes: result.meshes.map((mesh) => mesh.clone()),
        particleSystems: result.particleSystems.slice(), // same as geometries
        skeletons: result.skeletons.map((skeleton) => skeleton.clone()),
        spriteManagers: result.spriteManagers.slice(), // same as geometries
        transformNodes: result.transformNodes.map((tn) => tn.clone()),
      };
    } else {
      clonedResult = result;
      result.isCloned = true;
    }

    return clonedResult;
  }
}
