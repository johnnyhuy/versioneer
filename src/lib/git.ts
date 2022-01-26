// Source: https://github.com/conventional-changelog/standard-version/blob/master/lib/latest-semver-tag.js

import gitSemverTags from "git-semver-tags";
import semver from "semver";
import simpleGit from "simple-git";

export function getCurrentGitVersion(): Promise<string> {
  console.debug("Getting current Git version...");

  return new Promise((resolve, reject) => {
    gitSemverTags({}, function (error, tags) {
      console.debug(tags);
      if (error) return reject(error);
      resolve(getCurrentTag(tags));
    });
  });
}

export function getCurrentTag(tags: string[]): string {
  console.debug("Getting current tag...");

  if (!tags.length) {
    const defaultTag = "1.0.0";
    console.debug(`No tags found, defaulting to ${defaultTag}`);
    return defaultTag;
  }

  tags = tags.map((tag) => {
    return semver.clean(tag);
  });
  tags.sort(semver.rcompare);

  console.debug(tags);

  return tags[0];
}

export async function tagVersion(version: string) {
  console.debug(`Git tagging version ${version}...`);
  const git = simpleGit();
  git.addTag(version);
}
