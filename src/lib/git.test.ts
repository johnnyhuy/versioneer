import { getCurrentTag } from "./git"

jest.mock("./logger")

beforeEach(() => {
  jest.spyOn(console, 'info').mockImplementation(() => {})
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

test("should return empty string on no tags", () => {
  // Arrange
  const tags: string[] = []

  // Act
  const result = getCurrentTag(tags)

  // Assert
  expect(result).toEqual("")
})

test("should return a string on multiple tags", () => {
  // Arrange
  const tags: string[] = ['12.3.2', 'v12.3.2', 'v1.0.0','0.0.0-alpha']

  // Act
  const result = getCurrentTag(tags)

  // Assert
  expect(result).toEqual("12.3.2")
})
