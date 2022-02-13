# Versioneer

An *opinionated* standalone tool used to quickly version Git repos that wraps around [Conventional Changelog](https://github.com/conventional-changelog) projects.

The goal of this project is to make versioning a portable as possible.

### It's yet another versioning tool

This is a learning experience to distribute a CLI package across different platforms.

### Alternatives

This tool may not suit your project. However, there are plenty of more mature open source projects that solve version release management.

- [`release-it/release-it`](https://github.com/release-it/release-it#git)
- [`semantic-release/semantic-release`](https://github.com/semantic-release/semantic-release)
- [`conventional-changelog/standard-version`](https://github.com/conventional-changelog/standard-version)

## 🏆 Features

- Git tags
- Follows the [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) by default
- GitHub release generation

## Getting Started

### Installation

#### Homebrew

```bash
brew install 
```

### Usage

```text
Usage: versioneer [options] [command]

Options:
  -d --debug       Show debugging messages
  -h, --help       display help for command

Commands:
  apply [options]  Version this directory
  purge [options]  Purge all versions from this directory
  help [command]   display help for command
```

## Contributing

Any feedback is welcome! Fork out and raise a pull request.

We can use [VSCode dev containers](https://code.visualstudio.com/docs/remote/containers) to quickly spin up a NodeJS environment through [Docker](https://docs.docker.com/get-docker/). Once the environment is setup, just install Node packages.

```bash
npm i
```

Use the VSCode JavaScript Terminal to start debugging!

