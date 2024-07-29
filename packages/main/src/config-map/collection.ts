import { getAllMetadata } from "../main";

import { ConfigMapRecordContract } from "./types";

export class ConfigMapCollection<
  T extends ConfigMapRecordContract,
> extends Array<T> {
  declare primaryKey: string;
  #items: T[];
  #idToItem = new Map<any, T>();

  constructor(
    public klass: { new (...args: any[]): T },
    ...items: T[]
  ) {
    super();
    const primaryKeys = getAllMetadata("configmap.key", klass);
    this.primaryKey = primaryKeys[0]?.name;
    this.#items = items;

    this.push(...items);

    if (this.primaryKey) {
      this.#idToItem = new Map(
        items.map((item) => [item[this.primaryKey], item]),
      );
    }
  }

  public push(...items: T[]) {
    if (this.primaryKey) {
      items.forEach((item) => this.#idToItem.set(item[this.primaryKey], item));
    }

    return super.push(...items);
  }

  // public static import<T>(klass: any, rows: any[]) {
  //   const records = plainToInstance(klass, rows) as any[];
  //   return new ConfigMapCollection<T>(klass, ...records);
  // }

  // public export() {
  //   return this.map((record) => instanceToPlain(record));
  // }

  public map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[] {
    return this.#items.map(callbackfn);
  }

  public filter(
    callbackfn: (value: T, index: number, array: T[]) => unknown,
  ): T[] {
    return this.#items.filter(callbackfn);
  }

  public flatMap<U>(
    callbackfn: (value: T, index: number, array: T[]) => U[],
  ): U[] {
    return this.#items.flatMap(callbackfn);
  }

  public get<TKey>(key: TKey): T {
    const record = this.tryGet(key);

    if (!record) {
      throw new Error("Record not found");
    }

    return record;
  }

  public tryGet<TKey>(key: TKey): T | undefined {
    if (!this.primaryKey) {
      throw new Error("Key has not been defined");
    }

    return this.#idToItem.get(key) || undefined;
  }

  public sole() {
    return this.get("sole");
  }

  public get size() {
    return this.length;
  }
}
