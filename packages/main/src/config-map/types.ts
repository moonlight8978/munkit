export interface ConfigMapBindings {}

export type AttributeSchema = ({ value }: { value: any }) => any;

declare module "src/decorator/main" {
  interface MetadataDefinitions {
    "configmap.bind": {
      file: string;
      id: keyof ConfigMapBindings;
    };
    "configmap.attribute": {
      name: string;
      schema: AttributeSchema;
    };
    "configmap.key": string;
    "configmap.collection": Initializable<any>;
  }
}

export type Initializable<T> = { new (...args: any[]): T };

export interface ConfigMapRecordContract {
  getAttribute<T>(propertyName: string): T;
  setAttribute<T>(propertyName: string, value: T): void;
}

export interface CsvContract {
  getRows(file: string): Promise<Array<Record<string, string>>>;
}
