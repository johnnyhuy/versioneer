import { argv } from "process";
import { getCurrentGitVersion, tagVersion } from "./lib/git";
import { Command } from "commander";
import { bumpVersion } from "./lib/version";
import { githubRelease } from "./lib/github";

const program = new Command();

program.showHelpAfterError();

export async function main() {
  await program.parseAsync(argv);
  const options = program.opts();
  const currentVersion = await getCurrentGitVersion();
  let proposedVersion = currentVersion;

  if (currentVersion === '1.0.0') {
    proposedVersion = await bumpVersion(currentVersion);
  }

  await tagVersion(currentVersion);
  // await githubRelease();
}
