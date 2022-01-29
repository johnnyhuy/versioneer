import { argv } from 'process'
import { getGitVersion, tagVersion } from "./lib/git";
import { bumpVersion } from "./lib/version";
import { main } from "./main";

jest.mock("./lib/git");
jest.mock("./lib/version");

beforeEach(() => {
  jest.clearAllMocks()
});

test("should not bump version on first version", async () => {
  // Arrange
  const getCurrentGitVersionMock = getGitVersion as jest.MockedFunction<
    typeof getGitVersion
  >;
  const tagVersionMock = tagVersion as jest.MockedFunction<
    typeof tagVersion
  >;
  getCurrentGitVersionMock.mockImplementation(() => {
    return new Promise<string>((resolve, reject) => {
      resolve("");
    });
  });

  // Act
  await main([...argv.slice(0, 2), 'version']);

  // Assert
  expect(getGitVersion).toBeCalled();
  expect(tagVersion).toBeCalled();
  expect(bumpVersion).not.toBeCalled();
});
