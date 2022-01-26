import { getCurrentGitVersion } from "./lib/git";
import { main } from "./main";

jest.mock("./lib/git");

test("bump version when default is current version", async () => {
  // Arrange
  

  // Act
  await main();

  // Assert
  expect(getCurrentGitVersion).toBeCalled();
});
