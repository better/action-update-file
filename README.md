# action-update-file [![Version][version-badge]][version-url] [![Lint status][workflow-badge]][workflow-url]

Update (i.e. commit and push) files on GitHub.

## Usage

The action requires GitHub token for authentication; no username or e-mail are required.

### Basic usage

Here is an example of a workflow using `action-update-file`:

<details>
  <summary>workflow.yml (Click to expand)</summary>

```yml
name: Resources
on: repository_dispatch
jobs:
    resources:
        name: Update resources
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v1
            - uses: actions/setup-node@v1
            - name: Fetch resources
              run: ./scripts/fetch-resources.sh
            - name: Update resources
              uses: test-room-7/action-update-file@v1
              with:
                  file-path: path/to/file
                  commit-msg: Update resources
                  github-token: ${{ secrets.GITHUB_TOKEN }}
```
</details>

Note that this action does not change files. They should be changed with scripts and/or other actions.

### Update multiple files

You can also update multiple files:

<details>
  <summary>workflow.yml (Click to expand)</summary>

```yml
name: Resources
on: repository_dispatch
jobs:
    resources:
        name: Update resources
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v1
            - uses: actions/setup-node@v1
            - name: Fetch resources
              run: ./scripts/fetch-resources.sh
            - name: Update resources
              uses: test-room-7/action-update-file@v1
              with:
                  file-path: |
                      path/to/file1
                      path/to/file2
                      path/to/file3
                  commit-msg: Update resources
                  github-token: ${{ secrets.GITHUB_TOKEN }}
```
</details>

### Use glob patterns

The action supports glob patterns as well:

<details>
  <summary>workflow.yml (Click to expand)</summary>

```yml
name: Resources
on: repository_dispatch
jobs:
    resources:
        name: Update resources
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v1
            - uses: actions/setup-node@v1
            - name: Fetch resources
              run: ./scripts/fetch-resources.sh
            - name: Update resources
              uses: test-room-7/action-update-file@v1
        with:
                  # Include all JS files from the `dist` directory
                  file-path: dist/*.js
                  commit-msg: Update resources
                  github-token: ${{ secrets.GITHUB_TOKEN }}
```
</details>

See the `@actions/glob` [documentation][glob-docs] for glob syntax.

### Inputs

#### Required inputs

-   `commit-msg`: a text used as a commit message
-   `file-path`: a path to file to be updated
-   `github-token`: GitHub token

#### Optional inputs

-   `branch`: branch to push changes (the default branch is used if no `branch` is specified)
-   `allow-removing`: allow to remove file if local copy is missing
    (`false` by default)

Note that the action will produce an error if a local copy of a given file is missing, and the `allow-removing` flag is `false`.

### Outputs

-   `commit-sha`: the hash of the commit created by this action

## Development

```sh
# Install dependencies
> npm install

# Build the action
> npm run dist

# Lint project files
> npm run lint
```

Don't push dist files; they're updated automatically by the action itself.

## License

Licensed under the [MIT License](./LICENSE.md).

[glob-docs]: https://github.com/actions/toolkit/tree/main/packages/glob#patterns
[version-badge]: https://img.shields.io/github/v/release/test-room-7/action-update-file
[version-url]: https://github.com/marketplace/actions/update-files-on-github
[workflow-badge]: https://img.shields.io/github/workflow/status/test-room-7/action-update-file/Lint?label=lint
[workflow-url]: https://github.com/test-room-7/action-update-file/actions
