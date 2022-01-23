import latestSemverTag from "standard-version/lib/latest-semver-tag";
import { exit } from "process";

async function main() {
  try {
    let version;
    if (pkg) {
      version = pkg.version;
    } else if (args.gitTagFallback) {
      version = await latestSemverTag(args.tagPrefix);
    } else {
      throw new Error("no package file found");
    }

    const newVersion = await bump(args, version);
    await changelog(args, newVersion);
    await commit(args, newVersion);
    await tag(newVersion, pkg ? pkg.private : false, args);
  } catch (error) {
    exit(1);
  }
}

main();
