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

- Bumps Git tags based on [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Commits version bumps to `package.json`
- Version rollback
- Purges all tags
- Multi-platform - MacOS x64 & ARM, Windows x64, Linux x64, Docker

## 🚀 Getting Started


### Prerequisites

- [Git](https://git-scm.com/)

### Installation

#### Homebrew

```bash
brew install johnnyhuy/homebrew-repo/versioneer
```

#### Linux

```bash
curl -L https://github.com/johnnyhuy/versioneer/releases/download/v1.0.0/versioneer-linux-x64.tar.gz -O - | tar -xf /usr/local/bin/versioneer
```

#### Windows

```bash
choco install -y versioneer
```

#### Docker

```bash
docker run -v $PWD:/opt/workspace --rm johnnyhuy/versioneer
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

## 🐈 Default behaviour

### `versioneer apply`

1. Asks to bump the current directory Git tag
2. Detects a `package.json` and bump the version
3. Bumps local Git tag

(Optional) Use the `--push` option to sync changes to the remote.

### `versioneer rollback` - WIP

1. Asks to rollback the latest version in the current directory
2. Deletes latest local Git tag
4. Hard Git reset to last known SerVer Git tag

(Optional) Use the `--push` option to sync changes to the remote.

### `versioneer purge`

1. Asks to delete all SemVer Git tags in the current directory
2. Deletes all local tags

(Optional) Use the `--push` option to sync changes to the remote.

## 📜 Configuration

Versioneer will use **environment variables first** before looking for a versioneer configuration file.

### Environment variables

```env
VERSIONEER_DEBUG=true
```

### Configuration file `.versioneer.yaml`

Aliases include `.versioneer.yaml`, `.versioner`

```yaml
debug: true

apply:
  force: true
  dryRun: true

release:
  force: true
  dryRun: true

rollback:
  force: true
  dryRun: true

purge:
  dryRun: true
```

## ✍️ Contributing

Any feedback is welcome! Fork out and raise a pull request.

We can use [VSCode dev containers](https://code.visualstudio.com/docs/remote/containers) to quickly spin up a NodeJS environment through [Docker](https://docs.docker.com/get-docker/). Once the environment is setup, just install Node packages.

```bash
npm i
```

Use the VSCode JavaScript Terminal to start debugging!

