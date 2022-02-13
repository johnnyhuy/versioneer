# Findings

This project will be a learning experience for myself around the TypeScript ecosystem along with distributing binaries with different package managers.

## Don't specify a file when using `tsc`

When we do a `tsc {file}` it will not load the `tsconfig.json` file if the target Typescript file is in a nested folder of the project. `tsc` is only smart enough to glob config files at that particular directory.

[Reference 2](https://stackoverflow.com/a/67619647/7506439)
[Reference 1](https://stackoverflow.com/a/33244030/7506439)

## `ts-jest` is needed for Jest testing with Typescript

Make sure our test files are `.ts` instead of `.js`.

```bash
# Install Typescript Jest
npm install --save-dev jest typescript ts-jest @types/jest

# Go to the project and init a Typescript Jest config
npx ts-jest config:init
```

Once all setup, running `jest` with `npm` should work.

## Always `jest.mock` at the module level

Importing modules into a Jest test file for mocking requires `jest.mock` to be called at the module level in order to mock a particular module imported via ESM. Putting it in the function scope of a test will not properly mock the function.

```ts
import { main } from "./main"

jest.mock("./lib/git") // Mock the module here

test("example", async () => {
  // Don't mock it here
  // jest.mock("./lib/git")

  // Act
  await main() // Mocked functions are used if main uses functions from "./lib/git"

  // Assert
  expect(getCurrentGitVersion).toBeCalled()
})
```

## Don't provide mock implementation at the module level

When adding more tests mocks of a specific module may require different mock implementations e.g. different return values. There's no need to declare mock implementation at the module level when we can declare it at the test function scope.

```ts
import { getCurrentGitVersion } from "./lib/git" // Import the function to mock
import { main } from "./main"

// Don't do this
// jest.mock(
//   "./lib/git",
//   jest.fn(() => {
//     return {
//       getCurrentGitVersion: jest.fn().mockResolvedValue("1.0.0"),
//       bumpVersion: jest.fn().mockResolvedValue(null),
//       tagVersion: jest.fn().mockResolvedValue(null),
//     }
//   })
// )

jest.mock("./lib/git") // Mock the module here

test("example", async () => {
  // Arrange
  getCurrentGitVersion.mockImplementation(() => {
    return 'whatever'
  })

  // Act
  await main()

  // Assert
  expect(getCurrentGitVersion).toBeCalled()
})
```

## Wrestling with interactive CLI command tests

There are opportunities where we'd want to run through confirmation prompts to test out user workflows.

```ts
import readline from "readline"

jest.mock('readline', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn().mockImplementation((question, callback) => callback("y")),
    close: jest.fn().mockImplementation()
  })
}))

test("example", async () => {
  // Arrange
  const question = jest.fn().mockImplementation()
  readline.createInterface = jest.fn().mockReturnValue({
    question: question,
    close: jest.fn().mockImplementation()
  })

  // Act
})
```
