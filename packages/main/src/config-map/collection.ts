import { getAllMetadata } from "../main";

import { ConfigMapRecordContract } from "./types";

export class ConfigMapCollection<
  T extends ConfigMapRecordContract,
> extends Array<T> {
  declare primaryKey: string;

  constructor(
    public klass: { new (...args: any[]): T },
    ...items: T[]
  ) {
    super();
    const primaryKeys = getAllMetadata("configmap.key", klass);
    this.primaryKey = primaryKeys[0]?.name;
    this.push(...items);
  }

  // public static import<T>(klass: any, rows: any[]) {
  //   const records = plainToInstance(klass, rows) as any[];
  //   return new ConfigMapCollection<T>(klass, ...records);
  // }

  // public export() {
  //   return this.map((record) => instanceToPlain(record));
  // }

  public map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[] {
    return Array.from(this).map(callbackfn);
  }

  public filter(
    callbackfn: (value: T, index: number, array: T[]) => unknown,
  ): T[] {
    return Array.from(this).filter(callbackfn);
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

    return this.find((e: any) => e[this.primaryKey] === key);
  }

  public sole() {
    return this.get("sole");
  }

  public get size() {
    return this.length;
  }
}
