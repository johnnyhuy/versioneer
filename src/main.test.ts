import { argv } from 'process'
import { MockedFunction } from 'ts-jest'
import { getGitVersion, tagVersion } from "./lib/git";
import { bumpVersion } from "./lib/version";
import { main } from "./main";

jest.mock("./lib/git");
jest.mock("./lib/version");

function args(...args: string[]) {
  return [...argv.slice(0, 1), 'versioneer', ...args]
}

beforeEach(() => {
  jest.clearAllMocks()
});

test("should not bump version on first version", async () => {
  // Arrange
  const getGitVersionMock = getGitVersion as MockedFunction<
    typeof getGitVersion
  >;
  getGitVersionMock.mockImplementation(() => {
    return new Promise<string>((resolve, reject) => {
      resolve("");
    });
  });

  // Act
  await main(args('version'));

  // Assert
  expect(getGitVersion).toBeCalled();
  expect(tagVersion).toBeCalled();
  expect(bumpVersion).not.toBeCalled();
});

test("should bump version on existing version", async () => {
  // Arrange
  const getGitVersionMock = getGitVersion as MockedFunction<
    typeof getGitVersion
  >;
  getGitVersionMock.mockImplementation(() => {
    return new Promise<string>((resolve, reject) => {
      resolve("1.0.0");
    });
  });

  // Act
  await main(args(''));

  // Assert
  expect(getGitVersion).toBeCalled();
  expect(tagVersion).toBeCalled();
  expect(bumpVersion).toBeCalled();
});

test("should not tag or release on dry run", async () => {
  // Arrange
  const getGitVersionMock = getGitVersion as MockedFunction<
    typeof getGitVersion
  >;
  getGitVersionMock.mockImplementation(() => {
    return new Promise<string>((resolve, reject) => {
      resolve("1.0.0");
    });
  });
  jest.spyOn(process, 'exit').mockImplementation();

  // Act
  await main(args('--dry-run'));

  // Assert
  expect(getGitVersion).toBeCalled();
  expect(tagVersion).not.toBeCalled();
  expect(bumpVersion).toBeCalled();
});
