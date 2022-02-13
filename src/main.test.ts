import { argv } from 'process'
import { MockedFunction } from 'ts-jest'
import { deleteTags, getAllTags, getCurrentTag, tagGit, tagNodePackage } from "./lib/git"
import { bumpVersion } from "./lib/version"
import { main } from "./main"
import readline from "readline"

jest.mock("./lib/git")
jest.mock("./lib/version")
jest.mock("./lib/logger")
jest.mock('readline', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn().mockImplementation((question, callback) => callback("y")),
    close: jest.fn().mockImplementation()
  })
}))

function args(...args: string[]) {
  return [...argv.slice(0, 1), 'versioneer', ...args]
}

beforeEach(() => {
  jest.clearAllMocks()
  jest.spyOn(process, 'exit').mockImplementation()
})

test("should purge versions", async () => {
  // Arrange
  const getAllTagsMock = getAllTags as MockedFunction<
    typeof getAllTags
  >
  getAllTagsMock.mockImplementation(() => {
    return new Promise<string[]>((resolve, reject) => {
      resolve(["1.0.0", "10.0.0"]);
    });
  })
  const deleteTagsMock = deleteTags as MockedFunction<
    typeof deleteTags
  >
  deleteTagsMock.mockImplementation()

  // Act
  await main(args('purge'))

  // Assert
  expect(deleteTags).toBeCalled()
})

test("should not purge on no versions", async () => {
  // Arrange
  const getAllTagsMock = getAllTags as MockedFunction<
    typeof getAllTags
  >
  getAllTagsMock.mockImplementation(() => {
    return new Promise<string[]>((resolve, reject) => {
      resolve([]);
    });
  })
  const deleteTagsMock = deleteTags as MockedFunction<
    typeof deleteTags
  >
  deleteTagsMock.mockImplementation()

  // Act
  await main(args('purge'))

  // Assert
  expect(deleteTags).not.toBeCalled()
})

test("should not bump version on first version", async () => {
  // Arrange
  const getCurrentTagMock = getCurrentTag as MockedFunction<
    typeof getCurrentTag
  >
  getCurrentTagMock.mockImplementation(() => {
    return ""
  })

  // Act
  await main(args('apply'))

  // Assert
  expect(getCurrentTag).toBeCalled()
  expect(tagGit).toBeCalled()
  expect(bumpVersion).not.toBeCalled()
})

test("should bump version on existing version", async () => {
  // Arrange
  const getCurrentTagMock = getCurrentTag as MockedFunction<
    typeof getCurrentTag
  >
  getCurrentTagMock.mockImplementation(() => {
    return "1.0.0"
  })

  // Act
  await main(args('apply'))

  // Assert
  expect(getCurrentTag).toBeCalled()
  expect(tagNodePackage).toBeCalled()
  expect(tagGit).toBeCalled()
  expect(bumpVersion).toBeCalled()
})

test("should bump version on init", async () => {
  // Arrange
  const getCurrentTagMock = getCurrentTag as MockedFunction<
    typeof getCurrentTag
  >
  getCurrentTagMock.mockImplementation(() => {
    return ""
  })

  // Act
  await main(args('apply', '--init'))

  // Assert
  expect(getCurrentTag).toBeCalled()
  expect(tagNodePackage).toBeCalled()
  expect(tagGit).toBeCalled()
  expect(bumpVersion).not.toBeCalled()
})

test("should not run init if there are tags", async () => {
  // Arrange
  const getCurrentTagMock = getCurrentTag as MockedFunction<
    typeof getCurrentTag
  >
  getCurrentTagMock.mockImplementation(() => {
    return "1.0.0"
  })

  // Act
  await main(args('apply', '--init'))

  // Assert
  expect(getCurrentTag).toBeCalled()
  expect(tagNodePackage).not.toBeCalled()
  expect(tagGit).not.toBeCalled()
  expect(bumpVersion).not.toBeCalled()
})

test("should not tag or release on dry run", async () => {
  // Act
  await main(args('apply', '--dry-run'))

  // Assert
  expect(getCurrentTag).toBeCalled()
  expect(tagGit).not.toBeCalled()
  expect(bumpVersion).toBeCalled()
})

test("should not confirm on force", async () => {
  // Arrange
  const question = jest.fn().mockImplementation()
  readline.createInterface = jest.fn().mockReturnValue({
    question: question,
    close: jest.fn().mockImplementation()
  })

  // Act
  await main(args('apply', '--force'))

  // Assert
  expect(question).not.toBeCalled()
  expect(getCurrentTag).toBeCalled()
  expect(tagNodePackage).toBeCalled()
  expect(tagGit).toBeCalled()
  expect(bumpVersion).toBeCalled()
})

test("should cancel version on confirmation", async () => {
  // Act
  readline.createInterface = jest.fn().mockReturnValue({
    question: jest.fn().mockImplementation((question, callback) => callback("n")),
    close: jest.fn().mockImplementation()
  })
  await main(args('apply'))

  // Assert
  expect(getCurrentTag).toBeCalled()
  expect(tagGit).not.toBeCalled()
  expect(bumpVersion).toBeCalled()
})
