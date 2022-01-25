import { argv } from "process";
import { commitVersion, getGitVersion, tagVersion } from "./lib/git";
import { Command } from "commander";
import { bumpVersion } from "./lib/version";
import { githubRelease } from "./lib/github";

const program = new Command();

program.showHelpAfterError();

async function main() {
  await program.parseAsync(argv);
  const options = program.opts();
  const currentVersion = await getGitVersion();
  const proposedVersion = await bumpVersion(currentVersion);
  console.log(proposedVersion);
  // await commitVersion(proposedVersion);
  // await tagVersion(proposedVersion);
  // await githubRelease();
}

main().catch((error) => {
  throw error;
});
