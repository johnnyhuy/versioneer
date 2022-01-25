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
