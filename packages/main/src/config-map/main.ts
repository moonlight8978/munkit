import { getMetadata } from "../main";

import { Attributes } from "./attributes";
import { ConfigMapCollection } from "./collection";
import { Initializable, ConfigMapRecordContract, CsvContract } from "./types";

export class CsvConfigMap {
  constructor(private csv: CsvContract) {}

  public async read<T extends ConfigMapRecordContract>(
    Type: Initializable<T>,
  ): Promise<ConfigMapCollection<T>> {
    const bindMeta = getMetadata("configmap.bind", Type);
    if (!bindMeta.file) {
      throw new Error(`'file' is required`);
    }

    const rows = await this.csv.getRows(bindMeta.file);

    const collection = new ConfigMapCollection(Type);
    const attributes = new Attributes(Type);

    rows.forEach((row) => {
      const record = attributes.updateOrCreate(
        collection[collection.length - 1],
        row,
      );
      if (record) {
        collection.push(record);
      }
    });

    return collection;
  }
}

export * from "./collection";
export * from "./registry";
export * from "./record";
export * from "./schema";
export * from "./types";
