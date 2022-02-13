import { log } from "console";
import { existsSync } from "fs";
import { readdirSync, renameSync, unlinkSync } from "fs";
import { rename, unlink } from "fs/promises";
import { chdir } from "process";
import { c } from "tar";

async function main() {
  const cliName = 'versioneer'

  chdir('bin')

  log('Packaging CLI into tar files')
  const binaryFiles = readdirSync('.')
  for (const binaryFile of binaryFiles) {
    await rename(binaryFile, cliName)
    await c(
      {
        gzip: true,
        file: `${binaryFile}.tar.gz`,
      },
      [cliName]
    )
    await unlink(cliName)
  }
}

main()