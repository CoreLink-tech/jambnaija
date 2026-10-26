import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "node:url";
import path from "node:path";

const envDir = path.dirname(fileURLToPath(import.meta.url));
const globalEnvMarker = globalThis;

if (!globalEnvMarker.__examforgeEnvLoaded) {
  loadEnv({ path: path.resolve(envDir, "../.env"), override: false });
  globalEnvMarker.__examforgeEnvLoaded = true;
}
