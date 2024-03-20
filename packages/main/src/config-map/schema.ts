import { InferType, Schema, boolean, mixed, number, string } from "yup";

interface TransformSchema<TSchema extends Schema> {
  required: TransformSchema<TSchema>;
  toSchema: () => TSchema;
  resolve: ({ value }: any) => InferType<TSchema>;
}

class TransformSchemaNode<TSchema extends Schema>
  implements TransformSchema<TSchema>
{
  constructor(private schema: TSchema) {}

  get required() {
    return new TransformSchemaNode(this.schema.required());
  }

  toSchema() {
    return this.schema;
  }

  resolve() {
    return ({ value }: any) => {
      return this.schema.cast(value);
    };
  }
}

export const schema = {
  string: new TransformSchemaNode(string().trim()),
  integer: new TransformSchemaNode(number().integer()),
  float: new TransformSchemaNode(number()),
  boolean: new TransformSchemaNode(boolean()),
  enum(enumType: any) {
    return new TransformSchemaNode(mixed().oneOf(Object.values(enumType)));
  },
};
