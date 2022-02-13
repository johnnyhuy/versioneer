// Source: https://github.com/conventional-changelog/standard-version/blob/master/lib/latest-semver-tag.js

import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import gitSemverTags from "git-semver-tags"
import { cwd } from 'process';
import semver from "semver"
import simpleGit from "simple-git"
import { debug, info, log, success, warn } from "./logger"

export function getAllTags(): Promise<string[]> {
  debug("Getting all Git versions")

  return new Promise((resolve, reject) => {
    gitSemverTags({}, function (error, tags) {
      if (error) return reject(error)
      debug(tags)
      resolve(tags)
    })
  })
}

export function getCurrentTag(tags: string[]): string {
  debug("Getting current tag")

  if (!tags.length) {
    warn('No valid Git tags found')
    return ''
  }

  tags = tags.map((tag) => {
    return semver.clean(tag)
  })
  tags.sort(semver.rcompare)

  debug(tags[0])

  return tags[0]
}

export async function tagNodePackage(version: string) {
  log(`\n👀 Finding package.json...`)
  if (!existsSync('package.json')) {
    warn(`package.json does not exist in ${cwd()}\n`)
    return
  }

  log(`\n✍️ Tagging package.json to ${version}...`)
  const data = JSON.parse(await readFile("package.json", 'utf-8'));
  data.version = version;
  await writeFile("package.json", JSON.stringify(data, null, 2));

  const git = simpleGit()
  git.add('package.json')
  git.commit(`chore: Bumped \`package.json\` to ${version}`)
}

export async function tagGit(version: string) {
  log(`\n✍️ Tagging Git to ${version}...`)
  const git = simpleGit()
  git.addTag(version)
  success(`\n✅ Done!`)
}

export async function deleteTags(tags: string[]) {
  log(`\n✍️ Deleting tags ${tags.join(', ')}`)
  const git = simpleGit()
  for (const tag of tags) {
    git.tag(['-d', tag])
  }
  success(`\n✅ Done!`)
}
