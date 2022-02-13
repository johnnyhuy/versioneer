import { stdin, stdout } from "process"
import { createInterface } from "readline"

export function askConfirmation(skip: boolean = false, callback: () => {}): Promise<void> {
  if (skip) {
    callback()
    return
  }

  const rl = createInterface(stdin, stdout)

  rl.question("\n💬 Confirm? yes[y]/no[n]: ", function (answer) {
    if (answer.match(/[Yy](es)?/g)) {
      callback()
    }

    rl.close()
  })
}