// ----
// TODO: deprecate old links eventually (in 3-6 months from now), and don't create any redirects then.
// ----

import fs from 'fs';
import process from 'process';
import path from 'path';

/* ------------------- */
/* ---- Functions ---- */
/* ------------------- */

/**
 * Constructs an HTML redirect page
 *
 * @param href {string}
 * @returns {string}
 */
const constructRedirectPage = (href) =>
  `<!DOCTYPE html>
   <html>
   <head>
     <title>Redirecting...</title>
     <link rel="canonical" href="${href}" />
     <meta charset="utf-8" />
     <meta http-equiv="refresh"
       content="0; url=${href}" />
   </head>
   <body>
     <p>Redirecting...</p>
   </body>
   </html>`;

/**
 * Produces an array of redirects to be created, taken from next.config.js property with slight modifications.
 * Those redirects are essentially a diff of the current structure and the previous one on this commit:
 * https://github.com/tact-lang/tact-docs/tree/17176cb5e8bac84163bfa4c7b1bd94c0dc917bea/pages
 *
 * @returns {{source: string, subSources: string[] | undefined, destination: string}[]}
 */
const getRedirects = () => [
  // Language→Guides pages are moved under Book section
  {
    source: '/language/guides',
    subSources: [
      'types', 'functions', 'statements', 'constants', 'receive', 'bounced', 'external', 'lifecycle', 'send',
      'message', 'deploy', 'debug', 'upgrades', 'masterchain', 'func', 'config', 'programmatic',
    ],
    destination: '/book',
  },

  // Getting Started is now a part of Book→Guides sub-section
  {
    source: '/start',
    subSources: undefined,
    destination: '/book/guides/getting-started',
  },
  {
    source: '/start',
    subSources: ['first', 'deploy', 'test'],
    destination: '/book/guides/getting-started/:slug',
  },

  // Language→Guides→Grammar is now under Language section as a Specification page
  {
    source: '/book/grammar',
    subSources: undefined,
    destination: '/language/spec',
  },

  // Evolution section is moved under Language section
  {
    source: '/evolution',
    subSources: undefined,
    destination: '/language/evolution/overview',
  },
  {
    source: '/evolution',
    subSources: ['OTP-001', 'OTP-002', 'OTP-003', 'OTP-004', 'OTP-005', 'OTP-006'],
    destination: '/language/evolution',
  },

  // Language→Guides→Changelog is merged with the Evolution page
  {
    source: '/language/guides/changelog',
    subSources: undefined,
    destination: '/language/evolution/overview',
  },

  // Tools are now part of a new Ecosystem section
  {
    source: '/tools',
    subSources: ['typescript', 'vs', 'jetbrains'],
    destination: '/ecosystem/tools',
  },

  // Small updates in naming of pages or sub-sections
  {
    source: '/book/message-modes',
    subSources: undefined,
    destination: '/book/message-mode',
  },
  {
    source: '/ecosystem/tools/vs',
    subSources: undefined,
    destination: '/ecosystem/tools/vscode',
  },
];

/**
 * Checks if the given filepath is a regular page/file and not a redirect page/file
 *
 * @param filePathWithExt {string}
 * @returns bool
 */
const isRegularFile = (filePathWithExt) => {
    if (fs.existsSync(filePathWithExt)
      && !(fs.readFileSync(filePathWithExt, 'utf8').includes('<title>Redirecting...</title>'))) {
      return true;
    }

    return false;
};

/**
 * Creates the redirect file, unless there exists a regular page/file under source path already.
 * Returns true if the redirect file was created and false otherwise.
 *
 * @param source {string}
 * @param destination {string}
 * @returns bool
 */
const createRedirectFile = (source, destination) => {
    // full path, minus the extension
    const pathUntilExt = path.join(cwd, '/out', source);

    // full path with extension
    const pathWithExt = pathUntilExt + '.html';

    // if file exists, but doesn't include the line from the redirect page
    if (isRegularFile(pathWithExt)) {
      console.log(`Warning: such path (${pathWithExt}) already exists in the docs, so redirect from it was NOT created`);
      return false;
    }

    // need to create additional dirs
    if (source.split('/').length > 1) {
      const nestedDir = path.dirname(pathUntilExt);
      // NOTE: debug output
      // console.log(nestedDir, redirect.source);
      fs.mkdirSync(nestedDir, { recursive: true });
    }

    // create the redirect file
    fs.writeFileSync(pathWithExt, constructRedirectPage(destination));

    // report success
    return true;
};

/* ---------------- */
/* ---- Script ---- */
/* ---------------- */

const cwd = process.cwd(); // current working directory of the process

// Not in the root dir of the repo
if (!cwd.endsWith('tact-docs')) {
  console.log(`Error: not running from the root directory of the repo, but from ${cwd}`);
  process.exit(1);
}

// out/ doesn't exist
if (!fs.existsSync(path.join(cwd, '/out'))) {
  console.log(`Error: out/ dir doesn't exist, try building it first`);
  process.exit(1);
}

// get a list of redirects
const redirects = getRedirects();

// count expected number of redirects to be created
let expectedCount = 0;
for (const redirect of redirects) {
  expectedCount += (redirect.subSources?.length ?? 1);
}

// log start
console.log(`Started generating redirects. Expected count: ${expectedCount}`);

// for each redirect create redirect file(s) and/or missing folder(s)
let count = 0;
for (const redirect of redirects) {
  // 1. have no nested sub-sources
  if (redirect.subSources === undefined) {
    if (createRedirectFile(redirect.source, redirect.destination) === true) {
      count += 1;
    }
    continue;
  }

  // 2. have some nested structure
  for (const subSource of redirect.subSources) {
    if (createRedirectFile(redirect.source + '/' + subSource, redirect.destination + '/' + subSource)) {
      count += 1;
    }
  }
}

// log end
console.log(`Finished generating redirects. Actually generated: ${count}`);