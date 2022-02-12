import chalk from "chalk"

export class Logger {
  debugMode: boolean;
  static instance: Logger;

  constructor(debug: boolean = false) {
    if (Logger.instance) {
      return Logger.instance
    }
    Logger.instance = this;

    this.debugMode = debug;
  }

  isDebug(): boolean {
    return this.debugMode
  }
}

export function log(message: string): void {
  console.log(message)
}

export function error(message: string): void {
  console.error(chalk.red(message))
}

export function warn(message: string): void {
  console.debug(chalk.yellow(message))
}

export function debug(message: string): void {
  const logger = new Logger();
  if (logger.isDebug()) {
    console.debug(chalk.yellow(message))
  }
}

export function info(message: string): void {
  console.info(chalk.blue(message))
}