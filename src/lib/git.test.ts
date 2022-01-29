import { getCurrentGitTag } from "./git";


test("should return empty string on no tags", async () => {
  // Arrange
  const tags: string[] = [];

  // Act
  const result = getCurrentGitTag(tags);

  // Assert
  expect(result).toEqual("");
});

test("should return a string on multiple tags", async () => {
  // Arrange
  const tags: string[] = ['12.3.2', 'v12.3.2', 'v1.0.0','0.0.0-alpha'];

  // Act
  const result = getCurrentGitTag(tags);

  // Assert
  expect(result).toEqual("12.3.2");
});
