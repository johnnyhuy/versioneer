// Source: https://github.com/conventional-changelog/standard-version/blob/master/lib/latest-semver-tag.js

import gitSemverTags from "git-semver-tags";
import semver from "semver";

export function getGitVersion(tagPrefix: string = undefined): Promise<string> {
  return new Promise((resolve, reject) => {
    gitSemverTags({ tagPrefix }, function (error, tags) {
      if (error) return reject(error);
      resolve(getTag(tags));
    });
  });
}

export function getTag(tags: string[]): string {
  if (!tags.length) return "1.0.0";
  tags = tags.map((tag) => {
    return semver.clean(tag);
  });
  tags.sort(semver.rcompare);
  return tags[0];
}

export async function commitVersion(version: string) {
  // TODO
}

export async function tagVersion(version: string) {
  // TODO
}
