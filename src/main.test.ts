import { argv, nextTick } from 'process'
import { MockedFunction } from 'ts-jest'
import { getGitVersion, tagVersion } from "./lib/git";
import { bumpVersion } from "./lib/version";
import { main } from "./main";
import { MockSTDIN, stdin } from "mock-stdin"

jest.mock("./lib/git");
jest.mock("./lib/version");

function args(...args: string[]) {
  return [...argv.slice(0, 1), 'versioneer', ...args]
}

let stdinMock: MockSTDIN;

beforeEach(() => {
  stdinMock = stdin();
  jest.clearAllMocks()
  jest.spyOn(console, 'info').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
  jest.spyOn(process, 'exit').mockImplementation();
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
  stdinMock.send("yes\r")

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
  await main(args('version'));
  stdinMock.send("yes\r")

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

  // Act
  await main(args('version', '--dry-run'));

  // Assert
  expect(getGitVersion).toBeCalled();
  expect(tagVersion).not.toBeCalled();
  expect(bumpVersion).toBeCalled();
});

test("should cancel version on confirmation", async () => {
  // Act
  await main(args('version', '--dry-run'));
  stdinMock.send("nah\r")

  // Assert
  expect(getGitVersion).toBeCalled();
  expect(tagVersion).not.toBeCalled();
  expect(bumpVersion).toBeCalled();
});
