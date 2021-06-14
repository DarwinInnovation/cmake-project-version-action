# CMake Project Version action

This action reads the `<PROJECT-NAME>` and `<version>` values from a [project](https://cmake.org/cmake/help/latest/command/project.html) command within a `CMakeLists.txt` file.

Note

## Inputs

### `path`

The directory path of the top level `CMakeLists.txt` file. Defaults to '.' (top-level directory)

### `file`

If you're CMake file has a name different from `CMakeLists.txt`, which is unlikely, the filename can be
supplied with this input.

## Outputs

### `project`

The `<PROJECT-NAME>` as given to the project command.

### `version`

The version number as given after the `VERSION` option within the project command.
