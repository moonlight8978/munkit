import { ConfigMapBindings } from "./types";
import { ConfigMapCollection } from "./collection";

import { getMetadata } from "src/main";

export class ConfigMapRegistry extends Map<
  keyof ConfigMapBindings,
  ConfigMapCollection<any>
> {
  public get<T extends keyof ConfigMapBindings>(key: T) {
    return super.get(key) as ConfigMapBindings[T];
  }

  public set<T extends keyof ConfigMapBindings>(
    key: T,
    value: ConfigMapCollection<any>,
  ) {
    return super.set(key, value);
  }

  public register(configMapCollection: ConfigMapCollection<any>) {
    const { id } = getMetadata("configmap.bind", configMapCollection.klass);
    this.set(id, configMapCollection);
  }
}
