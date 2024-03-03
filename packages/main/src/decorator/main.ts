import "reflect-metadata";

export interface MetadataDefinitions {}

export function Metadata<T extends keyof MetadataDefinitions>(
  key: T,
  value: MetadataDefinitions[T]
) {
  return (...args: any[]) => {
    switch (args.length) {
      case 1: {
        if (/^class\s/.test(Function.prototype.toString.call(args[0]))) {
          const [klass] = args as Parameters<ClassDecorator>;
          Reflect.defineMetadata(key, value, klass);
          break;
        }

        throw new Error("Not supported yet");
      }

      case 2:
      case 3:
        const [instance, property] = args as Parameters<PropertyDecorator>;
        Reflect.defineMetadata(key, value, instance, property);
        break;
      default:
        throw new Error("Not supported yet");
    }
  };
}

export function getMetadata<T extends keyof MetadataDefinitions, U>(
  key: T,
  klass: { new (...args: any[]): U }
): MetadataDefinitions[T];

export function getMetadata<T extends keyof MetadataDefinitions, U>(
  key: T,
  instance: U,
  property: keyof U
): MetadataDefinitions[T];

export function getMetadata(...args: any[]) {
  const [key, ...rest] = args;
  if (Reflect.hasMetadata(key, rest[0], rest[1])) {
    return Reflect.getMetadata(key, rest[0], rest[1]);
  }
}
