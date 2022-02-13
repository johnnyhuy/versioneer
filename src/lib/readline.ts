import { stdin, stdout } from "process"
import { createInterface } from "readline"

export async function askConfirmation(yesCallback: () => {}) {
    const rl = createInterface(stdin, stdout)

    rl.question("\n💬 Confirm? yes[y]/no[n]: ", async function (answer) {
        if (answer.match(/[Yy](es)?/g)) {
            await yesCallback()
        }

        rl.close()
    })
}