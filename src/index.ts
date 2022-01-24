import { exit } from "process";
import { getGitVersion } from "./lib/get-git-version";

export async function main() {
  try {
    version = await getGitVersion(args.tagPrefix);

    const newVersion = await bump(args, version);
    await commit(args, newVersion);
    await tag(newVersion, pkg ? pkg.private : false, args);
  } catch (error) {
    exit(1);
  }
}