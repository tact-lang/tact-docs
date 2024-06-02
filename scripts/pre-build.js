import fs from 'fs';
import path from 'path';

/* ------------------- */
/* ---- Functions ---- */
/* ------------------- */

/**
 * Helper function to prevent unnecessary indentation
 * @param str {string}
 */
function dedent(str) {
  return ('' + str).replace(/(\n)\s+/g, '$1');
}

/**
 * Overrides the root configs with target ones
 *
 * @param configs {{ root: string, target: string }[]}
 */
export const overrideRootWithTargetConfig = (configs) => {
  // Current working directory of the process
  const cwd = process.cwd();

  // Not in the root dir of the repo
  // if (!cwd.endsWith('tact-docs')) {
  //   console.log(`Error: not running from the root directory of the repo, but from ${cwd}`);
  //   process.exit(1);
  // }

  // Setup details for upcoming override
  const pathPrefix = 'configs-i18n';

  // Check that path exists
  if (!fs.existsSync(path.join(cwd, pathPrefix))) {
    console.log(`Error: ${pathPrefix} dir doesn't exist!`);
    process.exit(1);
  }

  // Process all overrides
  for (const conf of configs) {
    const pathToRootConf = path.join(cwd, conf.root);
    const pathToTargetConf = path.join(cwd, pathPrefix, conf.target);

    const targetConfContents = fs.readFileSync(pathToTargetConf);

    fs.writeFileSync(
      pathToRootConf,
      dedent(`/**
        *  WARNING: This is an auto-generated file! Please, don't edit it directly.
        *
        *  Instead, go to ${pathPrefix}/ directory and modify files there.
        */
        `) + targetConfContents,
    );
  }
}

/* ---------------- */
/* ---- Script ---- */
/* ---------------- */

// 1. Place correct configuration for the build

const configs = [
  {
    root: 'next.config.js',
    target: 'next.config.js'
  },
  {
    root: 'theme.config.jsx',
    target: 'theme.config.jsx'
  },
];

overrideRootWithTargetConfig(configs);

// 2. TBD
