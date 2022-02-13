import chalk from "chalk"

export class Logger {
  debugMode: boolean
  static instance: Logger

  constructor(debug: boolean = false) {
    if (Logger.instance) {
      return Logger.instance
    }
    Logger.instance = this

    this.debugMode = debug
  }

  isDebug(): boolean {
    return this.debugMode
  }
}

export function log(message: string | string[]): void {
  console.log(message)
}

export function error(message: string | string[]): void {
  console.error(chalk.red(`ERROR: ${message}`))
}

export function warn(message: string | string[]): void {
  console.debug(chalk.hex("#FFDB55")(`WARNING: ${message}`))
}

export function debug(message: string | string[]): void {
  const logger = new Logger()
  if (logger.isDebug()) {
    console.debug(chalk.hex("#FFDB55")(`DEBUG: ${message}`))
  }
}

export function info(message: string | string[]): void {
  console.info(chalk.blue(message))
}

export function success(message: string | string[]): void {
  console.info(chalk.green(message))
}