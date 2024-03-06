import "reflect-metadata";

export interface MetadataDefinitions {}

export function Metadata<T extends keyof MetadataDefinitions>(
  key: T,
  options: { emit: boolean },
): PropertyDecorator;

export function Metadata<T extends keyof MetadataDefinitions>(
  key: T,
  value: MetadataDefinitions[T],
): any;

export function Metadata(...args: any[]) {
  const [key, valueOrOptions] = args;

  return (...args: any[]) => {
    if (valueOrOptions?.emit === true) {
      const klass = args[0].constructor;
      const property = args[1];
      const properties = Reflect.getMetadata(key, klass) ?? [];
      return Reflect.defineMetadata(key, [...properties, property], klass);
    }

    const value = valueOrOptions;
    Reflect.defineMetadata(key, value, args[0], args[1]);
  };
}

export function getMetadata<T extends keyof MetadataDefinitions, U>(
  key: T,
  klass: { new (...args: any[]): U },
  options?: { singular: boolean },
): MetadataDefinitions[T];

export function getMetadata<T extends keyof MetadataDefinitions, U>(
  key: T,
  instance: U,
  property: keyof U,
): MetadataDefinitions[T];

export function getMetadata<T extends keyof MetadataDefinitions>(
  ...args: any[]
) {
  const [key, instanceOrClass, propertyOrOptions] = args;
  const singular = propertyOrOptions?.singular || false;
  let metadata: MetadataDefinitions[T] | MetadataDefinitions[T][];

  if (Reflect.hasMetadata(key, instanceOrClass)) {
    metadata = Reflect.getMetadata(key, instanceOrClass);
  } else {
    const property = propertyOrOptions;
    metadata = Reflect.getMetadata(key, instanceOrClass, property);
  }

  if (singular) {
    return metadata?.[0];
  }

  return metadata as MetadataDefinitions[T];
}
