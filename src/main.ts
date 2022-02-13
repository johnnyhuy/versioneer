import { argv, cwd } from 'process'
import { deleteTags, getAllTags, getCurrentTag, tagGit, tagNodePackage } from "./lib/git"
import { Command } from "commander"
import { bumpVersion } from "./lib/version"
import { debug, error, info, log, Logger, warn } from './lib/logger'
import { askConfirmation } from './lib/readline'

export async function main(args?: string[]) {
  args = args || argv

  const program = new Command()
  program
    .showHelpAfterError()

  program
    .enablePositionalOptions()
    .option('-d --debug', 'Show debugging messages')
    .hook('preAction', (thisCommand) => {
      if (thisCommand.opts().debug) {
        new Logger(true)
        debug('Debugging messages enabled!')
      }
    })

  program
    .command('apply')
    .description('Version this directory')
    .option('--init', 'Initial version, do not bump')
    .option('--push', 'Push changes to Git remote')
    .option('--dry-run, -D', 'Show a plan of changes')
    .option('--force -F', 'Run the command without confirmation')
    .action(async function () {
      let currentVersion = getCurrentTag(await getAllTags())
      let proposedVersion = "1.0.0"
      const dryRun = this.opts().D
      const force = this.opts().F
      const init = this.opts().init

      if (currentVersion !== "") {
        if (init) {
          error(`Cannot init version this directory, version ${currentVersion} already exists`)
          return
        }
          
        proposedVersion = await bumpVersion(currentVersion)
      }

      if (dryRun) {
        warn('Dry-run enabled...')
      }

      log(`\n✅ Versioning this directory...`)
      info(`${cwd()}\n`)

      log(`🥾 ${init ? 'Init' : 'Bumping'} version...`)
      info(`${currentVersion !== '' ? currentVersion : 'none'} -> ${proposedVersion}`)

      if (dryRun) {
        return
      }

      askConfirmation(force, async () => {
        await tagNodePackage(proposedVersion)
        await tagGit(proposedVersion)
      })
    })

  program
    .command('rollback')
    .description('Rollback to the last known SemVer tag from this directory')
    .option('--push', 'Push changes to Git remote')
    .option('--dry-run, -D', 'Show a plan of changes')
    .option('--force -F', 'Run the command without confirmation')
    .action(async function () {
      info('Work in progress!')
    })

  program
    .command('purge')
    .description('Purge all versions from this directory')
    .option('--push', 'Push changes to Git remote')
    .option('--dry-run, -D', 'Show a plan of changes')
    .option('--force -F', 'Run the command without confirmation')
    .action(async function () {
      let versions = await getAllTags()
      const dryRun = this.opts().D
      const force = this.opts().F

      if (dryRun) {
        warn('Dry-run enabled...')
      }

      log(`\n✅ Versioning this directory...`)
      info(`${cwd()}\n`)

      if (versions.length === 0) {
        warn('No tags available to purge')
        return
      } else {
        log(`🥾 Deleting tags...`)
        info(versions.join(', '))
      }

      if (dryRun) {
        return
      }

      askConfirmation(force, async () => {
        await deleteTags(versions)
      })
    })

  await program.parseAsync(args)
}
