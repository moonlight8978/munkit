import {
  schema,
  ConfigMapRecord,
  ConfigMapCollection,
} from "src/config-map/main";
import { Metadata } from "src/decorator/main";

declare module "src/config-map/main" {
  export interface ConfigMapBindings {
    "configmap.student": ConfigMapCollection<Student>;
  }
}

export class Course extends ConfigMapRecord {
  @Metadata("configmap.attribute", {
    name: "Course",
    schema: schema.string.required.resolve(),
  })
  public name: string = null!;

  @Metadata("configmap.attribute", {
    name: "Grade",
    schema: schema.string.required.resolve(),
  })
  public grade: string = null!;
}

export class Achievement extends ConfigMapRecord {
  @Metadata("configmap.attribute", {
    name: "ParentAchievement",
    schema: schema.string.required.resolve(),
  })
  public title: string = null!;
}

export class Parent extends ConfigMapRecord {
  @Metadata("configmap.attribute", {
    name: "ParentName",
    schema: schema.string.required.resolve(),
  })
  public name: string = null!;

  @Metadata("configmap.attribute", {
    name: "ParentRelationship",
    schema: schema.string.required.resolve(),
  })
  @Metadata("configmap.key")
  public relationship: string = null!;

  @Metadata("configmap.collection", Achievement)
  public achievements = new ConfigMapCollection(Achievement);
}

@Metadata("configmap.bind", {
  file: "TestStudent.csv",
  id: "configmap.student",
})
export class Student extends ConfigMapRecord {
  @Metadata("configmap.key")
  @Metadata("configmap.attribute", {
    name: "Id",
    schema: schema.integer.required.resolve(),
  })
  public id: number = null!;

  @Metadata("configmap.attribute", {
    name: "Name",
    schema: schema.string.required.resolve(),
  })
  public name: string = null!;

  @Metadata("configmap.attribute", {
    name: "Age",
    schema: schema.integer.required.resolve(),
  })
  public age: number = null!;

  @Metadata("configmap.collection", Course)
  public courses = new ConfigMapCollection(Course);

  @Metadata("configmap.collection", Parent)
  public parents = new ConfigMapCollection(Course);
}
