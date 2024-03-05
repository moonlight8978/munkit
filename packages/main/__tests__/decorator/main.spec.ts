import { Metadata, getMetadata } from "@/decorator/main";

@Metadata("grade", 6)
class Student {
  @Metadata("age.visibility", "hidden")
  declare age: number;

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
});

declare module "@/decorator/main.js" {
  interface MetadataDefinitions {
    grade: number;
    "age.visibility": "hidden" | "visible";
  }
}
