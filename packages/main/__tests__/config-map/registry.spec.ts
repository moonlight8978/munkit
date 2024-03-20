import { Csv } from "./csv";
import { Student } from "./student";

import { CsvConfigMap, ConfigMapRegistry } from "src/config-map/main";

describe("Registry", () => {
  test("read config map", async () => {
    const csv = new Csv();
    const csvConfigMap = new CsvConfigMap(csv);
    const students = await csvConfigMap.read(Student);
    const registry = new ConfigMapRegistry();
    registry.register(students);

    expect(registry.get("configmap.student").size).toEqual(3);
    expect(students.size).toEqual(3);
  });
});
