import "reflect-metadata";

export interface MetadataDefinitions {}

export function Metadata<T extends keyof MetadataDefinitions>(
  key: T,
  value: MetadataDefinitions[T],
) {
  return (...args: any[]) => {
    Reflect.defineMetadata(key, value, args[0], args[1]);
  };
}

export function getMetadata<T extends keyof MetadataDefinitions, U>(
  key: T,
  klass: { new (...args: any[]): U },
): MetadataDefinitions[T];

export function getMetadata<T extends keyof MetadataDefinitions, U>(
  key: T,
  instance: U,
  property: keyof U,
): MetadataDefinitions[T];

export function getMetadata(...args: any[]) {
  const [key, ...rest] = args;
  if (Reflect.hasMetadata(key, rest[0], rest[1])) {
    return Reflect.getMetadata(key, rest[0], rest[1]);
  }
}
