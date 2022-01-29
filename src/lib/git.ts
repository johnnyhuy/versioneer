// Source: https://github.com/conventional-changelog/standard-version/blob/master/lib/latest-semver-tag.js

import gitSemverTags from "git-semver-tags";
import semver from "semver";
import simpleGit from "simple-git";

export function getGitVersion(): Promise<string> {
  console.info("Getting Git version based Git tags on SemVer");

  return new Promise((resolve, reject) => {
    gitSemverTags({}, function (error, tags) {
      console.log(tags);
      if (error) return reject(error);
      resolve(getCurrentGitTag(tags));
    });
  });
}

export function getCurrentGitTag(tags: string[]): string {
  console.info("Getting current tag");

  if (!tags.length) {
    console.warn('No valid Git tags found, defaulting to nothing');
    return '';
  }

  tags = tags.map((tag) => {
    return semver.clean(tag);
  });
  tags.sort(semver.rcompare);

  console.info(tags);

  return tags[0];
}

export async function tagVersion(version: string) {
  console.info(`Git tagging version ${version}`);
  const git = simpleGit();
  git.addTag(version);
}
