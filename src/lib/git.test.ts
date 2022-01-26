import { getCurrentTag } from "./git";


test("check tags if no tags", async () => {
  // Arrange
  const tags: string[] = [];

  // Act
  const result = getCurrentTag(tags);

  // Assert
  expect(result).toEqual("1.0.0");
});

test("check tags if no tags", async () => {
  // Arrange
  const tags: string[] = ['12.3.2', 'v12.3.2', 'v1.0.0','0.0.0-alpha'];

  // Act
  const result = getCurrentTag(tags);

  // Assert
  expect(result).toEqual("12.3.2");
});
