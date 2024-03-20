import "reflect-metadata";

export interface MetadataDefinitions {}

export type PropertyInfo<T extends keyof MetadataDefinitions> = {
  metadata: MetadataDefinitions[T];
  name: string;
};

export function Metadata<T extends keyof MetadataDefinitions>(
  key: T,
  maybeValue?: MetadataDefinitions[T],
) {
  return (...args: any[]) => {
    const property = args[1];

    if (property) {
      const klass = args[0].constructor;

      const propertyInfo = {
        name: property,
        metadata: maybeValue,
      };

      if (!Reflect.hasMetadata(key, klass)) {
        Reflect.defineMetadata(key, [], klass);
      }

      const propertiesInfo = Reflect.getMetadata(key, klass);
      propertiesInfo.push(propertyInfo);
    }

    Reflect.defineMetadata(key, maybeValue, args[0], property);
  };
}

export function getMetadata<T extends keyof MetadataDefinitions>(
  key: T,
  ...args: any[]
): MetadataDefinitions[T] {
  return Reflect.getMetadata(key, args[0], args[1]);
}

export function getAllMetadata<T extends keyof MetadataDefinitions>(
  key: T,
  klass: any,
): PropertyInfo<T>[] {
  return Reflect.getMetadata(key, klass) ?? [];
}
