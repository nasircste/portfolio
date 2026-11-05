import { existsSync } from "node:fs";
import { join } from "node:path";

/** True when /public/profile.jpg exists (checked at build/render time on the server). */
export function hasProfilePhoto() {
  return existsSync(join(process.cwd(), "public", "profile.jpg"));
}
