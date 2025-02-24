import * as fs from "fs";
import * as path from "path";

type ConfigObject = { [key: string]: any };

const CONFIG: ConfigObject = {};

const configDir = path.join(__dirname, "../config");

const files = fs.readdirSync(configDir);

files.forEach((file) => {
  if (/\.(js|ts)$/.test(file)) {
    const filePath = path.join(configDir, file);
    const configModule = require(filePath);
    const configContent = configModule.default || configModule;
    const key = file.replace(/\.(js|ts)$/, "");
    CONFIG[key] = configContent;
  }
});

/**
 * Retrieves a nested value from the CONFIG object using a dot-notated string.
 *
 * @param path - Dot-notated string path (e.g., 'app.port').
 * @returns The value at the specified path.
 * @throws An error if the specified path is not found in the CONFIG object.
 */
const config = <T>(path: string): T => {
  const keys = path.split(".");
  let result: any = CONFIG;

  for (const key of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, key)) {
      result = result[key];
    } else {
      throw new Error(`Config path "${path}" not found.`);
    }
  }

  return result as T;
};

export default config;
