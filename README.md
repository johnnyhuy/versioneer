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
- Version rollback
- Commits version bumps to `package.json`
- GitHub release generation
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
2. Bumps Git tag
3. Pushes new tag to remote
4. Detects a `package.json` and commit to bump the version
   1. Pushes `package.json` commit
5. Detects GitHub release through environment variable `GITHUB_TOKEN`
   1. Compresses contents in the `./bin` folder with `tar` except anything suffixed with `.txt`
   2. Uploads `./bin` content artifacts to the GitHub release
   3. Creates draft GitHub release with generated changelog

### `versioneer release`

1. Asks to release
2. Detects GitHub release through environment variable `GITHUB_TOKEN`
   1. Switches draft GitHub release to main release

### `versioneer rollback`

1. Asks to rollback the latest version in the current directory
2. Deletes latest local Git tag
3. Deletes latest remote Git tag
4. Detects GitHub release through environment variable `GITHUB_TOKEN`
   1. Deletes latest GitHub release including drafts 

### `versioneer purge`

1. Asks to delete all SemVer Git tags in the current directory
2. Backup remote tags with commit references to `.versioneer-purge-backup-[date].json` to current directory
3. Deletes all local tags
4. Deletes all remote tags

## 📜 Configuration

Versioneer will use **environment variables first** before looking for a versioneer configuration file.

### Environment variables

```bash
VERSIONEER_DEBUG=true | false
```

### Configuration file `.versioneer.yaml`

Aliases include `.versioneer.yaml`, `.versioner`

```yaml
debug: true | false

apply:
  force: true | false
  dryRun: true | false

release:
  force: true | false
  dryRun: true | false

rollback:
  force: true | false
  dryRun: true | false

purge:
  dryRun: true | false
```

## ✍️ Contributing

Any feedback is welcome! Fork out and raise a pull request.

We can use [VSCode dev containers](https://code.visualstudio.com/docs/remote/containers) to quickly spin up a NodeJS environment through [Docker](https://docs.docker.com/get-docker/). Once the environment is setup, just install Node packages.

```bash
npm i
```

Use the VSCode JavaScript Terminal to start debugging!

