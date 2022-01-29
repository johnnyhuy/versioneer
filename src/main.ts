import { argv } from 'process'
import { getGitVersion, tagVersion } from "./lib/git";
import { Command } from "commander";
import { bumpVersion } from "./lib/version";
import { githubRelease } from "./lib/github";

export async function main(args?: string[]) {
  args = args || argv
  const program = new Command();
  program.option("version", "Version this working directory");
  program.showHelpAfterError();
  await program.parseAsync(args);
  const options = program.opts();

  if (options.version) {
    const currentVersion = await getGitVersion();
    let proposedVersion = "1.0.0";

    if (currentVersion !== "") {
      proposedVersion = await bumpVersion(currentVersion);
    }

    await tagVersion(currentVersion);
    // await githubRelease();
  }
}
