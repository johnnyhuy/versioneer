// Source: https://github.com/conventional-changelog/standard-version/blob/master/lib/latest-semver-tag.js

import gitSemverTags from "git-semver-tags";
import semver from "semver";
import simpleGit from "simple-git";
import { debug, warn } from "./logger";

export function getGitVersion(): Promise<string> {
  debug("Getting Git version based Git tags on SemVer");

  return new Promise((resolve, reject) => {
    gitSemverTags({}, function (error, tags) {
      if (error) return reject(error);
      resolve(getCurrentGitTag(tags));
    });
  });
}

export function getCurrentGitTag(tags: string[]): string {
  debug("Getting current tag");

  if (!tags.length) {
    warn('Warning! No valid Git tags found');
    return '';
  }

  tags = tags.map((tag) => {
    return semver.clean(tag);
  });
  tags.sort(semver.rcompare);

  return tags[0];
}

export async function tagVersion(version: string) {
  debug(`Git tagging version ${version}`);
  const git = simpleGit();
  git.addTag(version);
}
