import fsPromises from "fs/promises";
import path from "path";

type FileFormat = "JSON" | "TEXT";

type Config = {
  type: FileFormat;
  parse?: boolean;
};

export async function getLocalData(filePath: string, config?: Config) {
  const resolvedPath = path.resolve(process.cwd(), filePath);
  const rawData = await fsPromises.readFile(resolvedPath, "utf-8");

  if (config?.type === "JSON" && config?.parse) {
    return JSON.parse(rawData);
  }

  return rawData;
}
