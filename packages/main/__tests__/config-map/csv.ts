import path from "node:path";
import fs from "node:fs";

import { parse } from "csv-parse/sync";

import { CsvContract } from "src/config-map/main";

export class Csv implements CsvContract {
  public async getRows(file: string): Promise<Record<string, string>[]> {
    const filePath = path.join(__dirname, file);
    const rows = parse(fs.readFileSync(filePath, "utf-8"), {
      columns: true,
      skip_empty_lines: true,
    }) as Record<string, any>[];
    return rows;
  }
}
