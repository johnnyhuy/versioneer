// Source: https://github.com/conventional-changelog/standard-version/blob/master/lib/latest-semver-tag.js

import gitSemverTags from "git-semver-tags"
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

export async function tagVersion(version: string) {
  log(`\n✍️ Tagging ${version}...`)
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
