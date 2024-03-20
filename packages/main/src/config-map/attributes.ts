import { getAllMetadata } from "@/decorator/main";

import { ConfigMapCollection } from "./collection";
import {
  Initializable,
  ConfigMapRecordContract,
  AttributeSchema,
} from "./types";

export class Attributes<T extends ConfigMapRecordContract> {
  #nameToCollectionAttributes: Map<
    string,
    Attributes<ConfigMapRecordContract>
  > = new Map();
  #nameToPropertyInfo = new Map<
    string,
    { header: string; schema: AttributeSchema }
  >();

  constructor(private Type: Initializable<T>) {
    const properties = getAllMetadata("configmap.attribute", Type);
    properties.forEach((property) => {
      const { name: header, schema } = property.metadata;

      if (header) {
        this.#nameToPropertyInfo.set(property.name, { header, schema });
        return;
      }
    });

    const collections = getAllMetadata("configmap.collection", Type);
    collections.forEach((collection) => {
      const attributes = new Attributes(collection.metadata);
      this.#nameToCollectionAttributes.set(collection.name, attributes);
    });
  }

  public updateOrCreate(record: T | undefined, row: Record<string, any>) {
    const isAnyColumnHasValue = this.anyColumnHasValue(row);

    if (isAnyColumnHasValue) {
      record = new this.Type();

      for (const [
        propertyName,
        { header, schema },
      ] of this.#nameToPropertyInfo.entries()) {
        const colValue = row[header];
        try {
          record.setAttribute(propertyName, schema({ value: colValue }));
        } catch (err: any) {
          console.debug(
            `Cannot cast value for property ${propertyName}, value: ${colValue} ${err.message}`,
          );
          console.debug(row);
          throw err;
        }
      }
    }

    for (const [
      propertyName,
      attributes,
    ] of this.#nameToCollectionAttributes.entries()) {
      const collection = record!.getAttribute(
        propertyName,
      ) as ConfigMapCollection<ConfigMapRecordContract>;
      const collectionRecord = attributes.updateOrCreate(
        collection[collection.length - 1],
        row,
      );
      if (collectionRecord) {
        collection.push(collectionRecord);
      }
    }

    return isAnyColumnHasValue ? record : null;
  }

  private anyColumnHasValue(row: Record<string, string>): boolean {
    for (const { header } of this.#nameToPropertyInfo.values()) {
      if (row[header]) {
        return true;
      }
    }

    return false;
  }
}
