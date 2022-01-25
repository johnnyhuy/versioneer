import { argv } from "process";
import { getGitVersion } from "./lib/git";
import { Command } from "commander";

const program = new Command();

program.showHelpAfterError();

async function main() {
  await program.parseAsync(argv);
  const options = program.opts();

  const test = await getGitVersion();
  console.debug(test);
}

main();
