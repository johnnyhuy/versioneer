import { argv } from 'process'
import { getGitVersion, tagVersion } from "./lib/git";
import { Command } from "commander";
import { bumpVersion } from "./lib/version";

export async function main(args?: string[]) {
  args = args || argv

  const program = new Command();
  program.showHelpAfterError();

  program.option('--dry-run, -D')
    .description('Dry run to skip Git tagging and third-party releases')

  await program.parseAsync(args);

  const options = program.opts();
  const currentVersion = await getGitVersion();
  let proposedVersion = "1.0.0";

  if (currentVersion !== "") {
    proposedVersion = await bumpVersion(currentVersion);
  }

  if (options.D) {
    console.info('Dry run enabled, skipping Git tag and other third-party releases')
    return;
  }

  await tagVersion(currentVersion);
  // await githubRelease();
}
