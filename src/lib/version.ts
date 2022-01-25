import conventionalRecommendedBump from "conventional-recommended-bump";
import semver from "semver";

export async function bumpVersion(version: string): Promise<string> {
  return new Promise((resolve, reject) => {
    conventionalRecommendedBump(
      {
        preset: "conventionalcommits",
      },
      function (err, release) {
        if (err) return reject(err);
        else return resolve(semver.inc(version, release.releaseType));
      }
    );
  });
}
