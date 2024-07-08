import { IPoolable } from "./IPoolable";

export class ObjectPool {
  pooledObjects: IPoolable[];
  constructor() {}

  getPooledObject<T extends IPoolable>(type: { new (): T }): T {
    
    return new type();
  }
}
