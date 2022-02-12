import { argv, stdin, stdout, cwd } from 'process'
import { getGitVersion, tagVersion } from "./lib/git";
import { Command } from "commander";
import { bumpVersion } from "./lib/version";
import { createInterface } from 'readline';
import { info, log, Logger } from './lib/logger';

export async function main(args?: string[]) {
  args = args || argv

  const program = new Command();
  program
    .name('versioneer')
    .showHelpAfterError()
    .option('--debug', 'Show debugging messages');

  program.parse(args)
  const options = program.opts();
  if (options.debug) {
    new Logger(true);
  }

  program
    .option('--dry-run, -D', 'Dry run to skip Git tagging and third-party releases')
    .command('version')
    .description('Version this directory')
    .action(async () => {
      const options = program.opts();
      const currentVersion = await getGitVersion();
      let proposedVersion = "1.0.0";

      if (currentVersion !== "") {
        proposedVersion = await bumpVersion(currentVersion);
      }

      if (options.D) {
        info('Dry run enabled, skipping Git tag and other third-party releases')
        return;
      }

      log(`\nVersioning this directory:`)
      info(cwd())
      const rl = createInterface(stdin, stdout)

      rl.question("\nConfirm? yes[y]/no[n]: ", async function (answer) {
        if (answer.match(/[Yy](es)?/g)) {
          await tagVersion(currentVersion);
        }

        rl.close()
      })
    })

  await program.parseAsync(args);
}
