import { Metadata, getMetadata } from "@/decorator/main";

@Metadata("grade", 6)
class Student {
  @Metadata("age.visibility", "hidden")
  @Metadata("student.id", { emit: true })
  @Metadata("student.properties", { emit: true })
  declare age: number;

  @Metadata("student.properties", { emit: true })
  declare name: string;

  constructor(age: number) {
    this.age = age;
  }
}

describe("Metadata", () => {
  it("should decorate the class", () => {
    expect(getMetadata("grade", Student)).toBe(6);
  });

  it("should decorate the property", () => {
    const student = new Student(12);
    expect(getMetadata("age.visibility", student, "age")).toBe("hidden");
  });

  it("should get the emitted metadata in singular", () => {
    expect(getMetadata("student.id", Student, { singular: true })).toEqual(
      "age",
    );
  });

  it("should get the emitted metadata", () => {
    expect(getMetadata("student.properties", Student)).toEqual(["age", "name"]);
  });
});

declare module "@/decorator/main.js" {
  interface MetadataDefinitions {
    grade: number;
    "age.visibility": "hidden" | "visible";
    "student.id": string;
    "student.properties": string[];
  }
}
