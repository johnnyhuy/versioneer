import { getTag } from "./git";

test("check tags if no tags", async () => {
  // Arrange
  const tagPrefix = "";
  const tags: string[] = [];

  // Act
  const result = getTag(tagPrefix, tags);

  // Assert
  expect(result).toEqual("1.0.0");
});

test("check tags if no tags", async () => {
  // Arrange
  const tagPrefix = "";
  const tags: string[] = ['12.3.2', 'v12.3.2', 'v1.0.0','0.0.0-alpha'];

  // Act
  const result = getTag(tagPrefix, tags);

  // Assert
  expect(result).toEqual("12.3.2");
});
