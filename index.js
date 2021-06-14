const core = require("@actions/core");
const github = require("@actions/github");

const path = require("path");
const fs = require("fs");
const readline = require("readline");

const RE_PROJECT = /^\s*project\s*\((\w+)\s+(?:VERSION\s+([0-9][0-9\.]+))?/i;

async function processCmakeLists(cmakeListsPath) {
  const fileStream = fs.createReadStream(cmakeListsPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const m = line.match(RE_PROJECT);
    if (m) {
      console.log(`Line from file: ${line}`);
      return {
        project: m[1],
        version: m[2] || "underined",
      };
    }
  }
}

try {
  // `who-to-greet` input defined in action metadata file
  const projectPath = core.getInput("path");
  console.log(`Looking for CMakeLists.txt in ${projectPath}`);

  const cmakeListsPath = path.join(projectPath, "CMakeLists.txt");

  processCmakeLists(cmakeListsPath)
    .then((result) => {
      for (const key in result) {
        core.setOutput(key, result[key]);
      }
    })
    .catch((error) => {
      core.setFailed(error.message);
    });
} catch (error) {
  core.setFailed(error.message);
}
